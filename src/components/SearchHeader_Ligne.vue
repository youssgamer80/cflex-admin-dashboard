<template>
  <a-card :bordered="false" style="margin: 10px 0" id="macarte">
    <a-typography-title :level="5">Recherche</a-typography-title>
    <div class="components-input-demo-presuffix">
      <!-- Début Champ de recherche Type Transport-->
      <a-row>
        <a-col :span="8">
          <a-input-search type="text" placeholder="Rechercher" enter-button @change="onChange" @keyup="onChange"
            v-model:value="searchText" />
          <br />
        </a-col>
        <!-- Fin  Champ de recherche Type Transport-->

        <!-- Début  Modal Ajout Type Transport-->
        <a-col :span="8" :offset="6">
          <a-button type="primary" @click="showModal"> Ajouter </a-button>

          <a-modal v-model:visible="visible" width="500px" title="Ajouter Ligne" @ok="onSubmitLigne">

            <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">

              <a-form-item label="Nom" :rules="[{ required: true }]">
                <a-input v-model:value="formState.nom" />
              </a-form-item>


              <a-form-item label="Depart" :rules="[{ required: true }]">

                <a-space>
                  <a-select ref="select" v-model:value="formState.depart" style="width: 120px"
                    @change="handleChangeDepart">
                    <a-select-option v-for="item in dataPointArret" v-bind:key="item.id" :value="item.nom">{{
                        item.nom
                    }}
                    </a-select-option>

                  </a-select>

                </a-space>

              </a-form-item>


              <a-form-item label="Arrivee" :rules="[{ required: true }]">

                <a-space>
                  <a-select ref="select" v-model:value="formState.arrivee" style="width: 120px"
                    @change="handleChangeArrivee">
                    <a-select-option v-for="item in dataPointArret" v-bind:key="item.id" :value="item.nom">{{
                        item.nom
                    }}
                    </a-select-option>

                  </a-select>

                </a-space>

              </a-form-item>

              <a-form-item label="Tarif" :rules="[{ required: true }]">
                <a-input v-model:value="formState.tarif" />
              </a-form-item>



              <a-form-item label="Zone" :rules="[{ required: true }]">

                <a-space>
                  <a-select ref="select" v-model:value="formState.idZoneFk" style="width: 120px"
                    @change="handleChangeZone">
                    <a-select-option v-for="item in dataZone" v-bind:key="item.id" :value="item.id">{{ item.libelle
                    }}
                    </a-select-option>

                  </a-select>

                </a-space>

              </a-form-item>


              <a-form-item label="Type de transport" :rules="[{ required: true }]">

                <a-space>
                  <a-select ref="select" v-model:value="formState.idTypeTransportFk" style="width: 120px"
                    @change="handleChangeTypeTransport">
                    <a-select-option v-for="item in dataTypeTransport" v-bind:key="item.id" :value="item.id">{{
                        item.libelleTypeTransport
                    }}
                    </a-select-option>

                  </a-select>

                </a-space>
              </a-form-item>


            </a-form>
          </a-modal>


          <!-- Deuxieme modal pour l'ajout des points d'arrêt -->
          <a-modal v-model:visible="visibleAddPoint" width="500px" title="Ajouter les points d'arrêt"
            @ok="onSubmitAddingCheckbox">

            <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">

              <p>Liste des points d'arrêt</p>
              <div v-for="item in dataPointArret" v-bind:key="item.id">
                <input type="checkbox" :id="item.id" :value="item.id" v-model="formState.PointArretName">
                
                <label :for="item.id">{{ item.nom }}</label>
              </div>

            </a-form>
          </a-modal>

        </a-col>
        <!-- Fin Modal Ajout Type Transport-->
      </a-row>
    </div>
  </a-card>
</template>


<script>
import { defineComponent, ref, reactive } from "vue";
import axios from "axios";
import { message } from 'ant-design-vue';


export default defineComponent({
  name: "SearchHeader",
  components: {},

  data() {
    return {
      searchText: "",
    };
  },

  setup() {

    const searchQuery = ref('')
    const handleChangeTypeTransport = value => {
      formState.idTypeTransportFk = value;
      console.log(`selected type de transport ${formState.idTypeTransportFk}`);
    };




    const handleChangeZone = value => {
      formState.idZoneFk = value;
      console.log(`selected zone : ${formState.idZoneFk}`);
    };

    const handleChangeDepart = value => {
      formState.depart = value;
      console.log(`selected depart : ${formState.depart}`);
    };


    const handleChangeArrivee = value => {
      formState.arrivee = value;
      console.log(`selected arrivee : ${formState.arrivee}`);
    };




    const userName = ref("");
    const visible = ref(false);
    const visibleAddPoint = ref(false);
    const showModal = () => { visible.value = true };


    //fonction pour enregiqtrer une ligne

    const onSubmitLigne = async () => {
      visible.value = false;



      // Enregistrement de la longitude et latitude du point de depart
      formState.ListPointArret.forEach(element => {

        if (formState.depart == element.nom) {
          formState.depart_longitude = element.longitude
          formState.depart_latitude = element.latitude
        }
      })


      // Enregistrement de la longitude et latitude du point d'arrivee
      formState.ListPointArret.forEach(element => {

        if (formState.arrivee == element.nom) {
          formState.arrivee_longitude = element.longitude
          formState.arrivee_latitude = element.latitude

          console.log("ARRIVE LONG:", formState.arrivee_longitude)
          console.log("ARRIVE LAT:", formState.arrivee_latitude)
        }
      })



      console.log({
        nom: formState.nom,
        depart: formState.depart,
        arrivee: formState.arrivee,
        tarif: formState.tarif,
        depart_longitude: formState.depart_longitude,
        depart_latitude: formState.depart_latitude,
        arrivee_longitude: formState.arrivee_longitude,
        arrivee_latitude: formState.arrivee_latitude,
        idTypeTransportFk: formState.idTypeTransportFk,
        idZoneFk: formState.idZoneFk

      })

      // console.log("DONNEE DEPART : "+ formState.depart_latitude)
      // console.log("DONNEE ARRIVEE : "+ formState.arrivee_latitude)

      const resp = await axios
        .post("http://localhost:4001/api/lignes/addLigne", {
          nom: formState.nom,
          depart: formState.depart,
          arrivee: formState.arrivee,
          tarif: formState.tarif,
          depart_longitude: formState.depart_longitude,
          depart_latitude: formState.depart_latitude,
          arrivee_longitude: formState.arrivee_longitude,
          arrivee_latitude: formState.arrivee_latitude,
          idTypeTransportFk: formState.idTypeTransportFk,
          idZoneFk: formState.idZoneFk

        });


      // console.log(resp)
      if (resp.status === 200) {

        console.log(resp)
        visible.value = false;
        formState.id = resp.data.data.id
        message.success("Ligne ajouté");
        // formState.nom = ""
        // formState.idTypeTransportFk = 0
        // formState.idZoneFk = 0
        // formState.arrivee = "",
        // formState.depart = ""

        console.log(`Identifiant de la ligne crée : ${formState.id}`)
      } else {
        message.error("Erreur rencontré lors de l'ajout de la ligne !!");
      }

      visibleAddPoint.value = true

    };





    const onSubmitAddingCheckbox= async () => {
      visibleAddPoint.value = false;



      console.log("liste des point d'arrêt : ",formState.PointArretName)



      // console.log({
      //   nom: formState.nom,
      //   depart: formState.depart,
      //   arrivee: formState.arrivee,
      //   tarif: formState.tarif,
      //   depart_longitude: formState.depart_longitude,
      //   depart_latitude: formState.depart_latitude,
      //   arrivee_longitude: formState.arrivee_longitude,
      //   arrivee_latitude: formState.arrivee_latitude,
      //   idTypeTransportFk: formState.idTypeTransportFk,
      //   idZoneFk: formState.idZoneFk

      // })

      // console.log("DONNEE DEPART : "+ formState.depart_latitude)
      // console.log("DONNEE ARRIVEE : "+ formState.arrivee_latitude)

      // const resp = await axios
      //   .post("http://localhost:4001/api/lignes/addLigne", {
      //     nom: formState.nom,
      //     depart: formState.depart,
      //     arrivee: formState.arrivee,
      //     tarif: formState.tarif,
      //     depart_longitude: formState.depart_longitude,
      //     depart_latitude: formState.depart_latitude,
      //     arrivee_longitude: formState.arrivee_longitude,
      //     arrivee_latitude: formState.arrivee_latitude,
      //     idTypeTransportFk: formState.idTypeTransportFk,
      //     idZoneFk: formState.idZoneFk

      //   });


      // console.log(resp)
      // if (resp.status === 200) {

      //   console.log(resp)
      //   visible.value = false;
      //   formState.id = resp.data.data.id
      //   message.success("Ligne ajouté");
      //   // formState.nom = ""
      //   // formState.idTypeTransportFk = 0
      //   // formState.idZoneFk = 0
      //   // formState.arrivee = "",
      //   // formState.depart = ""

      //   console.log(`Identifiant de la ligne crée : ${formState.id}`)
      // } else {
      //   message.error("Erreur rencontré lors de l'ajout de la ligne !!");
      // }

      visibleAddPoint.value = false

    };





    const formState = reactive({
      id: "",
      nom: "",
      depart: "",
      arrivee: "",
      tarif: "",
      depart_longitude: "",
      depart_latitude: "",
      arrivee_longitude: "",
      arrivee_latitude: "",
      idTypeTransportFk: "",
      idZoneFk: "",

      ListPointArret: [],
      PointArretName:[]
      // idZoneparentFk: ""
    });

    return {
      // selectzoneparent,
      // selecttypezone,
      userName,
      visible,
      visibleAddPoint,
      showModal,
      onSubmitLigne,
      onSubmitAddingCheckbox,
      formState,
      filters: [],
      dataZone: [],
      dataTypeTransport: [],
      dataPointArret: [],
      idTypeZoneFk: "",
      idZoneparentFk: "",
      handleChangeTypeTransport,
      handleChangeZone,
      // onSearch,
      searchQuery,

      handleChangeDepart,
      handleChangeArrivee


    };
  },
  mounted() {
    console.log("Component mounted");

    fetch("http://localhost:4001/api/typetransport")
      .then(response => response.json())
      .then(res => {
        this.dataTypeTransport = res.data

        // console.log("ZONE PARENT")
        // console.log(this.dataTypeTransport)
        // console.log(this.dataTypeTransport[0].zoneparent)
      })

    fetch("http://localhost:4001/api/zones")
      .then(response => response.json())
      .then(res => {
        this.dataZone = res.data

        console.log("TYPE ZONE")
        // console.log(this.dataZone)
      })
      .catch(err => {
        console.log(err)
      })


    fetch("http://localhost:4001/api/pointarrets")
      .then(response => response.json())
      .then(res => {
        this.dataPointArret = res.data

        this.formState.ListPointArret = this.dataPointArret
        // console.log("POINT ARRÊT")
        // this.dataPointArret.forEach(element =>{
        //   console.log(element)
        // })
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {

    onChange() {
      this.$emit("search", this.searchText);
    },


  },

});
</script>




