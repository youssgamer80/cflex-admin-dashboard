<template>
    <a-typography-title :level="4">Liste Des Bornes</a-typography-title>

    <SearchHeaderBorne @search="handleSearch" />
    <a-card :style="{
        padding: '24px',
        background: '#fff',
        textAlign: 'center',
        minHeight: '360px',
    }" :bordered="false" id="macarte">
        <a-table :columns="columns" :row-key="keyBornes" :data-source="dataSource" :pagination="pagination"
            :loading="loading" @change="handleTableChange">
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'id'">{{ text }}
                </template>
                <template v-if="column.dataIndex === 'libelle'">{{ text }}
                </template>

                <template v-if="column.dataIndex === 'idPointArretFk'">{{ text.nom }}
                </template>
                <!-- <template v-if="column.dataIndex === 'statut'">
                    <h1 v-if="text">en fonction</h1>
                    <h1 v-else>pas en fonction</h1>
                </template> -->
                <template v-else-if="['action'].includes(column.dataIndex)">
                    <div>


                        <!-- modification borne ( config sur icon widget ) -->
                        <edit-outlined :style="{ color: '#08f26e' }"
                            @click="showModal(record.id, record.libelle, record.idPointArretFk.nom)" />


                        <a-divider type="vertical" />
                        <!-- popup modification  -->
                        <a-popconfirm v-if="dataSource.length"
                            title="Voulez vous supprimez les information de cette borne?"
                            @confirm="onDelete(record.id)">
                            <a>

                                <delete-outlined :style="{ color: '#f73772' }" />

                            </a>
                            <template>
                                <p>test</p>
                            </template>
                        </a-popconfirm>


                    </div>
                </template>
            </template>
        </a-table>
        <a-modal v-model:visible="visible" title="Modification information borne" @ok="modifborne">


            <a-form name="basic" autocomplete="off" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">



                <a-form-item label="libelle" name="libelle" :rules="[{ required: true }]">

                    <a-input v-model:value="formState.libelle" />

                </a-form-item>
                <a-form-item label="point d arret"
                    :rules="[{ required: true, message: 'entrez le point d arret SVP!' }]">
                    <a-select v-model:value="formState.idPointArretFk">

                        <a-select-option v-for="point in pointarret" v-bind:key="point.id" :value="point.id">{{
                                point.nom
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

import SearchHeaderBorne from "../../components/SearchHeader_borne.vue";
import axios from "axios";

const columns = [

    {
        title: "id ",
        dataIndex: "id",
        sorter: true,
    },
    {
        title: "Libelle",
        dataIndex: "libelle",
        sorter: true,
    },
    {
        title: "point arret",
        dataIndex: "idPointArretFk",
    },
    // {
    //     title: "Statut",
    //     dataIndex: "statut",
    // },
    {
        title: "Action",
        dataIndex: "action",
    },
];



const queryData = (params) => {
    return axios.get("http://192.168.252.206:4000/api/bornes", {
        params,
    });
};



export default defineComponent({
    components: {
        SearchHeaderBorne,
        EditOutlined,
        DeleteOutlined,
    },

    methods: {

        handleSearch(value) {
            let NewdataSource = []

            if (value.length > 0) {

                this.dataListBorne.filter((item) => {
                    if (item.idPointArretFk.nom.toLowerCase().includes(value.toLowerCase()) || item.libelle.toLowerCase().includes(value.toLowerCase())) {
                        console.log(item)
                        NewdataSource.push(item);
                    }


                })
                this.dataSource = NewdataSource

            }
            else {
                this.dataSource = this.dataListBorne
            }
        },
    },
    setup() {

        const modifborne = async () => {



            const resp = await axios
                .put(`http://192.168.252.206:4000/api/bornes/updateBorne/${formState.id}`, {
                    libelle: formState.libelle,
                    idPointArretFk: formState.idPointArretFk

                    // libele: {

                    //     id: formState.libelle
                    // },
                    // idZoneparentFk: {

                    //     id: formState.libel
                    // },

                });
            if (resp.status === 200) {
                visible.value = false;
                message.success("Modification reussi");


                // this.queryData();



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

            // reglage du changemenet d etat de la table apres recherche  d une borne
            filteredList() {
                return this.dataListBorne.filter((post) => {
                    return post.libelle
                        .toLowerCase()
                        .includes(this.rechercheBorne.toLowerCase());
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
                .delete(`http://192.168.252.206:4000/api/bornes/deleteBorne/${id}`,
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
        let notEgal

        const showModal = (id, libelle, idPointArretFk) => {
            formState.id = id;
            formState.libelle = libelle;
            formState.idPointArretFk = idPointArretFk;
            visible.value = true;
        };


        const formState = reactive({
            id: '',
            libelle: '',
            idPointArretFk: '',

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

            visible,
            formState,
            pointarret: [],
            modifborne,
            notEgal

        };
    },


    mounted() {




        fetch("http://192.168.252.206:4000/api/pointarrets")
            .then(response => response.json())
            .then(res => {
                this.pointarret = res.data

            })

        fetch("http://192.168.252.206:4000/api/bornes")
            .then((response) => response.json())
            .then((res) => {
                this.dataListBorne = res.data;

                console.log(this.dataListBorne);
            });



    },
});
</script>

 <style>
 #macarte {
     box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
 }
 </style>