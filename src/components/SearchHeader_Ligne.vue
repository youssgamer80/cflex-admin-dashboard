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
          <a-modal v-model:visible="visible" width="1000px" height="1000px" title="Création de la ligne"
            @ok="onSubmitLigne">

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

              <a-form-item label="Tarif" :rules="[{ required: true }]">
                <a-input v-model:value="formState.tarif" style="width: 120px" />
              </a-form-item>



              <a-form-item label="Zone" :rules="[{ required: true }]">

                <a-space>
                  <a-select ref="select" v-model:value="formState.idZoneFk" style="width: 120px"
                    @change="handleChangeZone">
                    <a-select-option v-for="item in formState.dataZone" v-bind:key="item.id" :value="item.id">{{
                        item.libelle
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


    const handleChangeZone = value => {
      formState.idZoneFk = value;
      console.log(`selected zone : ${formState.idZoneFk}`);
    };

    const handleChangeDepart = value => {
      formState.depart = value;
      console.log(`selected depart : ${formState.depart}`);



      formState.ListPointArret.forEach(element => {

        if ((formState.depart) && formState.depart == element.nom) {

          idZoneDepart = element.idZoneFk.id
          NomZoneParentDepart = element.idZoneFk.idZoneparentFk.zoneparent
          console.log("formState DEPART")
          // console.log("NomZoneParentDepart", NomZoneParentDepart)
          console.log("idZoneDepart", idZoneDepart)
          console.log("idZoneFk", formState.idZoneFk)


        }

        if ((formState.arrivee) && formState.arrivee == element.nom) {

          idZoneArrivee = element.idZoneFk.id
          NomZoneParentArrivee = element.idZoneFk.idZoneparentFk.zoneparent
          console.log("idZoneArrivee", idZoneArrivee)
          console.log("idZoneFk", formState.idZoneFk)

        }

        if ((idZoneDepart) && (idZoneArrivee) && idZoneDepart == idZoneArrivee) {
          formState.idZoneFk = idZoneArrivee
          NomZoneParentDepart= null
          console.log("ID ZONE", idZoneArrivee)
          console.log("NomZoneParentDepart", NomZoneParentDepart)

        } else {


          if (NomZoneParentDepart == NomZoneParentArrivee) {
            console.log("ZONE DIFFERENCE ")

            formState.dataZone.forEach(element => {

              // console.log("ZONE PARENT ",element.nom)
              if (NomZoneParentDepart == element.libelle) {

                formState.idZoneFk = element.id

                console.log("ZONE PARENT TROUVE", formState.idZoneFk)

              }

            })
          }
          else {
            formState.idZoneFk = ""
          }
        }


      })

    };


    const handleChangeArrivee = value => {
      formState.arrivee = value;
      console.log(`selected arrivee : ${formState.arrivee}`);


      formState.ListPointArret.forEach(element => {

        if ((formState.depart) && formState.depart == element.nom) {

          idZoneDepart = element.idZoneFk.id
          NomZoneParentDepart = element.idZoneFk.idZoneparentFk.zoneparent
          console.log("formState DEPART NON VIDE")
          // console.log("NomZoneParent", NomZoneParentDepart)
          console.log("idZoneDepart", idZoneDepart)
          console.log("idZoneFk", formState.idZoneFk)

        }

        if ((formState.arrivee) && formState.arrivee == element.nom) {

          idZoneArrivee = element.idZoneFk.id
          NomZoneParentArrivee = element.idZoneFk.idZoneparentFk.zoneparent
          console.log("idZoneArrivee", idZoneArrivee)
          console.log("idZoneFk", formState.idZoneFk)

        }

        if ((idZoneDepart) && (idZoneArrivee) && idZoneDepart == idZoneArrivee) {
          formState.idZoneFk = idZoneArrivee
          console.log("ID ZONE", idZoneArrivee)
          NomZoneParentDepart= null
          console.log("NomZoneParentDepart", NomZoneParentDepart)


        } else {


          if (NomZoneParentDepart == NomZoneParentArrivee) {
            console.log("ZONE DIFFERENCE ")

            formState.dataZone.forEach(element => {

              // console.log("ZONE PARENT ",element.nom)
              if (NomZoneParentDepart == element.libelle) {

                formState.idZoneFk = element.id

                console.log("ZONE PARENT TROUVE", formState.idZoneFk)

              }

            })
          }
          else {
            formState.idZoneFk = ""
          }
        }


      })



    };


    let idZoneDepart = ""
    let idZoneArrivee = ""
    let NomZoneParentDepart = ""
    let NomZoneParentArrivee = ""


    const userName = ref("");
    const visible = ref(false);
    const visibleAddPoint = ref(false);
    const visibleMap = ref(false);
    const showModal = () => { visible.value = true };


    //fonction pour enregiqtrer une ligne

    const onSubmitLigne = async () => {



      // console.log("NOM", formState.nom)
      // console.log("DEPART", formState.depart)
      // console.log("ARRIVEE", formState.arrivee)
      // console.log("TARIF", formState.tarif)
      // console.log("ZONE", formState.idZoneFk)


      if (formState.nom != "" && formState.depart != "" && formState.arrivee != "" && formState.tarif != "" && formState.idZoneFk != "") {

        // Enregistrement de la longitude et latitude du point de depart
        formState.ListPointArret.forEach(element => {

          if (formState.depart == element.nom) {
            formState.iddepart = element.id
            formState.depart_longitude = element.longitude
            formState.depart_latitude = element.latitude

            formState.dataDepartZoneLibelle = element.idZoneFk.libelle

          }

          // Enregistrement de la longitude et latitude du point d'arrivee
          if (formState.arrivee == element.nom) {
            formState.idarrivee = element.id
            formState.arrivee_longitude = element.longitude
            formState.arrivee_latitude = element.latitude


            // console.log("ARRIVE LONG:", formState.arrivee_longitude)
            // console.log("ARRIVE LAT:", formState.arrivee_latitude)
            console.log("ELEMENT", element)

          }


        })



        // formState.ListPointArret.forEach(element => {

        //   if (formState.arrivee == element.nom) {
        //     formState.idarrivee = element.id
        //     formState.arrivee_longitude = element.longitude
        //     formState.arrivee_latitude = element.latitude


        //     // console.log("ARRIVE LONG:", formState.arrivee_longitude)
        //     // console.log("ARRIVE LAT:", formState.arrivee_latitude)
        //     console.log("ELEMENT", element)

        //   }
        // })




        const resp = await axios
          .post("http://192.168.252.206:4001/api/lignes/addLigne", {
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


        console.log(resp)
        if (resp.status === 200) {

          console.log(resp)
          if (resp.data.data != null) {

            visible.value = false;
            formState.id = resp.data.data.id
            message.success("Ligne ajouté");

            formState.dataZone.forEach((element)=>{

              if(element.id == formState.idZoneFk){

                formState.libelleZone= element.libelle
               
              }

            })

            // console.log("ROUTE ", formState.dataDepartZoneparent)
            console.log("formState.libelleZone",formState.libelleZone)
            // console.log(`/tableau-de-bord/lignepointarret/Add/${formState.id}/${formState.idZoneFk}/${formState.iddepart}/${formState.idarrivee}/${NomZoneParentDepart}`)
            router.push(`/tableau-de-bord/lignepointarret/Add/${formState.id}/${formState.idZoneFk}/${formState.libelleZone}/${NomZoneParentDepart}/${formState.iddepart}/${formState.idarrivee}`)

            console.log(`Identifiant de la ligne crée : ${formState.id}`)

          }
          else {
            message.error("Nom de ligne dejà existant");

          }


        } else {
          // visible.value = true
          message.error("Erreur rencontré lors de l'ajout de la ligne !!");
        }






      }
      else {

        message.info("Veuillez remplir les champs vide svp !")
      }


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
      idZoneFk: "",

      ListPointArret: [],
      PointArretName: [],
      iddepart: "",
      idarrivee: "",

      dataDepartZoneLibelle: "",
      dataZone: [],
      libelleZone: ""


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


      dataPointArret: [],
      idTypeZoneFk: "",
      idZoneparentFk: "",
      // handleChangeTypeTransport,
      handleChangeZone,
      // onSearch,

      handleChangeDepart,
      handleChangeArrivee,

      // PointArretZone
      idZoneDepart,
      idZoneArrivee,
      NomZoneParentDepart,
      NomZoneParentArrivee,


    };
  },
  mounted() {




    fetch("http://192.168.252.206:4001/api/zones")
      .then(response => response.json())
      .then(res => {
        this.formState.dataZone = res.data


        // console.log(this.dataZone)
      })
      .catch(err => {
        console.log(err)
      })


    fetch("http://192.168.252.206:4001/api/pointarrets")
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




