<template>
  <a-typography-title :level="4">Liste Des Lignes</a-typography-title>

  <SearchHeaderZone @search="handleSearch" />
  <a-card :style="{
    padding: '24px',
    background: '#fff',
    textAlign: 'center',
    minHeight: '360px',
  }" :bordered="false" id="macarte">
    <a-table :columns="columns" :row-key="keyZone" :data-source="dataSource" :pagination="pagination" :loading="loading"
      @change="handleTableChange">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'zone'">{{ record.idZoneFk.libelle }}
        </template>
        <template v-if="column.dataIndex === 'statut'">
          <h1 v-if="text">Disponible</h1>
          <h1 v-else>Indisponible</h1>
        </template>
        <template v-else-if="['action'].includes(column.dataIndex)">
          <div>
            <!--Début Modale de modification d'une la ligne-->


            <edit-outlined :style="{ color: '#08f26e' }"
              @click="showModal(record.id, record.nom, record.depart, record.depart_longitude, record.depart_latitude, record.arrivee, record.arrivee_longitude, record.arrivee_latitude, record.tarif, record.idZoneFk.id)" />

            <!--FIN Modale Modifier LIGNE -->

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
    <a-modal v-model:visible="visible" width="1000px" height="1000px" title="Ajouter Ligne" @ok="onUpdateLigne">

      <a-button :style="{
        marginBottom: '24px'
      }" type="primary" @click="ListPointArret">
        <template #icon>
          <SearchOutlined />
        </template>
        Liste des Points d'arrêt
      </a-button>
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">

        <a-form-item label="Nom" :rules="[{ required: true }]">
          <a-input v-model:value="formState.nom" />
        </a-form-item>


        <a-form-item label="Depart" :rules="[{ required: true }]">

          <a-space>
            <a-select ref="select" v-model:value="formState.depart" style="width: 120px" @change="handleChangeDepart">
              <a-select-option v-for="item in dataPointArret" v-bind:key="item.id" :value="item.nom">{{
                  item.nom
              }}
              </a-select-option>

            </a-select>

          </a-space>

        </a-form-item>


        <a-form-item label="Arrivee" :rules="[{ required: true }]">

          <a-space>
            <a-select ref="select" v-model:value="formState.arrivee" style="width: 120px" @change="handleChangeArrivee">
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
            <a-select ref="select" v-model:value="formState.idZoneFk" style="width: 120px" @change="handleChangeZone">
              <a-select-option v-for="item in dataZone" v-bind:key="item.id" :value="item.id">{{ item.libelle
              }}
              </a-select-option>

            </a-select>

          </a-space>

        </a-form-item>

      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";

import SearchHeaderZone from "../../components/SearchHeader_Ligne.vue";
import axios from "axios";
const columns = [
  {
    title: "Nom",
    dataIndex: "nom",
    sorter: true,
  },
  {
    title: "Depart",
    dataIndex: "depart",
    sorter: true,
  },
  {
    title: "Arrivée",
    dataIndex: "arrivee",
    sorter: true,
  }, {
    title: "Zone",
    dataIndex: "zone",
    sorter: true,
  },
  {
    title: "Tarif",
    dataIndex: "tarif",
    sorter: true,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const queryData = (params) => {
  return axios.get("http://192.168.252.206:4000/api/lignes", {
    params,
  });
};

export default defineComponent({
  components: {
    SearchHeaderZone,
    EditOutlined,
    DeleteOutlined,
  },


  methods: {

    handleSearch(value) {
      let NewdataSource = []

      if (value.length > 0) {

        this.dataListLigne.filter((item) => {
          if (item.depart.toLowerCase().includes(value.toLowerCase())) {
            NewdataSource.push(item);
          }

        })
        this.dataSource = NewdataSource

      }
      else {
        this.dataSource = this.dataListLigne
      }
    }
  },
  setup() {

    const router = useRouter()

    const ListPointArret = () => {

      console.log("idligne", formState.id, "idzone :", formState.idZoneFk)
      router.push(`/tableau-de-bord/lignepointarret/Update&${formState.id}&${formState.idZoneFk}`)
    }

    const onUpdateLigne = async () => {


      const resp = await axios
        .put(`http://192.168.252.206:4000/api/lignes/updateligne/${formState.id}`, {
          nom: formState.nom,
          depart: formState.depart,
          tarif: formState.tarif,
          arrivee: formState.arrivee,
          depart_longitude: formState.depart_longitude,
          depart_latitude: formState.depart_latitude,
          arrivee_longitude: formState.arrivee_longitude,
          arrivee_latitude: formState.arrivee_latitude,
          idZoneFk: formState.idZoneFk,
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

    const onDelete = (id) => {
      return axios
        .delete(`http://192.168.252.206:4000/api/lignes/deleteligne/${id}`)
        .then((resp) => {
          if (resp.status === 200) {
            // console.log(typeof dataSource)
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

    const showModal = (id, nom, depart, depart_longitude, depart_latitude, arrivee, arrivee_longitude, arrivee_latitude, tarif, idZoneFk) => {
      formState.id = id;
      formState.nom = nom;
      formState.depart = depart;
      formState.depart_longitude = depart_longitude;
      formState.depart_latitude = depart_latitude;
      formState.arrivee = arrivee;
      formState.arrivee_longitude = arrivee_longitude;
      formState.arrivee_latitude = arrivee_latitude;
      formState.tarif = tarif;
      formState.idZoneFk = idZoneFk;

      visible.value = true;

      console.log("ID LIGNE:", formState.id)
      console.log("ID ZONE:", formState.idZoneFk)
    };


    const formState = reactive({
      id: '',
      nom: '',
      depart: '',
      depart_longitude: '',
      depart_latitude: '',
      arrivee: '',
      arrivee_longitude: '',
      arrivee_latitude: '',
      tarif: '',
      idZoneFk: ''
    });



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


    const handleOk = e => {
      console.log(e);
      visible.value = false;
    };
    let searchQuery

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
      formState,

      dataZone: [],
      dataListLigne: [],
      onUpdateLigne,

      dataPointArret: [],

      handleChangeZone,
      handleChangeDepart,
      handleChangeArrivee,


      ListPointArret


    };
  },


  mounted() {


    console.log("Component mounted");

    fetch("http://192.168.252.206:4000/api/pointarrets")
      .then(response => response.json())
      .then(res => {
        this.dataPointArret = res.data

        this.formState.ListPointArret = this.dataPointArret

      })
      .catch(err => {
        console.log(err)
      })



    // Pour la liste des zones

    fetch("http://192.168.252.206:4000/api/zones")
      .then(response => response.json())
      .then(res => {

        this.dataZone = res.data

      })


    fetch("http://192.168.252.206:4000/api/lignes")
      .then(response => response.json())
      .then(res => {
        this.dataListLigne = res.data


      })
  },
});
</script>

<style>
#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}
</style>