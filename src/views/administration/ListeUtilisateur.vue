<template>
    <a-typography-title :level="4">Utilisateur</a-typography-title>

    <SearchHeaderUtilisateur @search="handleSearchUtilisateur" />
    <a-card :style="{
        padding: '24px',
        background: '#fff',
        textAlign: 'center',
        minHeight: '360px',
    }" :bordered="false" id="macarte">
        <a-table :columns="columns" :row-key="keyBornes" :data-source="dataSource" :pagination="pagination"
            :loading="loading" @change="handleTableChange">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'id'">{{ record.id }}
                </template>
                <template v-if="column.dataIndex === 'libelle'">{{ record.nomUtilisateur }}
                </template>

                <template v-if="column.dataIndex === 'idPointArretFk'">{{ record.role.role }}
                </template>
                <!-- <template v-if="column.dataIndex === 'statut'">
                    <h1 v-if="text">en fonction</h1>
                    <h1 v-else>pas en fonction</h1>
                </template> -->
                <template v-else-if="['action'].includes(column.dataIndex)">
                    <div>



                        <edit-outlined :style="{ color: '#08f26e' }"
                            @click="showModal(record.id, record.nomUtilisateur, record.role.role, record.motDePasse)" />


                        <a-divider type="vertical" />
                        <!-- popup modification  -->
                        <a-popconfirm v-if="dataSource.length" title="Voulez vous bloquer l acces de cet utilisateur ?"
                            @confirm="onDelete(record.id)">
                            <a>

                                <delete-outlined :style="{ color: '#f73772' }" />

                            </a>

                        </a-popconfirm>


                    </div>
                </template>
            </template>
        </a-table>
        <a-modal v-model:visible="visible" title="Modification information utilisateur" @ok="modifRole">


            <a-form name="basic" autocomplete="off" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">



                <a-form-item label="nom et prenom" name="nom" :rules="[{ required: true }]">

                    <a-input v-model:value="formState.nom" />

                </a-form-item>
                <a-form-item label="mot de passe" name="pass" :rules="[{ required: true }]">
                    <a-input v-model:value="formState.pass" />
                </a-form-item>

                <!-- attribution des roles -->
                <a-form-item label="role" :rules="[{ required: true }]">
                    <a-select v-model:value="formState.idRole" @change="ChangeRole">

                        <a-select-option v-for="p in roles" v-bind:key="p.id" :value="p.id">{{
                                p.role
                        }}
                        </a-select-option>
                    </a-select>
                </a-form-item>


            </a-form>

        </a-modal>

    </a-card>

</template>

<script>
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive } from "vue";
import { message } from "ant-design-vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import SearchHeaderUtilisateur from "../../components/SearchHeader_utilisateur.vue";

import axios from "axios";

const columns = [

    {
        title: "reference",
        dataIndex: "id",
        sorter: true,
    },
    {
        title: "nom et prenom",
        dataIndex: "libelle",
        sorter: true,
    },
    {
        title: "role",
        dataIndex: "idPointArretFk",
    },

    {
        title: "Action",
        dataIndex: "action",
    },
];



const queryData = (params) => {
    return axios.get("http://192.168.252.123:4002/utilisateur/list", {
        params,
    });
};



export default defineComponent({
    components: {
        SearchHeaderUtilisateur,
        EditOutlined,
        DeleteOutlined,
    },
    data() {
        return {

            ListeUtilisateur: []
        }

    },

    methods: {

        handleSearchUtilisateur(value) {
            let NewdataSource = []

            if (value.length > 0) {


                this.ListeUtilisateur.filter((item) => {
                    console.log("test de recherche", item.nomUtilisateur);
                    if (item.role.role.toLowerCase().includes(value.toLowerCase()) || item.nomUtilisateur.toLowerCase().includes(value.toLowerCase())) {
                        console.log(item);
                        NewdataSource.push(item);
                    }


                })
                this.dataSource = NewdataSource

            }
            else {
                this.dataSource = this.ListeUtilisateur
            }
        },
    },
    setup() {


        const ChangeRole = value => {
            formState.idRole = value;
            console.log(`selected depart : ${this.formState.idRole}`);
        };

        const modifRole = async () => {

            console.log("test", formState.idRole)



            const resp = await axios
                .put(`http://192.168.252.123:4002/utilisateur/updateutilisateur/${formState.id}`, {
                    "nomUtilisateur": formState.nom,
                    "motDePasse": formState.pass,
                    "statut": true,
                    "role": {
                        "id": formState.idRole
                    }
                });
            if (resp.status === 200) {
                visible.value = false;
                message.success("Modification reussi");


            } else {
                message.error("impossible!!");
            }


        };


        const {
            data: dataSource,
            run,
            loading = ref(false),
            current,
            pageSize,
        } = usePagination(queryData, {
            formatResult: (res) => {

                return res.data.data.utilisateur
            },
            pagination: {
                currentKey: "page",
                pageSizeKey: "results",
            },
        });
        const pagination = computed(() => ({
            total: 200,
            current: current.value,
            pageSize: pageSize.value,


            filteredList() {
                return this.ListeUtilisateur.filter((post) => {
                    return post.nomUtilisateur
                        .toLowerCase()
                        .includes(this.recherchUtilisateur.toLowerCase());
                });
            },

        }));

        const handleTableChange = (pag, filters, sorter) => {
            run({
                results: pag.pageSize,
                page: pag?.current,
                sortField: sorter.field,
                sortOrder: sorter.order,
                ...filters,
            });
        };

        const onDelete = (id) => {
            return axios
                .delete(`http://192.168.252.123:4002/utilisateur/delete/${id}`,
                    {
                        data: {
                            statut: false,
                        },
                    }
                )
                .then((resp) => {
                    if (resp.status === 200) {


                        console.log(typeof dataSource)
                        dataSource.value = dataSource.value.filter(
                            (item) => item.id !== id
                        );
                        message.success("utilisateur bloqué !!");
                    } else {
                        message.error("impossible!!");
                    }
                });
        };

        const visible = ref(false);
        let notEgal

        const showModal = (id, nom, idRole, pass) => {
            formState.id = id;
            formState.nom = nom;
            formState.idRole = idRole;
            formState.pass = pass;

            visible.value = true;
        };


        const formState = reactive({
            id: '',
            nom: '',
            idRole: '',
            pass: '',

        });





        return {

            dataSource,
            ChangeRole,
            pagination,
            loading,
            columns,
            handleTableChange,
            onDelete,
            showModal,
            visible,
            formState,
            roles: [],
            modifRole,
            notEgal

        };
    },




    mounted() {




        fetch("http://192.168.252.123:4002/api/roles")
            .then(response => response.json())
            .then(res => {
                this.roles = res.data;

            });

        fetch("http://192.168.252.123:4002/utilisateur/list")
            .then((response) => response.json())
            .then((res) => {

                this.ListeUtilisateur = res.data.utilisateur;

                console.log(this.ListeUtilisateur);
            });



    },
});
</script>

 <style>
 #macarte {
     box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
 }
 </style>