<template>


  <a-card :style="{
    padding: '24px',
    background: '#fff',
    textAlign: 'center',
    minHeight: '360px',
  }" :bordered="false" id="macarte">




    <p>Choisir les points par ordre</p>
    <p>{{ formState.PointArretName }}</p>
    <div v-if="formState.PointArretZone.length > 0" :style="{
      marginBottom: '24px'
    }">
      <a-row>
        <div v-for="item in formState.PointArretZone" v-bind:key="item.id" :style="{
          marginLeft: '24px'
        }">
          <input type="checkbox" :id="item.id" :value="item.id" v-model="formState.PointArretName"
            @change="choicePoint">
          <label :for="item.id">{{ item.nom }}</label>
        </div>
      </a-row>


    </div>
    <div v-else :style="{
      marginBottom: '24px'
    }">
      <p>Aucun point d'arrêt</p>
    </div>



    <button @click="onSubmitAddingCheckbox">
      Ajouter
    </button>
    <button @click="onSubmitTroncon(true)">
      Generer tronçon dans les deux sens
    </button><button @click="onSubmitTroncon(false)">
      Generer tronçon dans un seul
    </button>



    <div id="map"></div>

    <a-modal v-model:visible="visibleTroncon" title="Modification" @ok="onSubmitMap">



    <div v-for="item in formState.troncon " v-bind:key="item.id">
        <p > {{ item.nom }}</p>
    </div>





    </a-modal>

  </a-card>
</template>

<script>

import { defineComponent, onMounted, reactive , ref } from "vue";
import { useRoute } from 'vue-router'
import leaflet from "leaflet"
// import * from "leaflet-routing-machine"
import { message } from "ant-design-vue";
import axios from "axios";


// import mapboxgl from 'mapbox-gl';



export default defineComponent({




  components: {
    // SearchHeader_Carte,
    // EditOutlined,
    // DeleteOutlined,
  },



  setup() {

    let router = useRoute()
    let map
    let dataMap

    const visibleTroncon = ref(false);

    const onSubmitTroncon = async (value) => {


      console.log("liste des points d'arrêts : ", formState.PointArretName)
      console.log("VALUE", value)
      // console.log(formState.PointArretName)

      console.log("DONNEES ENVOYEE",{
            id_ligne: formState.idligne,
            points: formState.PointArretName,
            sens: value
          })

      // if (formState.PointArretName > 0) {

          
      //   // console.log(resp)
        

      // }
      // else {

      //   message.info("Veuillez Ajouter des points d'arrêt à cette ligne !")

      // }


      const resp = await axios
          .post("http://192.168.252.223:4001/api/v1/Troncon/addTronconGenere", {
            id_ligne: formState.idligne,
            points: formState.PointArretName,
            sens: value
          });

          if (resp.status === 200) {

          console.log("RESULT DE L'API", resp.data.data)
          formState.troncon = resp.data.data
          message.success("Point arrêt ajouté à la ligne");
          visibleTroncon.value= true


          // router.push("/tableau-de-bord/liste-ligne")


        } else {
          console.log(resp);
          message.error("Erreur rencontré lors de l'ajout des points d'arrêts !!");

        }


    };

    const onSubmitAddingCheckbox = async () => {


      console.log("liste des points d'arrêts : ", formState.PointArretName)
      console.log(formState.PointArretName)


      const resp = await axios
        .post("http://192.168.252.223:4001/api/lignespointarret/addLignePointArret", {
          idLigneFk: formState.idligne,
          idPointArretFk: formState.PointArretName
        });


      console.log(resp)
      if (resp.status === 200) {

        console.log("RESULT DE L'API", resp)
        message.success("Point arrêt ajouté à la ligne");
        
        // router.push("/tableau-de-bord/liste-ligne")


      } else {
        console.log(resp)
        message.error("Erreur rencontré lors de l'ajout des points d'arrêts !!");
      }


    };




    const onUpdateCheckbox = async () => {


      console.log("liste des point d'arrêt : ", formState.PointArretName)
      console.log(formState.PointArretName)


      const resp = await axios
        .post("http://192.168.252.223:4001/api/lignespointarret/addLignePointArret", {
          idLigneFk: formState.id,
          idPointArretFk: formState.PointArretName
        });


      console.log(resp)
      if (resp.status === 200) {

        console.log(resp)
        message.success("Point arrêt ajouté");

        this.router.push("/tableau-de-bord/liste-pointarret")


      } else {
        console.log(resp)
        message.error("Erreur rencontré lors de l'ajout des points d'arrêts !!");
      }


    };


    const choicePoint = () => {

      map.eachLayer(function (layer) {


        console.log("CHAQUE LAYER", layer.options.pane)

        if (typeof layer.options.pane !== undefined && layer.options.pane === "markerPane") {

          map.removeLayer(layer)
          // leaflet.map('mapid').setView([5.3532642, -3.9779868], 15);

        }


      })

      formState.PointArretName.forEach((element) => {


        fetch(`http://192.168.252.223:4001/api/pointarrets/${element}`)
          .then(response => response.json())
          .then(res => {

            // formState.PointArretZone = res.data
            console.log("POINT ARRET PAR ID", element)
            console.log(res.data)


            console.log("LATITUDE :", res.data.latitude, " LONGITUDE :", res.data.longitude)
            leaflet.marker([res.data.latitude, res.data.longitude]).bindPopup('<b>LIEU :</b><br>' + res.data.nom).openPopup().addTo(map)




          })
          .catch(err => {
            console.log(err)
          })
      })

    }





    onMounted(() => {


      map = leaflet.map('map').setView([5.3434534, -4.026047], 8);



      leaflet.tileLayer(
        'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmlyZ2lsOTgiLCJhIjoiY2w0Zm51M2FxMDAzczNqbXM3c2VkMGZ1MCJ9.waYmvLmGKXV_oKqSOL7cLg', {
        tileSize: 512,
        zoomOffset: -1,

      }).addTo(map);





      console.log("ROUTE", router.params.data)

      dataMap = router.params.data.split('&')
      formState.idligne = dataMap[1]
      console.log("ACTION", dataMap[0])
      console.log("IDLIGNE", formState.idligne)
      console.log("IDZONE", dataMap[2])



      console.log("DATA", dataMap)
      console.log("Dans la condition de l'action ")
      if (dataMap[0] == "Update") {

        fetch(`http://192.168.252.223:4001/api/lignespointarret/${dataMap[1]}`)
          .then(response => response.json())
          .then(res => {

            res.data.forEach((element) => {
              console.log("IDPOINT arrete ", element.idPointArretFk.id)
              formState.PointArretName.push(element.idPointArretFk.id)

              leaflet.marker([element.idPointArretFk.latitude, element.idPointArretFk.longitude]).bindPopup('<b>LIEU :</b><br>' + element.idPointArretFk.nom).openPopup().addTo(map)

            })

          })
          .catch(err => {
            console.log(err)
          })


        // console.log("VALEUR DE ACTION  DATAMAP:", dataMap[0])
        fetch(`http://192.168.252.223:4001/api/pointarrets/getPointArretByZone/{idzonefk}?idzone=${dataMap[2]}`)
          .then(response => response.json())
          .then(res => {

            formState.PointArretZone = res.data

          })
          .catch(err => {
            console.log(err)
          })
        console.log("Modification de la BD")
      }
      else {



        // console.log("VALEUR DE ACTION  DATAMAP:", dataMap[0])
        fetch(`http://192.168.252.223:4001/api/pointarrets/getPointArretByZone/{idzonefk}?idzone=${dataMap[2]}`)
          .then(response => response.json())
          .then(res => {

            formState.PointArretZone = res.data

            console.log("LISTE DES POINT ARRET POUR LA ZONE", formState.PointArretZone)

          })
          .catch(err => {
            console.log(err)
          })
      }




    })


    const formState = reactive({
      idligne: "",
      PointArretName: [],
      PointArretZone: [],
      troncon: [],
      // Update : 0
      // idZoneparentFk: ""
    });

    return {
      choicePoint,
      map,
      formState,
      // DeleteMarker,
      dataMap,
      onSubmitAddingCheckbox,
      onUpdateCheckbox,
      onSubmitTroncon,
    visibleTroncon


    };
  },


  mounted() {

    console.log("Component mounted");

  },
});
</script>

<style>
#map {
  height: 500px;
}


#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}
</style>