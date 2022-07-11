<template>


  <a-card :style="{
    padding: '24px',
    background: '#fff',
    textAlign: 'center',
    minHeight: '360px',
  }" :bordered="false" id="macarte">


    <h2>Choisir les points par ordre</h2>
    <p>{{ formState.PointArretName }}</p>




    <div v-if="formState.PointArretZone.length > 0" :style="{
      marginBottom: '24px'
    }">

      <a-row :style="{
        position: 'relative',
        left: '250px'
      
      }">
        <div v-for="itemZone in formState.ListZone" v-bind:key="itemZone.id" :style="{
          marginLeft: '24px'
        }">
          <a-dropdown>
            <a class="ant-dropdown-link">
              {{ itemZone }}
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <div v-for="itemPointArret in formState.PointArretZone" v-bind:key="itemPointArret.id" :style="{
                  marginLeft: '24px'
                }">

                  <input type="checkbox" v-if="itemPointArret.idZoneFk.libelle == itemZone" :id="itemPointArret.id"
                    :value="itemPointArret.id" v-model="formState.PointArretName" @change="choicePoint"
                    :style="{ display: 'none' }">

                  <label :for="itemPointArret.id" v-if="itemPointArret.idZoneFk.libelle == itemZone">{{
                      itemPointArret.nom
                  }}</label>

                </div>

              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-row>

      <p>Point d'arrêt choisi</p>
      <div v-for="itemPointArretZone in formState.PointArretZone" v-bind:key="itemPointArretZone.id">
        <div v-for="itemPointArret in formState.PointArretName" v-bind:key="itemPointArret.id">
          <a-row v-if="itemPointArretZone.id == itemPointArret">
            {{ itemPointArretZone.nom }}
          </a-row>
        </div>
      </div>

    </div>
    <div v-else :style="{
      marginBottom: '24px'
    }">
      <p>Aucun point d'arrêt</p>
    </div>








    <div v-if="formState.PointArretZone.length > 0" :style="{
      marginBottom: '24px',
      display: 'none'
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








    <div id="map"></div>
    <div :style="{
      marginTop: '24px',
      paading: '24px'
    }">
      {{ formState.route }}
      <a-button type="primary" @click="onUpdateCheckbox" v-if="formState.route == 'Update'">Modifier</a-button>
      <a-button type="primary" @click="onSubmitAddingCheckbox" v-if="formState.route == 'Add'">Ajouter</a-button>

      <a-button type="primary" @click="onSubmitTroncon(true)" :style="{
        marginLeft: '24px',
      }">
        Generer tronçon-(deux sens)
      </a-button>

      <a-button type="primary" @click="onSubmitTroncon(false)" :style="{
        marginLeft: '24px',
      }">
        Generer tronçon(un seul)
      </a-button>
    </div>

    <a-modal v-model:visible="visibleTroncon" title="TRONCON" :style="{ width: '800px' }">
      <!-- {{ formState.dataTypeTransport}} -->
      <table>
        {{ formState.prixTroncon }}
        <tr>
          <th>TRONCON</th>
          <th>TYPE DE TRANSPORT</th>
          <th>PRIX</th>
        </tr>
        <tr v-for="(item, index) in formState.troncon" v-bind:key="item.id">
          <td>{{ item.nom }} </td>
          <td>
            <a-space>
              <a-select ref="select" v-model:value="formState.idTypeTransport[index]" style="width: 220px"
                @change="handleChangeTypeTransport">
                <a-select-option v-for="item in formState.dataTypeTransport" v-bind:key="item.id" :value="item.id">{{
                    item.libelleTypeTransport
                }}
                </a-select-option>

              </a-select>

            </a-space>
          </td>
          <td>
            <a-input placeholder="Prix du tronçon" v-model:value="formState.prixTroncon[index]" />
          </td>
        </tr>
        <tr>
          <td>
            <a-button @click="onValidateTroncon"> Valider
            </a-button>
          </td>
        </tr>
      </table>

      <template #footer>


      </template>

    </a-modal>

    <!-- MODAL POUR CHOISIR LES TRONCONS VALIDE : FIN -->


  </a-card>
</template>

<script>

import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute } from 'vue-router'
import leaflet from "leaflet"

import { message } from "ant-design-vue";
import { DownOutlined } from '@ant-design/icons-vue'
import axios from "axios";




export default defineComponent({

  components: {
    DownOutlined
  },



  setup() {

    let router = useRoute()
    let map
    let dataMap


    const visibleTroncon = ref(false);
    const loading = ref(false);



    const handleChangeTypeTransport = value => {

      formState.valueTypeTransport = value
      console.log(`TYPE DE TRANSPORT : ${formState.valueTypeTransport}`);
    };




    const onSubmitTroncon = async (value) => {

      formState.valuePrix = ""
      formState.valueTypeTransport = ""

      console.log("liste des points d'arrêts : ", formState.PointArretName)
      console.log("VALUE", value)
      // console.log(formState.PointArretName)

      console.log("DONNEES ENVOYEE", {
        id_ligne: router.params.idligne,
        points: formState.PointArretName,
        sens: value
      })

      const resp = await axios
        .post("http://192.168.252.206:4001/api/v1/Troncon/addTronconGenere", {
          id_ligne: router.params.idligne,
          points: formState.PointArretName,
          sens: value
        });

      if (resp.status === 200) {

        console.log("RESULT DE L'API", resp.data.data)

        formState.troncon = resp.data.data
        formState.prixTroncon = new Array(formState.troncon.length);
        formState.idTypeTransport = new Array(formState.troncon.length);

        // console.log("prixTroncon[0]", formState.prixTroncon[0])
        message.success("Point arrêt ajouté à la ligne");
        visibleTroncon.value = true


        // router.push("/tableau-de-bord/liste-ligne")


      } else {
        console.log(resp);
        message.error("Erreur rencontré lors de l'ajout des points d'arrêts !!");

      }


    };


    const onValidateTroncon = () => {


      // console.log("IDTRONCON");

      // console.log(formState.idTypeTransport);

      // console.log("PRIX TRONCON");

      // console.log(formState.prixTroncon);

      let elementvide = 0
      formState.troncon.forEach((element, index) => {

        // console.log("Troncon", (index + 1))
        // console.log(element)
        // console.log(formState.idTypeTransport[index])
        // console.log(formState.prixTroncon[index])


        if (formState.idTypeTransport[index] == null || formState.prixTroncon[index] == null || formState.prixTroncon[index] == "") {

          elementvide++
        }


      })

      // console.log("ELEMENT VIDE");
      // console.log(elementvide);

      if (elementvide == formState.troncon.length) {

        message.info("ERREUR LORS DU REMPLISSAGE DES TRONCONS")
      } else {

        let etat = false;


        formState.troncon.forEach((element, index) => {



          axios
            .put(`http://192.168.252.206:4001/api/v1/Troncon/updateTroncon/${element.id}`,
              {
                statut: true

              }
            ).then((response) => {
              console.log(response.data.status);
              console.log("REPONSE API TRONCON ", response.data.data);
            }).catch(err => {

              console.log(err);
              console.log("les données sont vide");
            });

          // console.log("DONNE ENVOYEE A TRONCON TYPE TRANSPORT ")
          // console.log({
          //   idTronconFk: element.id,
          //   idTypeTransportFk: formState.idTypeTransport[index],
          //   prix: formState.prixTroncon[index]
          // })


          axios
            .post("http://192.168.252.206:4001/api/troncontypetransport/addTronconTypeTransport", {
              idTronconFk: element.id,
              idTypeTransportFk: formState.idTypeTransport[index],
              prix: formState.prixTroncon[index]
            }).then((response) => {
              console.log(response.data.status);
              console.log("REPONSE API TRONCON TYPE TRANSPORT ", response.data.data);
            }).catch(err => {

              console.log(err);
              console.log("les données sont vide");
            });



          // console.log("ELEMENT FINI", (index + 1), "-----------------")
        });



        if (etat) (

          message.error("Erreur rencontré lors de l'ajout des tronçons !!")
        )
        else (


          message.success("Tronçon ajoutés")
          // router.push("/tableau-de-bord/liste-ligne")

        )
      }



    }



    const onSubmitAddingCheckbox = async () => {


      console.log("liste des points d'arrêts : ", formState.PointArretName)
      console.log("idligne : ", router.params.idligne)
      console.log(formState.PointArretName)


      const resp = await axios
        .post("http://192.168.252.206:4001/api/lignespointarret/addLignePointArret", {
          idLigneFk: router.params.idligne,
          idPointArretFk: formState.PointArretName
        });


      // console.log(resp)
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
      // console.log(formState.PointArretName)


      const resp = await axios
        .put("http://192.168.252.206:4001/api/lignespointarret/updateligne/", {
          idLigneFk: formState.idligne,
          idPointArretFk: formState.PointArretName
        });


      // console.log(resp)
      if (resp.status === 200) {

        // console.log(resp)
        message.success("Point arrêt modifié");

        // router.push("/tableau-de-bord/liste-pointarret")


      } else {
        // console.log(resp)
        message.error("Erreur rencontré lors de la modification des points d'arrêts !!");
      }


    };


    const choicePoint = () => {

      map.eachLayer(function (layer) {


        // console.log("CHAQUE LAYER", layer.options.pane)

        if (typeof layer.options.pane !== undefined && layer.options.pane === "markerPane") {

          map.removeLayer(layer)
          // leaflet.map('mapid').setView([5.3532642, -3.9779868], 15);

        }

        if (
          typeof layer.options.pane !== undefined &&
          layer.options.pane === "overlayPane"
        ) {
          formState.map.removeLayer(layer);

        }


      })

      formState.PointArretName.forEach((element) => {


        fetch(`http://192.168.252.206:4001/api/pointarrets/${element}`)
          .then(response => response.json())
          .then(res => {

            // formState.PointArretZone = res.data
            // console.log("POINT ARRET PAR ID", element)
            // console.log(res.data)


            // console.log("LATITUDE :", res.data.latitude, " LONGITUDE :", res.data.longitude)
            leaflet.marker([res.data.latitude, res.data.longitude]).bindPopup('<b>LIEU :</b><br>' + res.data.nom).openPopup().addTo(map)




          })
          .catch(err => {
            console.log(err)
          })
      })



      // console.log("formState.PointArretName.length", formState.PointArretName.length)

      // for (let i = 0; i < formState.PointArretName.length - 1; i++) {

      //   console.log("formState.PointArretName[i]", formState.PointArretName[i])
      //   fetch(`http://192.168.252.206 :4001/api/pointarrets/${formState.PointArretName[i]}`)
      //     .then(response => response.json())
      //     .then(res => {


      //       formState.dataPointDepartLon = res.data.longitude
      //       formState.dataPointDepartLat = res.data.latitude

      //       console.log("dataPoint", (i + 1), " ", formState.dataPointDepartLon)

      //     })
      //     .catch(err => {
      //       console.log(err)
      //     })


      //   fetch(`http://192.168.252.206 :4001/api/pointarrets/${formState.PointArretName[i + 1]}`)
      //     .then(response => response.json())
      //     .then(res => {


      //       formState.dataPointArriveeLon = res.data.longitude
      //       formState.dataPointArriveeLat = res.data.latitude

      //       console.log("dataPoint", (i + 1), " ", formState.dataPointArriveeLon)




      //     })
      //     .catch(err => {
      //       console.log(err)
      //     })


      //   // fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62488b5819dc6c8d4cd6b9d35d216f74c9c6&start=${formState.dataPointDepartLon},${formState.dataPointDepartLat}&end=${formState.dataPointArriveeLon},${formState.dataPointArriveeLat}`)
      //   //   .then(res => res.json()
      //   //     .then(data => {

      //   //       console.log(data)
      //   //       const long = data.features[0].geometry.coordinates.length
      //   //       for (let i = 0; i < long - 1; i++) {
      //   //         // console.log("Numero :", (i + 1))
      //   //         // console.log(data.features[0].geometry.coordinates[i][0])

      //   //         leaflet.polygon([
      //   //           [data.features[0].geometry.coordinates[i][1], data.features[0].geometry.coordinates[i][0]],
      //   //           [data.features[0].geometry.coordinates[i + 1][1], data.features[0].geometry.coordinates[i + 1][0]],

      //   //         ]).addTo(map);
      //   //       }
      //   //     }))


      //   // console.log("EN DEHORS DE L'OPEN ROUTE ")
      //   // console.log("formState.dataPointDepartLon", formState.dataPointDepartLon)
      //   // console.log("formState.dataPointArriveeLon", formState.dataPointArriveeLon)
      //   // leaflet
      //   //   .marker([latA, lonA])
      //   //   .bindPopup("<b>LIEU :</b><br>" + nomA)
      //   //   .openPopup()
      //   //   .addTo(formState.map);

      //   // leaflet
      //   //   .marker([latB, lonB])
      //   //   .bindPopup("<b>LIEU :</b><br>" + nomB)
      //   //   .openPopup()
      //   //   .addTo(formState.map);
      //   // formState.map.panTo(new leaflet.LatLng([latB, lonB]));


      // }
    }


    const onDelete = (id) => {
      // return axios
      //   .delete(`http://192.168.252.206:4000/proprietaire/delete/${id}`, {
      //     data: {
      //       statut: false,
      //     },
      //   })
      //   .then((resp) => {
      //     if (resp.status === 200) {
      //       dataSource.value = dataSource.value.filter(
      //         (item) => item.id !== id
      //       );
      //       message.success("Supprimé avec succès!!");
      //     } else {
      //       message.error("impossible!!");
      //     }
      //   });
      console.log(id)
    };


    onMounted(() => {


      map = leaflet.map('map').setView([5.3434534, -4.026047], 13);

      leaflet.tileLayer(
        'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmlyZ2lsOTgiLCJhIjoiY2w0Zm51M2FxMDAzczNqbXM3c2VkMGZ1MCJ9.waYmvLmGKXV_oKqSOL7cLg', {
        tileSize: 512,
        zoomOffset: -1,

      }).addTo(map);


      console.log("ROUTE", router.params)


      console.log("Dans la condition de l'action ")
      if (router.params.route == 'Update') {

        formState.route = 'Update'
        console.log("formState.route", formState.route)

        fetch(`http://192.168.252.206:4001/api/lignespointarret/${router.params.idligne}`)
          .then(response => response.json())
          .then(res => {
            console.log("DATA POINT ARRÊT", res)
            res.data.forEach((element) => {
              console.log("IDPOINT arrete ", element.idPointArretFk.id)
              formState.PointArretName.push(element.idPointArretFk.id)

              leaflet.marker([element.idPointArretFk.latitude, element.idPointArretFk.longitude]).bindPopup('<b>LIEU :</b><br>' + element.idPointArretFk.nom).openPopup().addTo(map)

            })

          })
          .catch(err => {
            console.log(err)
          })


        fetch(`http://192.168.252.206:4001/api/pointarrets`)
          .then(response => response.json())
          .then(res => {


            res.data.forEach((element) => {

              if (element.idZoneFk.id == router.params.idzone || element.idZoneFk.idZoneparentFk.zoneparent ==  router.params.libelleZone ) {
                // console.log("RES DATA/ELEMENT libelle", element)

                formState.PointArretZone.push(element)
              }

            })

          })
          .catch(err => {
            console.log(err)
          })

        console.log("formState.PointArretZone",formState.PointArretZone)
        // DETERMINER LE NOMBRE DE ZONE 
        console.log("router.params.libelleZone", router.params.libelleZone)
        let etat = true
        
        formState.PointArretZone.forEach((element) => {

          if (element.idZoneFk.idZoneparentFk.zoneparent == router.params.libelleZone) {
            console.log("ZONE PARENT ABIDJAN", element)
          }

        })
        console.log("ETAT",etat)
        // if(etat){
        //   console.log("ZONE PARENT")
        // }else{

        // console.log("ZONE FILLE")
        // }



        console.log("Modification de la BD")
      }
      else {

        formState.route = "Add"

        console.log("formState.route", formState.route)



        // console.log("VALEUR DE ACTION  DATAMAP:", dataMap[0])
        console.log("RECHERCHE DE TOUS LES POINTS D'ARRÊT POUR LA ZONE ENVOYÉE")

        fetch(`http://192.168.252.206:4001/api/pointarrets`)
          .then(response => response.json())
          .then(res => {
            res.data.forEach((element) => {

              if (router.params.NomZoneParent != "null") {
                console.log("NOMZONEPARENT NON NULL")
                if (element.idZoneFk.libelle == router.params.NomZoneParent) {
                  console.log("RES DATA/ELEMENT libelle", element)

                  formState.PointArretZone.push(element)
                }
                else {
                  if (element.idZoneFk.idZoneparentFk.zoneparent == router.params.NomZoneParent) {
                    console.log("RES DATA/ELEMENT zoneparent", element)

                    formState.PointArretZone.push(element)
                  }
                }

              }
              else {
                console.log("NOMZONEPARENT NULL")
                if (element.idZoneFk.id == router.params.idzone) {
                  console.log("RES DATA/ELEMENT libelle", element)

                  formState.PointArretZone.push(element)
                }


              }

            })
            console.log("nombre occurrence", formState.PointArretZone.length)
            formState.PointArretName.push(router.params.iddepart)
            formState.PointArretName.push(router.params.idarrivee)


            // DETERMINER LE NOMBRE DE ZONE 
            formState.PointArretZone.forEach((element) => {

              if (router.params.NomZoneParent != null) {
                if (!formState.ListZone.includes(element.idZoneFk.libelle) && element.idZoneFk.libelle != router.params.NomZoneParent) {

                  formState.ListZone.push(element.idZoneFk.libelle)

                }
              }
              else {
                if (!formState.ListZone.includes(element.idZoneFk.libelle) && element.idZoneFk.id == router.params.idzone) {

                  formState.ListZone.push(element.idZoneFk.libelle)

                }
              }

            })

            console.log(" formState.ListZone", formState.ListZone)
            formState.PointArretName.forEach((element) => {


              fetch(`http://192.168.252.206:4001/api/pointarrets/${element}`)
                .then(response => response.json())
                .then(res => {

                  // formState.PointArretZone = res.data
                  // console.log("POINT ARRET PAR ID", element)
                  // console.log(res.data)


                  // console.log("LATITUDE :", res.data.latitude, " LONGITUDE :", res.data.longitude)
                  leaflet.marker([res.data.latitude, res.data.longitude]).bindPopup('<b>LIEU :</b><br>' + res.data.nom).openPopup().addTo(map)


                })
                .catch(err => {
                  console.log(err)
                })
            })


            console.log("LISTE DES ZONES", formState.ListZone)

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
      dataTypeTransport: [],
      troncon: [],
      prixTroncon: "",
      idTypeTransport: "",
      dataPointDepartLon: "",
      dataPointDepartLat: "",
      dataPointArriveeLon: "",
      dataPointArriveeLat: "",
      ListZone: []

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
      visibleTroncon,
      onValidateTroncon,
      loading,

      onDelete,
      handleChangeTypeTransport,



    };
  },


  mounted() {

    console.log("Component mounted");



    fetch("http://192.168.252.206:4001/api/typetransport")
      .then(response => response.json())
      .then(res => {

        console.log(res.data);
        this.formState.dataTypeTransport = res.data

      })
      .catch(err => {
        console.log(err)
      })

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

table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 10px;
}
</style>