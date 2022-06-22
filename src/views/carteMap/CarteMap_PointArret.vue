<template>

  <SearchHeader_Carte @change="handleSearch" />
  <a-card :style="{
    padding: '24px',
    background: '#fff',
    textAlign: 'center',
    minHeight: '360px',
  }" :bordered="false" id="macarte">

    <a-radio-group v-model:value="typePointArret" name="radioGroup" @change="onChange">
      <a-radio value="0">TOUS LES POINTS D'ARRÊTS</a-radio>
      <a-radio value="1">POINT D'ARRÊT PHYSIQUE</a-radio>
      <a-radio value="2">POINT D'ARRÊT VIRTUEL</a-radio>

    </a-radio-group>
    <p>{{ typePointArret }}</p>
    <div id="map"></div>

  </a-card>
</template>

<script>

import { defineComponent, onMounted, ref } from "vue";

import leaflet from "leaflet"
import { message } from "ant-design-vue";

// import mapboxgl from 'mapbox-gl';
import SearchHeader_Carte from "../../components/SearchHeader_Carte.vue";


export default defineComponent({
  components: {
    SearchHeader_Carte,
    // EditOutlined,
    // DeleteOutlined,
  },



  setup() {
    let map
    let idzone

    const typePointArret = ref('0');

    const onChange = (e) => {

      if (idzone == null) {
        message.info("Veuillez selectionné la zone ")
      }
      else{
        fetchData(idzone)
      }
      console.log("ID TYPE POINT ARRET", e.target.value)
      console.log("ID ZONE POINT ARRET", idzone)




    }

    const DeleteMarker = () => {

      map.eachLayer(function (layer) {

        // console.log(layer.options.pane)
        if (typeof layer.options.pane !== undefined && layer.options.pane === "markerPane") {

          // console.log("FEATURE")
          // console.log(typeof layer.feature)

          map.removeLayer(layer)
          // leaflet.map('mapid').setView([5.3532642, -3.9779868], 15);

        }


        // console.log(layer)
      })
    }
    // },

    const fetchData = (value) =>{


            // leaflet.marker.
      fetch(`http://192.168.252.223:4001/api/pointarrets/getPointArretByZone/{idzonefk}?idzone=${value}`)
        .then(response => response.json())
        .then(res => {


          console.log(res.data)
          // console.log(res.data)

          if (res.data.length > 0) {

            if (typePointArret.value == 0) {
              console.log("TYPE POINT ARRET == 0 ")
              message.success(`${res.data.length} Point d'arrêt dans cette zone`)
              res.data.forEach(element => {
                console.log("LATITUDE :", element.latitude, " LONGITUDE :", element.longitude)
                leaflet.marker([element.latitude, element.longitude]).bindPopup('<b>LIEU :</b><br>' + element.nom).openPopup().addTo(map)

              });
            }
            else {

              console.log("TYPE POINT D'ARRÊT :", typePointArret.value)

              DeleteMarker()
              // message.success(`${res.data.length} Point d'arrêt dans cette zone`)
            
                res.data.forEach(element => {
                
                if(element.idtypePointArret.id == typePointArret.value){
                  console.log("LATITUDE :", element.latitude, " LONGITUDE :", element.longitude)
                leaflet.marker([element.latitude, element.longitude]).bindPopup('<b>LIEU :</b><br>' + element.nom).openPopup().addTo(map)

                }
              });

     
            }

          }
          else {
            message.info("Aucun Point d'arrêt dans cette zone")

          }


        })
    }

    const handleSearch = (value) => {

      idzone = value
      console.log("PARENT :", idzone)


      fetchData(value)

      DeleteMarker()



    };

    onMounted(() => {


      map = leaflet.map('map').setView([5.3434534, -4.026047], 8);



      leaflet.tileLayer(
        'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmlyZ2lsOTgiLCJhIjoiY2w0Zm51M2FxMDAzczNqbXM3c2VkMGZ1MCJ9.waYmvLmGKXV_oKqSOL7cLg', {
        tileSize: 512,
        zoomOffset: -1,
        // attribution: '© <a href="https://www.mapbox.com/contribute/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);









    })

    return {
      map,
      handleSearch,
      typePointArret,
      DeleteMarker,
      onChange,
      fetchData


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