<template>
    <a-card :bordered="false" style="margin: 10px 0" id="macarte">
        <a-typography-title :level="5">Recherche</a-typography-title>
        <div class="components-input-demo-presuffix">
            <!-- champs rech borne -->
            <a-row>
                <a-col :span="8">
                    <a-input-search type="text" placeholder="Rechercher" enter-button @change="recherchBornes"
                        @keyup="recherchBornes" v-model:value="rechercheBorne" />
                    <br />

                    <!-- liste des elements d' une borne -->
                    <!-- <div v-for="( pointarre, index) in filters" :key="pointarre.nom">
                        {{ index }}. {{ filter.nom }}
                    </div> -->

                </a-col>




                <a-col :span="8" :offset="6">
                    <a-button type="primary" @click="showModal"> Ajouter </a-button>
                    <a-modal v-model:visible="visible" width="700px" padding="700px" title="Ajouter type de transport"
                        @ok="onSubmit">
                        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <a-form-item label="Libelle borne" :rules="[{ required: true }]">
                                <a-input v-model:value="formState.libelle" />
                            </a-form-item>


                            <a-form-item label="point d arret" :rules="[{ required: true }]">
                                <a-select v-model:value="idpointArret" tree-data-simple-mode style="width: 100%"
                                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" :tree-data="treeData"
                                    placeholder="Selectionnez un point arret" :load-data="onLoadData"
                                    @change="handleChangeBorne">
                                    <a-select-option v-for="point in pointarret" v-bind:key="point.id"
                                        :value="point.id">{{
                                                point.nom
                                        }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>


                        </a-form>
                    </a-modal>
                </a-col>
                <!-- -->
            </a-row>
        </div>
    </a-card>
</template>






<script>
import { message } from "ant-design-vue";
import { defineComponent, ref, reactive } from "vue";
import axios from "axios";

export default defineComponent({
    name: "SearchHeader_borne",
    components: {},

    data() {
        return {
            rechercheBorne: '',
        };
    },

    setup() {
        let idpointArret;
        const userName = ref("");
        const visible = ref(false);
        const showModal = () => {
            visible.value = true;
        };

        const handleChangeBorne = value => {
            idpointArret = value;
            console.log(`selected ${idpointArret}`);
        };


        const onSubmit = (e) => {
            console.log(e);

            return axios
                .post("http://192.168.252.206:4000/api/bornes/addBorne", {
                    libelle: formState.libelle,
                    idPointArretFk: idpointArret,


                })
                .then((resp) => {

                    if (resp.status === 200) {


                        visible.value = false;
                        message.success("insertion de la borne effectuée avec succes");

                    } else {
                        message.error("echec d insertion de la borne!!");
                    }

                    console.log(resp);
                });
        };
        const formState = reactive({
            libelle: "",
            statut: "",
        });

        return {
            userName,
            visible,
            idpointArret,
            handleChangeBorne,
            showModal,
            onSubmit,
            formState,
            filters: [],
            pointarret: [],
            searchQuery: "",
        };
    },
    mounted() {
        fetch('http://192.168.252.206:4000/api/pointarrets')
            .then(response => response.json())
            .then(res => {
                this.pointarret = res.data


            })

    },
    methods: {
        recherchBornes() {
            this.$emit("search", this.rechercheBorne);
        },
    },
    // computed: {
    //     resultQuery() {
    //         if (this.searchQuery) {
    //             return this.resources.filter((item) => {
    //                 return this.searchQuery
    //                     .toLowerCase()
    //                     .split(" ")
    //                     .every((v) => item.title.toLowerCase().includes(v));
    //             });
    //         } else {
    //             return this.resources;
    //         }
    //     },
    // },
});
</script>




