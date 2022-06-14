<template>
  <a-typography-title :level="4">Liste Des Points d'arrêts</a-typography-title>

  <SearchHeader_PointArret @search="handleSearch" />
  <a-card :style="{
    padding: '24px',
    background: '#fff',
    textAlign: 'center',
    minHeight: '360px',
  }" :bordered="false" id="macarte">
    <a-table :columns="columns" :row-key="keyZone" :data-source="dataSource" :pagination="pagination" :loading="loading"
      @change="handleTableChange">
      <template #bodyCell="{ column, text, record }">
        <!-- {{ record }} -->
        <template v-if="column.dataIndex === 'idZoneFk.libelle'">
          {{ record.idZoneFk.libelle }}
        </template>
        <template v-if="column.dataIndex === 'statut'">
          <h1 v-if="text">Disponible</h1>
          <h1 v-else>Indisponible</h1>
        </template>
        <template v-else-if="['action'].includes(column.dataIndex)">
          <div>
            <!--Début Modale Modifier type Transport-->
            <a-modal v-model:visible="visible" title="Modification" @ok="onUpdate">


              <a-form name="basic" autocomplete="off" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                @finish="onFinish">



                <!-- <a-form-item label="libelle" name="libelle"
                  :rules="[{ required: true, message: 'Please input your libelle!' }]">
                  <a-input v-model:value="formState.nom" />
                </a-form-item> -->


                <a-form-item label="Nom" name="nom">
                  <!-- <a-input v-model:value="formState.nom" /> -->
                  <a-select v-model:value="formState.nom" show-search placeholder="Cherchez le lieu"
                    style="width: 200px" :options="options" :filter-option="filterOption" @change="choice"
                    @search="handleChange"></a-select>
                </a-form-item>

                <!-- <a-form-item label="Type de zone">
                  <a-select v-model:value="formState.idTypeZoneFk" placeholder="please select your zone">

                    <a-select-option v-for="item in dataTypeZone" v-bind:key="item.id" :value="item.id">{{ item.libelle
                    }}
                    </a-select-option>
                  </a-select>
                </a-form-item> -->

                <a-form-item label="Zone ">
                  <a-select v-model:value="formState.idZoneFk" placeholder="please select your zone">

                    <a-select-option v-for="item in dataListZone" v-bind:key="item.id" :value="item.id">{{
                        item.libelle
                    }}
                    </a-select-option>
                  </a-select>
                </a-form-item>


              </a-form>

            </a-modal>

            <edit-outlined :style="{ color: '#08f26e' }"
              @click="showModal(record.id, record.nom, record.idZoneFk.id, record.latitude, record.longitude)" />
            <a-divider type="vertical" />


            <a-modal v-model:visible="visibleMap" title="Modification" @ok="onUpdate">

              





            </a-modal>

            <pushpin-outlined @click="showMap(record.latitude, record.longitude)" />



            <!--Début Modale Modifier type Transport-->

            <a-divider type="vertical" />
            <!--Début popup Supprimer type Transport-->
            <a-popconfirm v-if="dataSource.length" title="Voulez vous supprimez?" @confirm="onDelete(record.id)">
              <a>
                <delete-outlined :style="{ color: '#f73772' }" />
              </a>

            </a-popconfirm>
            <!--Fin popup Supprimer type Transport-->
          </div>
        </template>
      </template>
    </a-table>
  </a-card>

</template>

<script>
/*   eslint-disable no-undef */
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive } from "vue";
import { message } from "ant-design-vue";
import { EditOutlined, DeleteOutlined, PushpinOutlined } from "@ant-design/icons-vue";

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
    title: "Action",
    dataIndex: "action",
  },
];

const queryData = (params) => {
  return axios.get("http://192.168.252.223:4001/api/pointarrets", {
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
      let NewdataSource = []


      if (value.length > 0) {

        this.dataListPointArret.filter((item) => {
          if (item.nom.toLowerCase().includes(value.toLowerCase())) {
            NewdataSource.push(item);
          }

        })
        this.dataSource = NewdataSource

      }
      else {
        this.dataSource = this.dataListPointArret
      }
    }
  },
  setup() {



    const onUpdate = async () => {

      const resp = await axios
        .put(`http://192.168.252.223:4001/api/pointarrets/updatePointArret/${formState.id}`, {
          nom: formState.nom,
          longitude: formState.lon,
          latitude: formState.lat,
          idZoneFk: {
            id: formState.idZoneFk
          },
          statut: true
        });
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
        return res.data.data
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
          `http://192.168.252.223:4001/api/pointarrets/deletePointArret/${id}`);
      if (resp.status === 200) {
        // console.log(typeof dataSource)
        dataSource.value = dataSource.value.filter(
          (item) => item.id !== id
        );
        message.success("Supprimé avec succès!!");
      } else {
        message.error("impossible!!");
      }
    };

    const visible = ref(false);
    const visibleMap = ref(false);

    const showModal = (id, nom, idZoneFk, latitude, longitude) => {

      formState.id = id;
      formState.nom = nom;
      formState.idZoneFk = idZoneFk;
      formState.latitude = latitude;
      formState.longitude = longitude;
      visible.value = true;


    };

    let place_id;
    // let map
    const showMap = (lat, lon) => {


      console.log("Map here lat :", lat, " lon :", lon)


      // fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&countrycodes=ci&format=json`)
      //   .then(response => response.json())
      //   .then(res => {


      //     place_id = res.place_id
      //     console.log(place_id)
      //     window.open(`https://nominatim.openstreetmap.org/ui/details.html?place_id=${place_id}`, '_blank')

      //   })

      // router.push("/")
      visibleMap.value = true


      //  window.location =`https://nominatim.openstreetmap.org/ui/details.html?place_id=${this.place_id}`



    }

    const formState = reactive({
      id: "",
      nom: "",
      idZoneFk: "",
      lat: "",
      lon: ""

    });


    const handleOk = () => {
      // console.log(e);
      visible.value = false;
    };
    let searchQuery


    // DEBUT DE RECHERCHE POUR LE LIEU

    let options = ref([]);
    let option = []

    // let options = [];

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
      dataListPointArret: [],
      onUpdate,


      filterOption,
      handleChange,
      choice,
      options,
      option,
      showMap,
      place_id,

      // Gestion de la Map
     

    };
  },


  mounted() {


    console.log("Component mounted");

    fetch("http://192.168.252.223:4001/api/zones")
      .then(response => response.json())
      .then(res => {
        this.dataListZone = res.data

        // console.log(this.dataZone[0].zoneparent)
      })


    fetch("http://192.168.252.223:4001/api/pointarrets")
      .then(response => response.json())
      .then(res => {
        this.dataListPointArret = res.data

        // console.log(this.dataListPointArret)
      })
  },
});
</script>

<style>
#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}


#map {
  height: 180px;
}



.overlay-content {
  background: #efefef;
  box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  padding: 10px 20px;
  font-size: 16px;
}
</style>