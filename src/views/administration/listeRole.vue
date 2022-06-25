<template>
    <a-typography-title :level="4">gestion des roles</a-typography-title>

    <!-- <SearchHeaderBorne @search="handleSearch" /> -->
    <a-card :style="{
        padding: '24px',
        background: '#fff',
        textAlign: 'center',
        minHeight: '360px',
    }" :bordered="false" id="macarte">

        <!-- ajout -->






        <!--  -->
        <a-col :span="5" :style="{ padding: '24px' }">

            <a-button type="primary" @click="showModale" :style="{ textAlign: 'center' }"> Ajouter
            </a-button>

        </a-col>

        <a-table :columns="columns" :row-key="keyRole" :data-source="dataSource" :pagination="pagination"
            :loading="loading" @change="handleTableChange">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'id'">{{ record.id }}
                </template>
                <template v-if="column.dataIndex === 'role'">{{ record.role }}
                </template>



                <!-- <template v-if="column.dataIndex === 'statut'">
                    <h1 v-if="text">actif</h1>
                    <h1 v-else>inactif</h1>
                </template> -->
                <template v-else-if="['action'].includes(column.dataIndex)">
                    <div>


                        <!-- modification borne ( config sur icon widget ) -->
                        <edit-outlined :style="{ color: '#08f26e' }" @click="showModal(record.id, record.role)" />


                        <a-divider type="vertical" />
                        <!-- popup modification  -->
                        <a-popconfirm v-if="dataSource.length"
                            title="Voulez vous supprimez les information de ce role ?" @confirm="onDelete(record.id)">
                            <a>

                                <delete-outlined :style="{ color: '#f73772' }" />

                            </a>

                        </a-popconfirm>


                    </div>
                </template>
            </template>

        </a-table>

        <a-modal v-model:visible="visible" title="Modification role" @ok="modifRole">


            <a-form name="basic" autocomplete="off" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">



                <a-form-item label="role" name="role" :rules="[{ required: true }]">

                    <a-input v-model:value="formState.role" />

                </a-form-item>



            </a-form>

        </a-modal>
        <!-- modal ajout de role -->


        <a-modal v-model:visible="visibles" title="ajout de role" @ok="onSubmit">


            <a-form name="basic" autocomplete="off" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">



                <a-form-item label="role" name="role" :rules="[{ required: true }]">

                    <a-input v-model:value="formState.role" />

                </a-form-item>



            </a-form>

        </a-modal>

        <!-- tester -->

    </a-card>

</template>

<script>
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive } from "vue";
import { message } from "ant-design-vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";


import axios from "axios";

const columns = [

    {
        title: "reference",
        dataIndex: "id",
        sorter: true,
    },


    {
        title: "role",
        dataIndex: "role",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];



const queryData = (params) => {
    return axios.get("http://192.168.252.123:4002/api/roles", {
        params,
    });
};



export default defineComponent({
    components: {

        EditOutlined,
        DeleteOutlined,
    },

    methods: {

        handleSearch(value) {
            let NewdataSource = []

            if (value.length > 0) {

                this.dataListBorne.filter((item) => {
                    if (item.idPointArretFk.nom.toLowerCase().includes(value.toLowerCase()) || item.role.toLowerCase().includes(value.toLowerCase())) {
                        console.log(item)
                        NewdataSource.push(item);
                    }
                    console.log(item.role)

                })
                this.dataSource = NewdataSource

            }
            else {
                this.dataSource = this.dataListBorne
            }
        },
    },
    setup() {



        const onSubmit = (e) => {
            console.log(e);


            return axios
                .post("http://192.168.252.123:4002/api/roles/addRole", {

                    role: formState.role,
                    statut: true

                })
                .then((resp) => {

                    if (resp.status === 200) {


                        visibles.value = false;
                        message.success("insertion du role effectuée avec succes");

                    } else {
                        message.error("echec d insertion des données !!");
                    }

                    console.log(resp);
                });
        };



        const modifRole = async () => {



            const resp = await axios
                .put(`http://192.168.252.123:4002/api/roles/updateRole/${formState.id}`, {

                    role: formState.role,
                    statut: true

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

                return res.data.data
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


            // filteredList() {
            //     return this.dataListBorne.filter((post) => {
            //         return post.role
            //             .toLowerCase()
            //             .includes(this.rechercheBorne.toLowerCase());
            //     });
            // },

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
                .delete(`http://192.168.252.123:4002/api/roles/deleteRole/${id}`,
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
                        message.success("Supprimé avec succès!!");
                    } else {
                        message.error("impossible!!");
                    }
                });
        };

        const visible = ref(false);
        const visibles = ref(false);
        let notEgal

        const showModal = (id, role) => {
            formState.id = id;
            formState.role = role;
            visible.value = true;
        };
        const showModale = (id, role) => {
            formState.id = id;
            formState.role = role;
            visibles.value = true;
        };


        const formState = reactive({
            id: '',
            role: '',


        });



        const searchQuery = ref('');

        return {
            searchQuery,
            dataSource,
            pagination,
            loading,
            columns,
            handleTableChange,
            onDelete,
            showModal,
            showModale,
            onSubmit,
            visibles,

            visible,
            formState,
            pointarret: [],
            modifRole,
            notEgal

        };
    },


    mounted() {




        fetch("http://192.168.252.123:4002/api/roles")
            .then((response) => response.json())
            .then((res) => {
                this.dataListRole = res.data;

                console.log(this.dataListRole);
            });



    },
});
</script>

 <style>
 #macarte {
     box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
 }
 </style>


