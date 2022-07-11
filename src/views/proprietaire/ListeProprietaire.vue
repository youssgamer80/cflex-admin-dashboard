<template>
  <a-typography-title :level="4">Liste proprietaire</a-typography-title>

  <SearchHeadeProprietaire @search="handleSearch" />
  <a-card :style="{
    padding: '24px',
    background: '#fff',
    textAlign: 'center',
    minHeight: '360px',
  }" :bordered="false" id="macarte">
    <a-table :columns="columns" :row-key="keyTypeTransport" :data-source="dataSource" :pagination="pagination"
      :loading="loading" @change="handleTableChange">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'nom'">{{ text }} </template>
        <template v-if="column.dataIndex === 'statut'">
          <h1 v-if="text">Disponible</h1>
          <h1 v-else>Indisponible</h1>
        </template>
        <template v-else-if="['action'].includes(column.dataIndex)">
          <div>
            <!--Début Modale Modifier proprietaire-->

            <a-modal v-model:visible="visible" title="Modification" @ok="onSubmit">
              <!--Formulaire modification  information du proprietaire-->
              <a-form name="basic" autocomplete="off" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                @finish="onFinish">
                <a-form-item label="Nom" name="nom">
                  <a-input v-model:value="formState.nom" />
                </a-form-item>
                <a-form-item label="Prenom" name="prenom">
                  <a-input v-model:value="formState.prenom" />
                </a-form-item>
                <a-form-item label="Genre" name="genre">
                  <a-input v-model:value="formState.genre" />
                </a-form-item>
                <!-- <a-form-item label="Prenom" name="Prenom">
                </a-form-item> -->
              </a-form>
              <!--Formulaire modification  information du proprietaire-->
            </a-modal>
            <!--Fin Modale Modifier proprietaire-->
            <!--Début popup Supprimer proprietaire-->
            <a-popconfirm v-if="dataSource.length" title="Voulez vous supprimez?" @confirm="onDelete(record.id)">
              <a>
                <delete-outlined :style="{ color: '#f73772' }" />
              </a>
            </a-popconfirm>
            <a-divider type="vertical" />
            <!--Fin popup Supprimer proprietaire-->
            <!--Début modal :Voir plus d'information sur le proprietaire et l'ensemble de ses véhicules-->

            <eye-outlined :style="{ color: '#f73772' }" @click="ModalProprio(record.id)" />
            <!-- Fin modal: Voir plus d'information sur le proprietaire et l'ensemble de ses véhicules-->
          </div>
        </template>
      </template>
    </a-table>

    <div>
      <a-modal v-model:visible="visibleProprio" title="Liste des véhicules" @ok="handleOk2" width="1000px">
        <!--Tableau d'affichage des véhicules d'un proprietaire-->

        <a-table :columns="columns2" :row-key="keyTypeTransport" :data-source="formState.dataSourceVehicule"
          :pagination="pagination" :loading="loading" @change="handleTableChange">
          <template #bodyCell="{ column, text }">

            <p v-if="column.dataIndex === 'marque'">{{ text }}</p>
            <p v-if="column.dataIndex === 'immatriculation'">{{ text }}</p>
            <p v-if="column.dataIndex === 'modele'"> {{ text }}</p>
            <template v-else-if="['action'].includes(column.dataIndex)"></template>
          </template>
        </a-table>
      </a-modal>
    </div>
  </a-card>
</template>

<script>
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive } from "vue";
import { message } from "ant-design-vue";
import {
  // EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";

import SearchHeadeProprietaire from "../../components/SearchHeader_proprietaire.vue";
import axios from "axios";

const columns = [
  {
    title: "nom",
    dataIndex: "nom",
    sorter: true,
  },
  {
    title: "Prenom",
    dataIndex: "prenom",
  },
  // {
  //   title: "statut",
  //   dataIndex: "statut",
  // },
  {
    title: "Genre",
    dataIndex: "genre",
  },
  {
    title: "Telephone",
    dataIndex: "telephone",
  },
  {
    title: "Permis",
    dataIndex: "permis",
  },
  {
    title: "Date Naissance",
    dataIndex: "dateNaissance",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const columns2 = [
  {
    title: "Marque",
    dataIndex: "marque",
    sorter: true,
  },
  {
    title: "Modele",
    dataIndex: "modele",
  },
  {
    title: "Immatriculation",
    dataIndex: "immatriculation",
  },


  {
    title: "Nombre de place",
    dataIndex: "nbPlace",
  },
  {
    title: "Carte Grise",
    dataIndex: "carteGrise",
  },
];

// Consomation api d'affichage liste des proprietaires
const queryData = (params) => {
  return axios.get("http://192.168.252.206:4000/proprietaire/list", {
    params,
  });
};

// const getDataById = () => {
//  const id = this.$refs.get_id.value;
//  if (id) {
//    try{
//      axios.get(`http://192.168.252.206:4000/vehicule/listvehiculesproprio/${id}`);
//    }catch{}
//  }
// };

// Declaration des différents compsants utilisés
export default defineComponent({
  components: {
    SearchHeadeProprietaire,
    // EditOutlined,
    DeleteOutlined,
    EyeOutlined,
  },
  // Méthode pour la recheerche d'un proprietaire
  methods: {
    handleSearch(value) {
      let NewdataSource = [];
      if (value.length > 0) {
        this.dataListProprietaire.filter((item) => {
          if (item.nom.toLowerCase().includes(value.toLowerCase())) {
            NewdataSource.push(item);
          }
        });
        this.dataSource = NewdataSource;
      } else {
        this.dataSource = this.dataListProprietaire;
      }
    },
  },

  setup() {
    // Consomation Api Modification proprietaire
    // const onSubmit = async () => {
    //   const resp = await axios.put(
    //     `http://192.168.252.206:4000/proprietaire/updateProprio/${formState.id}`,
    //     {
    //       nom: formState.nom,
    //       prenom: formState.prenom,
    //       genre: formState.genre,
    //       statut: true,
    //     }
    //   );
    //   if (resp.status === 200) {
    //     visible.value = false;
    //     message.success("Modification reussi");
    //   } else {
    //     message.error("impossible!!");
    //   }
    // };
    // Modal de modification des informations d'un proprietaire
    // const showModal = (id, nom, genre, prenom) => {
    //   formState.id = id;
    //   formState.nom = nom;
    //   formState.genre = genre;
    //   formState.prenom = prenom;
    //   visible.value = true;
    // };
    // Modal pour voir plus d'information sur le proprietaire et l'ensemble de ses véhicules
    // Consomation api d'affichage liste des véhicule d'un proprietaire
    const ModalProprio = async (id) => {
      // console.log(id);
      visibleProprio.value = true;
      const resp = await axios.get(
        `http://192.168.252.206:4000/vehicule/listvehiculesproprio/
${id}`
      );
      formState.dataSourceVehicule = resp.data.data.vehicule;
      console.log(formState.dataSourceVehicule);
    };

    //

    //Afficher la liste des proprietaires
    const {
      data: dataSource,
      run,
      loading = ref(false),
      current,
      pageSize,
    } = usePagination(queryData, {
      formatResult: (res) => res.data.data.proprietaire,
      pagination: {
        currentKey: "page",
        pageSizeKey: "results",
      },
    });
    //Afiicher liste des véhicules
    const {
      runVehicule,
      loadingVehicule = ref(false),
      currentVehicule,
      pageSizeVehicule,
    } = usePagination(queryData, {
      formatResult: (res) => res.data.data,
      pagination: {
        currentKey: "page",
        pageSizeKey: "results",
      },
    });

    const pagination = computed(() => ({
      total: 200,
      current: current.value,
      pageSize: pageSize.value,
      filteredList() {
        return this.dataSource.filter((post) => {
          return post.nom.toLowerCase().includes(this.searchText.toLowerCase());
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
    // liste vehicule par proprietaire

    // Supprimer un type de transport (ok)
    const onDelete = (id) => {
      return axios
        .delete(`http://192.168.252.206:4000/proprietaire/delete/${id}`, {
          data: {
            statut: false,
          },
        })
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
    const visibleProprio = ref(false);
    //Déclaration de form state
    const formState = reactive({
      id: "",
      nom: "",
      dataSourceVehicule: [],
    });

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    const handleOk2 = (e) => {
      console.log(e);
      visibleProprio.value = false;
    };
    console.log(dataSource);
    return {
      dataSource,
      pagination,
      loading,
      columns,
      columns2,
      handleTableChange,
      onDelete,
      handleOk,
      handleOk2,
      dataTypeZone: [],
      formState,
      visible,
      visibleProprio,
      ModalProprio,
      runVehicule,
      loadingVehicule,
      currentVehicule,
      pageSizeVehicule,

      // onSubmit,
    };
  },

  mounted() {
    console.log("Component mounted");

    // fetch("http://192.168.252.203:4001/api/typetransport")
    //   .then(response => response.json())
    //   .then(res => {
    //     this.dataZoneParent = res.data

    //     // console.log(this.dataZoneParent[0].zoneparent)
    //   })

    // fetch("http://192.168.252.203:4001/api/typetransport")
    //   .then(response => response.json())
    //   .then(res => {
    //     this.dataTypeZone = res

    //     // console.log(this.dataTypeZone)
    //   })

    fetch("http://192.168.252.206:4000/proprietaire/list")
      .then((response) => response.json())
      .then((res) => {
        this.dataListProprietaire = res.data.proprietaire;

        console.log(this.dataListProprietaire);
      });
  },
});
</script>

<style>
#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}
</style>