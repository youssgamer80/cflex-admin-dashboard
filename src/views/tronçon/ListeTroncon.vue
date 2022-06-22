<template>
  <a-typography-title :level="4">Liste des tronçons</a-typography-title>

  <!-- <SearchHeader @search="handleSearch" /> -->
  <a-card :style="{
    padding: '24px',
    background: '#fff',
    textAlign: 'center',
    minHeight: '360px',
  }" :bordered="false" id="macarte">
    <a-table :columns="columns" :row-key="keyTypeTransport" :data-source="dataSource" :pagination="pagination"
      :loading="loading" @change="handleTableChange">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'idPointArretBFk'">{{ text.nom }}
        </template>
        <template v-if="column.dataIndex === 'idPointArretAFk'">{{ text.nom }}
        </template>
        <!-- <template v-if="column.dataIndex === 'hibernateLazyInitializer'"
          >{{ record.idPointArretAFk.idZoneFk.libelle }}
        </template> -->

        <template v-if="column.dataIndex === 'statut'">
          <!-- <p v-if="text">Disponible</p>
          <p v-else>Indisponible</p> -->
          {{ record.idPointArretAFk.idZoneFk.idZoneparentFk.zoneparent }}
        </template>
        <template v-else-if="['action'].includes(column.dataIndex)">
          <div>
            <!--Début Modale Modifier tronçon-->
            <a-modal v-model:visible="visible" title="Modification" @ok="onSubmit">
              <!--Formulaire modification type transport-->
              <a-form name="basic" autocomplete="off" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                @finish="onFinish">
                <a-form-item label="libelle" name="libelle">
                  <a-input v-model:value="formState.libelle" />
                </a-form-item>
              </a-form>
              <!--Formulaire modification tronçon" -->
            </a-modal>

            <pushpin-outlined :style="{ color: '#08f26e' }" @click="AffectMap(record.latitude, record.longitude)" />
            <a-divider type="vertical" />
            <eye-outlined :style="{ color: '#25b08' }" @click="ModalTronçon(record.id)" />

            <!--Fin Modale Modifier tronçon-->

            <a-divider type="vertical" />
            <!--Début popup Supprimer tronçon-->
            <a-popconfirm v-if="dataSource.length" title="Voulez vous supprimez?" @confirm="onDelete(record.id)">
              <a>
                <delete-outlined :style="{ color: '#f73772' }" />
              </a>
              <template>
                <p>test</p>
              </template>
            </a-popconfirm>
            <!--Fin popup Supprimer tronçon-->
          </div>
        </template>
      </template>
    </a-table>
    <div>
      <a-modal v-model:visible="visibleTroncon" title="Detail sur le tronçon" @ok="onSubmit">
        <!--Tableau d'affichage des details sur un tronçons-->
        <a-table :columns="columns2" :row-key="keyTypeTransport" :data-source="formState.dataSourceTronçons"
          :loading="loading" @change="handleTableChange">
          <template #bodyCell="{ column, text }">
            <p v-if="column.dataIndex === 'idTypeTransportFk'">{{ text.libelleTypeTransport }}</p>

            <template v-else-if="['action'].includes(column.dataIndex)">
              <edit-outlined :style="{ color: '#08f26e' }" @click="showModal(record.id, record.libelleTypeTransport)" />
              <a-divider type="vertical" />
              <delete-outlined :style="{ color: '#f73772' }" />
            </template>
          </template>
        </a-table>
      </a-modal>
    </div>

    <!--Début Modale Carte Tronçon : DEBUT -->

    <a-modal v-model:visible="visibleMap" title="Modification" @ok="onSubmitMap">

    </a-modal>


    <div id="mapid"></div>
    <!--Début Modale Carte Carte Tronçon: FIN -->
  </a-card>
</template>

<script>
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PushpinOutlined
} from "@ant-design/icons-vue";
//  Leaflet & MAP 
import leaflet from "leaflet"
// import SearchHeader from "../../components/SearchHeader_trackersGps.vue";
import axios from "axios";
const columns = [
  {
    title: "Nom",
    dataIndex: "nom",
    sorter: true,
  },
  {
    title: "Nom du point d'arret n1",
    dataIndex: "idPointArretAFk",
  },
  {
    title: "Nom du point d'arret n2",
    dataIndex: "idPointArretBFk",
  },
  // {
  //   title: "Zone ",
  //   dataIndex: "hibernateLazyInitializer",
  // },

  {
    title: "Zone parent",
    dataIndex: "statut",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const columns2 = [
  {
    title: "Type de Transport",
    dataIndex: "idTypeTransportFk",
    sorter: true,
  },
  {
    title: "Prix",
    dataIndex: "prix",
    sorter: true,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
// Consomation api d'affichage
const queryData = (params) => {
  return axios.get("http://192.168.252.206:4000/api/v1/Troncon/getTroncons", {
    params,
  });
};
// Declaration des différents compsants utilisés
export default defineComponent({
  components: {
    // SearchHeader,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    PushpinOutlined
  },
  // Méthode pour la recherche de tronçon
  methods: {
    handleSearch(value) {
      let NewdataSource = [];
      if (value.length > 0) {
        this.dataTrackerGps.filter((item) => {
          if (item.libelle.toLowerCase().includes(value.toLowerCase())) {
            NewdataSource.push(item);
          }
        });
        this.dataSource = NewdataSource;
      } else {
        this.dataSource = this.dataTrackerGps;
      }
    },
  },

  setup() {

    //Les configurations pour l'affichage de la carte map
    onMounted(() => {

      formState.map = leaflet.map('mapid').setView([5.3532642, -3.9779868], 13);



      leaflet.tileLayer(
        'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmlyZ2lsOTgiLCJhIjoiY2w0Zm51M2FxMDAzczNqbXM3c2VkMGZ1MCJ9.waYmvLmGKXV_oKqSOL7cLg', {
        maxZoom: 19,
        tileSize: 512,
        zoomOffset: -1,
        // attribution: '© <a href="https://www.mapbox.com/contribute/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(formState.map);


      // leaflet.tileLayer(
      //   'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      //     maxZoom: 19,
      //   tileSize: 512,
      //   zoomOffset: -1,
      //   // attribution: '© <a href="https://www.mapbox.com/contribute/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      // }).addTo(formState.map);


    })

    const AffectMap = (lat, lon, nom) => {

      const acard = document.getElementById('macarte');

      console.log("HAUTEUR: ", acard.scrollHeight)
      // acard.scrollTo({
      //   top: 1000000,
      //   left: 100,
      //   behavior: 'smooth'
      // });


      // console.log("CARD ", acard);

      // console.log("WINDOWS :", window.innerHeight)

      window.scrollTo({
        top: acard.scrollHeight,
        // left: 100,
        behavior: 'smooth'
      });

      formState.map.eachLayer(function (layer) {


        if (typeof layer.options.pane !== undefined && layer.options.pane === "markerPane") {

          formState.map.removeLayer(layer)
          // leaflet.map('mapid').setView([5.3532642, -3.9779868], 15);

        }


        // console.log(layer)
      })


      coordonnée.lat = lat;
      coordonnée.lon = lon;


      console.log("Map here lat :", coordonnée.lat, " lon :", coordonnée.lon, "Nom :", nom)

      // visibleMap.value = true

      // setup a marker group
      // var markers = leaflet.layerGroup();

      // create the marker
      // markers.removeLayer();

      // var marker = leaflet.marker([coordonnée.lat, coordonnée.lon]);


      // add marker
      // markers.addLayer(marker);

      // map.addLayer(markers);
      leaflet.marker([coordonnée.lat, coordonnée.lon]).bindPopup('<b>LIEU :</b><br>' + nom).openPopup().addTo(formState.map)

      formState.map.panTo(new leaflet.LatLng(coordonnée.lat, coordonnée.lon));


    }
    const coordonnée = reactive({
      lat: "",
      lon: ""

    });








































    //Consomation Api Modification tronçon
    const onSubmit = async () => {
      visibleTroncon.value = false;
      const resp = await axios.put(
        `http://192.168.252.206:4000/api/Trackergpss/updateTrackergps/${formState.id}`,
        {
          libelle: formState.libelle,

          statut: true,
        }
      );
      if (resp.status === 200) {
        visible.value = false;
        message.success("Modification reussi");
      } else {
        message.error("impossible!!");
      }
    };
    const {
      data: dataSource,
      run,
      loading = ref(false),
      current,
      pageSize,
    } = usePagination(queryData, {
      formatResult: (res) => res.data.data,
      pagination: {
        currentKey: "page",
        pageSizeKey: "results",
      },
    });
    //Modal tronçon
    const ModalTronçon = async (id) => {
      // console.log(id);
      visibleTroncon.value = true;
      const resTroncon = await axios.get(
        `http://192.168.252.135:4001/api/troncon_typetransport/TronconTypeTransportByIdTroncon?idtroncon=${id}
      `
      );
      formState.dataSourceTronçons = resTroncon.data.data;
      console.log(formState.dataSourceTronçons);
    };
    const visibleTroncon = ref(false);
    const pagination = computed(() => ({
      total: 200,
      current: current.value,
      pageSize: pageSize.value,
      filteredList() {
        return this.dataSource.filter((post) => {
          return post.libelleTypeTransport
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
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
    // Supprimer tronçon (ok)
    const onDelete = (id) => {
      return axios
        .delete(
          `http://192.168.252.206:4000/api/Trackergpss/deleteTrackergps/${id}`,
          {
            data: {
              statut: false,
            },
          }
        )
        .then((resp) => {
          if (resp.status === 200) {
            dataSource.value = dataSource.value.filter(
              (item) => item.id !== id
            );
            message.success("Supprimé avec succès!!");
          } else {
            message.error("impossible!!");
          }
        });
    };

    const visible = ref(false);
    // Model de modification
    const showModal = (id, libelle) => {
      formState.id = id;
      formState.libelle = libelle;
      visible.value = true;
    };
    //Déclaration de form state
    const formState = reactive({
      id: "",
      nom: "",
      dataSourceTronçons: [],
      lat: "",
      lon: "",
      map: ""
    });

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    let options = ref([]);
    let option = []

    const choice = value => {
      console.log(option);
      formState.nom = value
      console.log(formState.nom)
      option.forEach(element => {
        if (formState.nom == element.label) {
          formState.lat = element.value.lat,
            formState.lon = element.value.lon

        }
      })
      console.log("Nom de l'element choisi " + formState.nom + " La latitude :" + formState.lat + " La longitude :" + formState.lon)

    };
    const handleChange = value => {
      // console.log(`selected ${value}`);

      fetch(`https://nominatim.openstreetmap.org/?addressdetails=1&q=${value}&countrycodes=ci&format=json`)
        .then(response => response.json())
        .then(res => {
          // console.log("reponse")
          console.log("label :", res)
          res.forEach(element => {
            // console.log(element.display_name)
            console.log("ELEMENT", element)
            option.push({
              value: {
                lat: element.lat,
                lon: element.lon
              },
              label: element.display_name
            })
          });

          // console.log(option.value)

          option.forEach(element => {

            options.value.push({
              value: element.label,
              label: element.label
            })
            console.log("element")
            console.log(element.label)

          })

        })
    };

    console.log(dataSource);
    return {
      dataSource,
      pagination,
      loading,
      columns,
      handleTableChange,
      onDelete,
      showModal,
      handleOk,
      dataTrackerGps: [],
      formState,
      visible,
      onSubmit,
      ModalTronçon,
      visibleTroncon,
      columns2,
      AffectMap,
      coordonnée,
      choice,
      handleChange
    };
  },

  mounted() {
    fetch("http://192.168.252.135:4001/vehicule/list").then((response) =>
      console.log("API TRONCON ", response.json())
    );
    // .then((res) => {
    //   console.log("API TRONCON");
    //   console.log("Liste des vehicule", res);
    // });
  },
});
</script>

<style>
#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}
</style>