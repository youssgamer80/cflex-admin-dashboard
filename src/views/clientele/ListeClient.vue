<template>
    <a-typography-title :level="4">Liste Des clients Usagers</a-typography-title>

    <SearchHeaderClient @rechercheCl="handleSearch" />
    <a-card :style="{
        padding: '24px',
        background: '#fff',
        textAlign: 'center',
        minHeight: '360px',
    }" :bordered="false" id="macarte">
        <a-table :columns="columns" :row-key="keyClient" :data-source="dataSource" :pagination="pagination"
            :loading="loading" @change="handleTableChange">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'id'">{{ record.id }}
                </template>
                <template v-if="column.dataIndex === 'libelle'">{{ record.nom }}
                </template>


                <template v-if="column.dataIndex === 'prenom'">{{ record.prenom }}
                </template>
                <template v-if="column.dataIndex === 'tel'">{{ record.telephone }}
                </template>
                <!-- <template v-if="column.dataIndex === 'statut'">
                    <h1 v-if="text">en fonction</h1>
                    <h1 v-else>pas en fonction</h1>
                </template> -->
                <template v-else-if="['action'].includes(column.dataIndex)">
                    <div>


                        <!-- modification borne ( config sur icon widget ) -->
                        <!-- <edit-outlined :style="{ color: '#08f26e' }"
                            @click="showModal(record.id, record.libelle, record.idPointArretFk.nom)" /> -->


                        <!-- <a-divider type="vertical" /> -->
                        <!-- popup modification  -->
                        <a-popconfirm v-if="dataSource.length"
                            title="Voulez vous bloqué les informations de ce usager ?" @confirm="onDelete(record.id)">
                            <a>

                                <user-delete-outlined :style="{ color: '#f73772' }" />

                            </a>
                            <template>
                                <p>test</p>
                            </template>
                        </a-popconfirm>


                    </div>
                </template>
            </template>
        </a-table>

    </a-card>

</template>

<script>
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive } from "vue";
import { message } from "ant-design-vue";
import { UserDeleteOutlined } from "@ant-design/icons-vue";
import SearchHeaderClient from "../../components/SearchHeader_client.vue";

import axios from "axios";

const columns = [

    {
        title: "id ",
        dataIndex: "id",
        sorter: true,
    },
    {
        title: "nom",
        dataIndex: "libelle",
        sorter: true,
    },
    {
        title: "prenom",
        dataIndex: "prenom",
    },
    {
        title: "telephone",
        dataIndex: "tel",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];



const queryData = (params) => {
    return axios.get("http://192.168.252.206:4000/api/usagers", {
        params,
    });
};



export default defineComponent({
    components: {
        SearchHeaderClient,
        // EditOutlined,
        UserDeleteOutlined,
    },

    methods: {

        handleSearch(value) {
            let NewdataSource = []

            if (value.length > 0) {

                this.dataListClients.filter((item) => {
                    if (item.nom.toLowerCase().includes(value.toLowerCase()) || item.prenom.toLowerCase().includes(value.toLowerCase())) {
                        console.log(item)
                        NewdataSource.push(item);
                    }
                    console.log(item.nom)

                })
                this.dataSource = NewdataSource

            }
            else {
                this.dataSource = this.dataListClients
            }
        },
    },
    setup() {


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
                return this.dataListClients.filter((post) => {
                    return post.libelle
                        .toLowerCase()
                        .includes(this.data.toLowerCase());
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
                .delete(`http://192.168.252.206:4000/api/usagers/deleteUsager/${id}`,
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
                        message.success("bloqué avec succès!!");
                    } else {
                        message.error("impossible de bloqué !!");
                    }
                });
        };

        const visible = ref(false);


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



        };
    },

    mounted() {

        fetch("http://192.168.252.206:4000/api/usagers")
            .then((response) => response.json())
            .then((res) => {
                this.dataListClients = res.data;

                console.log(this.dataListClients);
            });



    },


});
</script>

 <style>
 #macarte {
     box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
 }
 </style>