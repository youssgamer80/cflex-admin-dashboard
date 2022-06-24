<template>
    <a-card :bordered="false" style="margin: 10px 0" id="macarte">
        <a-typography-title :level="5">Recherche</a-typography-title>
        <div class="components-input-demo-presuffix">
            <!-- champs rech borne -->
            <a-row>
                <a-col :span="8">
                    <a-input-search type="text" placeholder="Rechercher un utilisateur" enter-button
                        @change="recherchUtilisateur" @keyup="recherchUtilisateur"
                        v-model:value="rechercheUtilisateur" />
                    <br />


                </a-col>




                <a-col :span="8" :offset="6">
                    <a-button type="primary" @click="showModal"> Ajouter </a-button>
                    <a-modal v-model:visible="visible" width="700px" padding="700px" title="Ajouter un utilisateur"
                        @ok="onSubmit">
                        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <a-form-item label="nom et prenom" :rules="[{ required: true }]">
                                <a-input v-model:value="formState.libelle" />
                            </a-form-item>


                            <a-form-item label="role" :rules="[{ required: true }]">
                                <a-select v-model:value="Idroles" tree-data-simple-mode style="width: 100%"
                                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" :tree-data="treeData"
                                    placeholder="attribuez un role" :load-data="onLoadData"
                                    @change="handleChangeUtilisateur">
                                    <!--liste des roles -->
                                    <a-select-option v-for="utilisateur in roles" v-bind:key="utilisateur.id"
                                        :value="utilisateur.id">{{
                                                utilisateur.role
                                        }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>


                        </a-form>
                    </a-modal>
                </a-col>

            </a-row>
        </div>
    </a-card>
</template>






<script>
import { message } from "ant-design-vue";
import { defineComponent, ref, reactive } from "vue";
import axios from "axios";

export default defineComponent({
    name: "SearchHeader_utilisateur",
    components: {},

    data() {
        return {
            rechercheUtilisateur: '',



        };
    },

    setup() {
        let Idroles

        const visible = ref(false);
        const showModal = () => {
            visible.value = true;
        };

        const handleChangeUtilisateur = value => {
            Idroles = value;
            console.log(`selected ${Idroles}`);
        };
        const formState = reactive({
            libelle: "",
            statut: "",
        });

        const onSubmit = (e) => {
            console.log(Idroles);
            console.log(e);

            if ((formState.libelle.length !== 0)) {


                // algorithme de generation de mot de passe de 8 elements aleatoire

                var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz0123456789";


                var lenString = 8;
                var randomstring = '';

                for (var i = 0; i < lenString; i++) {
                    var rnum = Math.floor(Math.random() * characters.length);
                    randomstring += characters.substring(rnum, rnum + 1);
                }



                return axios
                    .post("http://192.168.252.123:4002/utilisateur/saveutilisateur", {
                        nomUtilisateur: formState.libelle,
                        motDePasse: randomstring,
                        role: {
                            id: Idroles
                        },
                        statut: true,
                    })
                    .then((resp) => {

                        if (resp.status === 200) {

                            visible.value = false;
                            message.success(" insertion de l utilisateur effectué avec succés ");

                        } else {
                            message.error("echec d insertion de l utilisateur !!");
                        }

                        console.log(resp);
                    }).catch((err) => {
                        let message = typeof err.response !== "undefined" ?

                            err.response.data.message : err.message;


                        console.warn("erreur", message);
                    });
            } else {

                message.error("champs non rempli , veuillez rempli les champs SVP !!");
                console.log(Idroles);


            }






        }





        return {

            visible,
            Idroles,
            handleChangeUtilisateur,
            showModal,
            onSubmit,
            formState,
            filters: [],
            roles: [],
            searchQuery: "",
        };
    },
    mounted() {
        fetch('http://192.168.252.123:4002/api/roles')
            .then(response => response.json())
            .then(res => {
                this.roles = res.data


            })

    },
    methods: {
        recherchUtilisateur() {
            this.$emit("search", this.rechercheUtilisateur);
        },
    },

});
</script>




