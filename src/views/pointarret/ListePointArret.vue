<template>
  <a-typography-title :level="4">Liste Des Points d'arrêts</a-typography-title>

  <SearchHeader_PointArret @search="handleSearch" />
  <a-card
    :style="{
      padding: '24px',
      background: '#fff',
      textAlign: 'center',
      minHeight: '360px',
    }"
    :bordered="false"
    id="macarte"
  >
    <a-table
      :columns="columns"
      :row-key="keyZone"
      :data-source="dataSource"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, text, record }">
        <!-- {{ record }} -->
        <template v-if="column.dataIndex === 'idZoneFk.libelle'">
          {{ record.idZoneFk.libelle }}
        </template>
        <template v-if="column.dataIndex === 'idtypePointArret.typePointArret'">
          {{ record.idtypePointArret.typePointArret }}
        </template>

        <template v-if="column.dataIndex === 'statut'">
          <h1 v-if="text">Disponible</h1>
          <h1 v-else>Indisponible</h1>
        </template>
        <template v-else-if="['action'].includes(column.dataIndex)">
          <div>
            <edit-outlined
              :style="{ color: '#08f26e' }"
              @click="
                showModal(
                  record.id,
                  record.nom,
                  record.idZoneFk.id,
                  record.latitude,
                  record.idtypePointArret.id,
                  record.longitude
                )
              "
            />
            <a-divider type="vertical" />
            <pushpin-outlined
              @click="AffectMap(record.latitude, record.longitude, record.nom)"
            />

            <!--Début Modale Modifier type Transport-->

            <a-divider type="vertical" />
            <!--Début popup Supprimer type Transport-->
            <a-popconfirm
              v-if="dataSource.length"
              title="Voulez vous supprimez?"
              @confirm="onDelete(record.id)"
            >
              <a>
                <delete-outlined :style="{ color: '#f73772' }" />
              </a>
            </a-popconfirm>
            <!--Fin popup Supprimer type Transport-->
          </div>
        </template>
      </template>
    </a-table>
    <!--Début Modale Modifier Point arrêt: DEBUT -->

    <a-modal v-model:visible="visible" title="Modification" @ok="onSubmit">
      <a-form
        name="basic"
        autocomplete="off"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="Nom" name="nom">
          <a-select
            v-model:value="formState.nom"
            show-search
            placeholder="Cherchez le lieu"
            style="width: 200px"
            :options="options"
            :filter-option="filterOption"
            @change="choice"
            @search="handleChange"
          ></a-select>
        </a-form-item>
        <a-form-item label="Zone ">
          <a-select
            v-model:value="formState.idZoneFk"
            placeholder="please select your zone"
          >
            <a-select-option
              v-for="item in dataListZone"
              v-bind:key="item.id"
              :value="item.id"
              >{{ item.libelle }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Type point arret">
          <a-select
            v-model:value="formState.idtypePointArret"
            placeholder="please select type point arret"
          >
            <a-select-option
              v-for="item in dataListTypePointArret"
              v-bind:key="item.id"
              :value="item.id"
              >{{ item.typePointArret }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <!--Début Modale Modifier Point arrêt: FIN -->

    <!--Début Modale Carte Point arrêt: DEBUT -->

    <a-modal
      v-model:visible="visibleMap"
      title="Modification"
      @ok="onSubmitMap"
    >
    </a-modal>

    <div id="mapid"></div>
    <!--Début Modale Carte Point arrêt: FIN -->
  </a-card>
</template>

<script>
/*   eslint-disable no-undef */
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import {
  EditOutlined,
  DeleteOutlined,
  PushpinOutlined,
} from "@ant-design/icons-vue";

//  Leaflet & MAP
import leaflet from "leaflet";
// import 'leaflet.markercluster';

import SearchHeader_PointArret from "../../components/SearchHeader_PointArret.vue";
import axios from "axios";

const columns = [
  {
    title: "Nom",
    dataIndex: "nom",
    sorter: true,
  },
  {
    title: "Zone",
    dataIndex: "idZoneFk.libelle",
  },
  {
    title: "Type point arret",
    dataIndex: "idtypePointArret.typePointArret",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const queryData = (params) => {
  return axios.get("http://192.168.252.206:4001/api/pointarrets", {
    params,
  });
};

export default defineComponent({
  components: {
    SearchHeader_PointArret,
    EditOutlined,
    DeleteOutlined,
    PushpinOutlined,
  },

  methods: {
    handleSearch(value) {
      let NewdataSource = [];

      if (value.length > 0) {
        this.dataListPointArret.filter((item) => {
          if (item.nom.toLowerCase().includes(value.toLowerCase())) {
            NewdataSource.push(item);
          } else {
            if (
              item.idZoneFk.libelle.toLowerCase().includes(value.toLowerCase())
            ) {
              NewdataSource.push(item);
            }
          }
        });
        this.dataSource = NewdataSource;
      } else {
        this.dataSource = this.dataListPointArret;
      }
    },
  },
  setup() {
    onMounted(() => {
      formState.map = leaflet.map("mapid").setView([5.3532642, -3.9779868], 13);

      leaflet
        .tileLayer(
          "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmlyZ2lsOTgiLCJhIjoiY2w0Zm51M2FxMDAzczNqbXM3c2VkMGZ1MCJ9.waYmvLmGKXV_oKqSOL7cLg",
          {
            maxZoom: 19,
            tileSize: 512,
            zoomOffset: -1,
            // attribution: '© <a href="https://www.mapbox.com/contribute/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }
        )
        .addTo(formState.map);

      // leaflet.tileLayer(
      //   'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      //     maxZoom: 19,
      //   tileSize: 512,
      //   zoomOffset: -1,
      //   // attribution: '© <a href="https://www.mapbox.com/contribute/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      // }).addTo(formState.map);
    });

    const AffectMap = (lat, lon, nom) => {
      const acard = document.getElementById("macarte");

      console.log("HAUTEUR: ", acard.scrollHeight);
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
        behavior: "smooth",
      });

      formState.map.eachLayer(function (layer) {
        if (
          typeof layer.options.pane !== undefined &&
          layer.options.pane === "markerPane"
        ) {
          formState.map.removeLayer(layer);
          // leaflet.map('mapid').setView([5.3532642, -3.9779868], 15);
        }

        // console.log(layer)
      });

      coordonnée.lat = lat;
      coordonnée.lon = lon;

      console.log(
        "Map here lat :",
        coordonnée.lat,
        " lon :",
        coordonnée.lon,
        "Nom :",
        nom
      );

      // visibleMap.value = true

      // setup a marker group
      // var markers = leaflet.layerGroup();

      // create the marker
      // markers.removeLayer();

      // var marker = leaflet.marker([coordonnée.lat, coordonnée.lon]);

      // add marker
      // markers.addLayer(marker);

      // map.addLayer(markers);
      leaflet
        .marker([coordonnée.lat, coordonnée.lon])
        .bindPopup("<b>LIEU :</b><br>" + nom)
        .openPopup()
        .addTo(formState.map);

      formState.map.panTo(new L.LatLng(coordonnée.lat, coordonnée.lon));
    };

    const onSubmit = async () => {

      const resp = await axios
        .put(`http://192.168.252.206:4001/api/pointarrets/updatePointArret/${formState.id}`, {
          nom: formState.nom,
          longitude: formState.lon,
          latitude: formState.lat,
          idZoneFk: {
            id: formState.idZoneFk,
          },
          idtypePointArret: {
            id: formState.typePointArret,
          },
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
      formatResult: (res) => {
        // console.log(res.data.data)
        return res.data.data;
      },
      pagination: {
        currentKey: "page",
        pageSizeKey: "results",
      },
    });
    const pagination = computed(() => ({
      total: 200,
      current: current.value,
      pageSize: pageSize.value,
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

    const onDelete = async (id) => {
      const resp = await axios
        .delete(
          `http://192.168.252.206:4001/api/pointarrets/deletePointArret/${id}`);
      if (resp.status === 200) {
        // console.log(typeof dataSource)
        dataSource.value = dataSource.value.filter((item) => item.id !== id);
        message.success("Supprimé avec succès!!");
      } else {
        message.error("impossible!!");
      }
    };

    const visible = ref(false);
    const visibleMap = ref(false);

    const showModal = (
      id,
      nom,
      idZoneFk,
      latitude,
      idtypePointArret,
      longitude
    ) => {
      formState.id = id;
      formState.nom = nom;
      formState.idZoneFk = idZoneFk;
      formState.latitude = latitude;
      formState.longitude = longitude;
      formState.idtypePointArret = idtypePointArret;
      visible.value = true;
      console.log("ID : ",idtypePointArret);
    };

    const formState = reactive({
      id: "",
      nom: "",
      idZoneFk: "",
      lat: "",
      lon: "",
      map: "",
      idtypePointArret: "",
    });

    const coordonnée = reactive({
      lat: "",
      lon: "",
    });

    const handleOk = () => {
      // console.log(e);
      visible.value = false;
    };
    let searchQuery;

    // DEBUT DE RECHERCHE POUR LE LIEU

    let options = ref([]);
    let option = [];

    // let options = [];

    const choice = (value) => {
      console.log(option);
      formState.nom = value;
      console.log(formState.nom);
      option.forEach((element) => {
        if (formState.nom == element.label) {
          (formState.lat = element.value.lat),
            (formState.lon = element.value.lon);
        }
      });
      console.log(
        "Nom de l'element choisi " +
          formState.nom +
          " La latitude :" +
          formState.lat +
          " La longitude :" +
          formState.lon
      );
    };

    const handleChange = (value) => {
      // console.log(`selected ${value}`);

      fetch(
        `https://nominatim.openstreetmap.org/?addressdetails=1&q=${value}&countrycodes=ci&format=json`
      )
        .then((response) => response.json())
        .then((res) => {
          // console.log("reponse")
          console.log("label :", res);
          res.forEach((element) => {
            // console.log(element.display_name)
            console.log("ELEMENT", element);
            option.push({
              value: {
                lat: element.lat,
                lon: element.lon,
              },
              label: element.display_name,
            });
          });

          // console.log(option.value)

          option.forEach((element) => {
            options.value.push({
              value: element.label,
              label: element.label,
            });
            console.log("element");
            console.log(element.label);
          });
        });
    };

    // FIN DE RECHERCHE POUR LE LIEU

    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    // Affichage de la carte map

    return {
      searchQuery,
      dataSource,
      pagination,
      loading,
      columns,
      handleTableChange,
      onDelete,
      showModal,
      handleOk,
      visible,
      visibleMap,
      formState,
      dataListZone: [],
      dataListTypePointArret: [],
      onSubmit,

      filterOption,
      handleChange,
      choice,
      options,
      option,
      AffectMap,

      // Gestion de la Map
      coordonnée,
    };
  },

  mounted() {
    console.log("Component mounted");

    fetch("http://192.168.252.206:4001/api/zones")
      .then(response => response.json())
      .then(res => {
        this.dataListZone = res.data

        // console.log(this.dataZone[0].zoneparent)
      });


    fetch("http://192.168.252.206:4001/api/pointarrets")
      .then(response => response.json())
      .then(res => {
        this.dataListPointArret = res.data

        // console.log(this.dataListPointArret)
      });
  },
});
</script>

<style>
#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}

#mapid {
  height: 300px;
}

.overlay-content {
  background: #efefef;
  box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  padding: 10px 20px;
  font-size: 16px;
}
</style>
