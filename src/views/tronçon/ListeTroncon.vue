<template>
  <a-typography-title :level="4">Liste des trackers</a-typography-title>

  <!-- <SearchHeader @search="handleSearch" /> -->
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
      :row-key="keyTypeTransport"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'idPointArretBFk'"
          >{{ text.nom }}
        </template>
        <template v-if="column.dataIndex === 'idPointArretAFk'"
          >{{ text.nom }}
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
            <!--Début Modale Modifier type Transport-->
            <a-modal
              v-model:visible="visible"
              title="Modification"
              @ok="onSubmit"
            >
              <!--Formulaire modification type transport-->
              <a-form
                name="basic"
                autocomplete="off"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                @finish="onFinish"
              >
                <a-form-item label="libelle" name="libelle">
                  <a-input v-model:value="formState.libelle" />
                </a-form-item>
              </a-form>
              <!--Formulaire modification type transport-->
            </a-modal>

            <edit-outlined
              :style="{ color: '#08f26e' }"
              @click="showModal(record.id, record.libelle)"
            />
            <a-divider type="vertical" />
            <eye-outlined
              :style="{ color: '#25b08' }"
              @click="ModalTronçon(record.id)"
            />

            <!--Fin Modale Modifier type Transport-->

            <a-divider type="vertical" />
            <!--Début popup Supprimer type Transport-->
            <a-popconfirm
              v-if="dataSource.length"
              title="Voulez vous supprimez?"
              @confirm="onDelete(record.id)"
            >
              <a><delete-outlined :style="{ color: '#f73772' }" /></a>
              <template> <p>test</p></template>
            </a-popconfirm>
            <!--Fin popup Supprimer type Transport-->
          </div>
        </template>
      </template>
    </a-table>
    <div>
      <a-modal
        v-model:visible="visibleTroncon"
        title="Detail sur le tronçon"
        @ok="onSubmit"
      >
        <!--Formulaire modification type transport-->

        <!--Formulaire modification type transport-->
      </a-modal>
    </div>
  </a-card>
</template>

<script>
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive } from "vue";
import { message } from "ant-design-vue";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";

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
    const ModalTronçon = async () => {
      // console.log(id);
      visibleTroncon.value = true;
      //       const resp = await axios.get(
      //         `http://192.168.252.206:4000/vehicule/listvehiculesproprio/
      // ${id}`
      //       );
      //       formState.dataSourceVehicule = resp.data.data.vehicule;
      //       console.log(formState.dataSourceVehicule);
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
    });

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
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