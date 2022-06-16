<template>

  <SearchHeader_Carte @change="handleSearch" />
  <a-card :style="{
    padding: '24px',
    background: '#fff',
    textAlign: 'center',
    minHeight: '360px',
  }" :bordered="false" id="macarte">


    <div id="map"></div>

  </a-card>
</template>

<script>

import { defineComponent, onMounted, } from "vue";

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



    // const handleSearch(value) {


    // },


    const handleSearch = (value) => {
      console.log("PARENT :", value)
      

       map.eachLayer(function (layer) {
        
        console.log( layer.options.pane)
        if (typeof layer.options.pane !== undefined && layer.options.pane === "markerPane") {

          console.log("FEATURE")
          console.log(typeof layer.feature)
          
          map.removeLayer(layer)
          // leaflet.map('mapid').setView([5.3532642, -3.9779868], 15);

        }


        // console.log(layer)
      })


      // leaflet.marker.
      fetch(`http://192.168.252.223:4001/api/pointarrets/getPointArretByZone/{idzonefk}?idzone=${value}`)
        .then(response => response.json())
        .then(res => {

          
          console.log(res.data)
          // console.log(res.data)

          if (res.data.length > 0) {

            message.success(`${ res.data.length } Point d'arrêt dans cette zone`)
            res.data.forEach(element => {
              console.log("LATITUDE :", element.latitude, " LONGITUDE :", element.longitude)
              leaflet.marker([element.latitude, element.longitude]).bindPopup('<b>LIEU :</b><br>' + element.nom).openPopup().addTo(map)
              // leaflet.marker="";
            });
          }
          else {
            message.info("Aucun Point d'arrêt dans cette zone")

          }


        })
    };

    onMounted(() => {


      map = leaflet.map('map').setView([5.3434534, -4.026047], 8);



      leaflet.tileLayer(
        'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmlyZ2lsOTgiLCJhIjoiY2w0Zm51M2FxMDAzczNqbXM3c2VkMGZ1MCJ9.waYmvLmGKXV_oKqSOL7cLg', {
        tileSize: 512,
        zoomOffset: -1,
        attribution: '© <a href="https://www.mapbox.com/contribute/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);









    })

    return {
      map,
      handleSearch


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