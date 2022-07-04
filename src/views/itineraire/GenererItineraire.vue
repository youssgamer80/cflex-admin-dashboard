<template>
  <a-typography-title :level="4">Gestion des itineraires</a-typography-title>
  <div class="container" :style="{
         position: relative,
          left: '100px',
       
      }">
    <a-card
      :style="{
        padding: '24px',
        background: '#fff',
        textAlign: 'center',
        minHeight: '360px',
       
      }"
      :bordered="false"
      id="carte"
    >
      <a-col :span="15">
        <a-input-search
          type="text"
          placeholder="Rechercher une zone"
          enter-button
          @change="onChange"
          @keyup="onChange"
          v-model:value="searchText"
          :style="{ margin: '20px'}"
        />
        <br />
      </a-col>
      <!-- <a-typography-title :level="5">Selectionnez la zone</a-typography-title> -->
      <a-table :columns="columns" :data-source="dataSource" :loading="loading">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'libelle'"
            >{{ text }}
          </template>
           <template v-else-if="['action'].includes(column.dataIndex)"> <a-button type="primary" @click="showModal">
          Genérer 
        </a-button></template>
          </template
        >
      </a-table>
    </a-card>
    <a-card id="carte2">
    <a-typography-title :level="4">Les informations sur l'itineraires</a-typography-title>
     <a-table :columns="columns2" :data-source="dataSource">
        
      </a-table>

    </a-card>
  </div>
</template>

 <script>
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive } from "vue";
import { message } from "ant-design-vue";
// import {
//   // EditOutlined,
//   DeleteOutlined,
//   EyeOutlined,
// } from "@ant-design/icons-vue";

// import SearchHeadeProprietaire from "../../components/SearchHeader_proprietaire.vue";
import axios from "axios";

const columns = [
  {
    title: "libelle",
    dataIndex: "libelle",
    sorter: true,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];
const columns2 = [
  

  {
    title: "Action",
    dataIndex: "action",
  },
];

// Consomation api d'affichage liste des proprietaires
const queryData = (params) => {
  return axios.get("http://192.168.252.206:4000/api/zones", {
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
  // components: {
  //   SearchHeadeProprietaire,
  //   // EditOutlined,
  //   DeleteOutlined,
  //   EyeOutlined,
  // },
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
      formatResult: (res) => res.data.data,
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
#carte {
  height: 1000px;
  width: 700px;
  margin: 15px;
}
#carte2 {
  height: 1000px;
  width: 1200px;
  margin: 5px;
}
.container {
  display: flex;



}
</style>