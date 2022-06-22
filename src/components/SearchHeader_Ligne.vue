<template>
  <a-card :bordered="false" style="margin: 10px 0" id="macarte">
    <a-typography-title :level="5">Recherche</a-typography-title>
    <div class="components-input-demo-presuffix">
      <!-- Début Champ de recherche : DEBUT-->
      <a-row>
        <a-col :span="8">
          <a-input-search type="text" placeholder="Rechercher" enter-button @change="onChange" @keyup="onChange"
            v-model:value="searchText" />
          <br />
        </a-col>
        <!-- Fin  Champ de recherche : FIN-->


        <a-col :span="8" :offset="6">
          <a-button type="primary" @click="showModal"> Ajouter </a-button>


          <!-- 1RE modal pour l'ajout de la ligne : DEBUT -->
          <a-modal v-model:visible="visible" width="1000px" height="1000px" title="Modification de la ligne Ligne" @ok="onSubmitLigne">

            <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">

              <a-form-item label="Nom" :rules="[{ required: true }]">
                <a-input v-model:value="formState.nom" style="width: 120px" />
              </a-form-item>


              <a-form-item label="Depart" :rules="[{ required: true }]">

                <a-space>
                  <a-select ref="select" v-model:value="formState.depart" style="width: 220px"
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
                  <a-select ref="select" v-model:value="formState.arrivee" style="width: 220px"
                    @change="handleChangeArrivee">
                    <a-select-option v-for="item in dataPointArret" v-bind:key="item.id" :value="item.nom">{{
                        item.nom
                    }}
                    </a-select-option>

                  </a-select>

                </a-space>

              </a-form-item>

              <a-form-item label="Tarif" :rules="[{ required: true }]" >
                <a-input v-model:value="formState.tarif"  style="width: 120px" />
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

            </a-form>
          </a-modal>
          <!-- 1RE modal pour l'ajout de la ligne : FIN -->


          <!-- Deuxieme modal pour l'ajout des points d'arrêt : DEBUT -->
          
          <!-- Deuxieme modal pour l'ajout des points d'arrêt : FIN -->



          




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
import { useRouter } from "vue-router";


export default defineComponent({
  name: "SearchHeader",
  components: {},

  data() {
    return {
      searchText: "",
    };
  },

  setup() {


    const router = useRouter()


    const searchQuery = ref('')





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



    // let PointArretZone = [];
    const userName = ref("");
    const visible = ref(false);
    const visibleAddPoint = ref(false);
    const visibleMap = ref(false);
    const showModal = () => { visible.value = true };


    //fonction pour enregiqtrer une ligne

    const onSubmitLigne = async () => {




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




      const resp = await axios
        .post("http://192.168.252.223:4001/api/lignes/addLigne", {
          nom: formState.nom,
          depart: formState.depart,
          arrivee: formState.arrivee,
          tarif: formState.tarif,
          depart_longitude: formState.depart_longitude,
          depart_latitude: formState.depart_latitude,
          arrivee_longitude: formState.arrivee_longitude,
          arrivee_latitude: formState.arrivee_latitude,
          idZoneFk: formState.idZoneFk

        });


      // console.log(resp)
      if (resp.status === 200) {

        // console.log(resp)
        visible.value = false;
        formState.id = resp.data.data.id
        message.success("Ligne ajouté");
        // visibleAddPoint.value = true


        // formState.nom = ""
        // formState.idTypeTransportFk = 0
        // formState.idZoneFk = 0
        // formState.arrivee = "",
        // formState.depart = ""

        // let data ={
        //   idligne: 2,
        //   idzone: 3
        // }

        // const data = {
        //   id: 
        // }
      
        router.push(`/tableau-de-bord/lignepointarret/Add&${formState.id}&${formState.idZoneFk}`)
        // console.log("router", router)
        console.log(`Identifiant de la ligne crée : ${formState.id}`)


      } else {
        visible.value = true
        message.error("Erreur rencontré lors de l'ajout de la ligne !!");
      }



      fetch(`http://192.168.252.223:4001/api/pointarrets/getPointArretByZone/{idzonefk}?idzone=${formState.idZoneFk}`)
        .then(response => response.json())
        .then(res => {

          formState.PointArretZone = res.data
          console.log("PAR ZONE")
          console.log(formState.PointArretZone)


        })
        .catch(err => {
          console.log(err)
        })



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
      PointArretName: [],
      PointArretZone: []
      // idZoneparentFk: ""
    });

    return {
      // selectzoneparent,
      // selecttypezone,
      userName,
      visible,
      visibleAddPoint,
      visibleMap,
      showModal,
      onSubmitLigne,
      formState,
      filters: [],
      dataZone: [],
 
      dataPointArret: [],
      idTypeZoneFk: "",
      idZoneparentFk: "",
      // handleChangeTypeTransport,
      handleChangeZone,
      // onSearch,
      searchQuery,

      handleChangeDepart,
      handleChangeArrivee,

      // PointArretZone


    };
  },
  mounted() {
    console.log("Component mounted");

    

    fetch("http://192.168.252.223:4001/api/zones")
      .then(response => response.json())
      .then(res => {
        this.dataZone = res.data


        // console.log(this.dataZone)
      })
      .catch(err => {
        console.log(err)
      })


    fetch("http://192.168.252.223:4001/api/pointarrets")
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




