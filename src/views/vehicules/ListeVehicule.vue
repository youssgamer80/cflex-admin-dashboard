<template>
  <a-typography-title :level="4">Liste des véhicules</a-typography-title>

  <SearchHeader @search="handleSearch" />
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
        <template v-if="column.dataIndex === 'proprietaire'"
          >{{ text.nom }} {{ text.prenom }}
        </template>
        <!-- <template v-if="column.dataIndex === 'idZoneFk'"
          >{{ text.libelle }}
        </template> -->
        <template v-if="column.dataIndex === 'idTypeTransportFk'"
          >{{ record.idTypeTransportFk.libelleTypeTransport }}
        </template>

        <template v-if="column.dataIndex === 'statut'">
          <h1 v-if="text">Disponible</h1>
          <h1 v-else>Indisponible</h1>
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
              >
                <a-form-item label="Marque" name="marque">
                  <a-input v-model:value="formState.marque" />
                </a-form-item>
                <a-form-item label="Modele" name="modele">
                  <a-input v-model:value="formState.modele" />
                </a-form-item>
                <a-form-item label="Immatriculation" name="immatriculation">
                  <a-input v-model:value="formState.immatriculation" />
                </a-form-item>
                <a-form-item label="Nombre de place" name="nbPlace">
                  <a-input v-model:value="formState.nbPlace" />
                </a-form-item>
               
                <a-form-item label="Carte Grise" name="carteGrise">
                  <a-input v-model:value="formState.carteGrise" />
                </a-form-item>
                 <a-form-item label="Zone">
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
                 <a-form-item label="Type transport">
                  <a-select
                    v-model:value="formState.idTypeTransportFk"
                    placeholder="please select your zone"
                  >
                    <a-select-option
                      v-for="item in dataListTypeTransport"
                      v-bind:key="item.id"
                      :value="item.id"
                      >{{ item.libelleTypeTransport }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-form>
              <!--Formulaire modification type transport-->
            </a-modal>

            <edit-outlined
              :style="{ color: '#08f26e' }"
              @click="
                showModal(
                  record.id,
                  record.immatriculation,
                  record.modele,
                  record.marque,
                  record.idZoneFk.id,
                  record.carteGrise,
                  record.nbPlace
                  // record.proprietaire,
                  //record.idTypeTransportFk.libelleTypeTransport
                )
              "
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
  </a-card>
</template>

<script>
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive } from "vue";
import { message } from "ant-design-vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";

import SearchHeader from "../../components/SearchHeader_vehicule.vue";
import axios from "axios";
const columns = [
  {
    title: "Marque",
    dataIndex: "marque",
    sorter: true,
  },
  {
    title: "Modele",
    dataIndex: "modele",
    sorter: true,
  },

  {
    title: "Immatriculation",
    dataIndex: "immatriculation",
  },
  {
    title: "Type Transport ",
    dataIndex: "idTypeTransportFk",
  },
  {
    title: "Proprietaire",
    dataIndex: "proprietaire",
  },
  {
    title: "Nombre de place ",
    dataIndex: "nbPlace",
  },
  {
    title: "Carte grise",
    dataIndex: "carteGrise",
  },

  // {
  //   title: "Zone",
  //   dataIndex: "idZoneFk",
  // },
  // {
  //   title: "Nombre de place",
  //   dataIndex: "nbPlace",
  // },

  {
    title: "Action",
    dataIndex: "action",
  },
];
// Consomation api d'affichage
const queryData = (params) => {
  return axios.get("http://192.168.252.223:4001/vehicule/list", {
    params,
  });
};
// Declaration des différents compsants utilisés
export default defineComponent({
  components: {
    SearchHeader,
    EditOutlined,
    DeleteOutlined,
  },
  // Méthode pour la recheerche du type de transport
  methods: {
    handleSearch(value) {
      let NewdataSource = [];
      if (value.length > 0) {
        this.datalistVehicule.filter((item) => {
          if (
            item.marque
              .toLowerCase()
              .includes(value.toLowerCase())
          ) {
            NewdataSource.push(item);
          }
        });
        this.dataSource = NewdataSource;
      } else {
        this.dataSource = this.datalistVehicule;
      }
    },
  },

  setup() {
    //Consomation Api Modification type Transport
    const onSubmit = async () => {
      visible.value = false;

      console.log("REPONSE DE L'API");
      console.log({
        immatriculation: formState.immatriculation,
        marque: formState.marque,
        modele: formState.modele,
         nbPlace: formState.nbPlace,
        carteGrise: formState.carteGrise,
        
        // idTypeTransportFk: formState.idTypeTransportFk,

        idZoneFk: {
          // "id": 2
          id: formState.idZoneFk,
        },
        
        // proprietaire: {
        //   // "id": 2
        //   nom: formState.proprietaire,
        // },
        statut: true,
      });
      const resp = await axios.put(
        `http://192.168.252.206:4000/vehicule/updateVehicule/${formState.id}`,
        {
          immatriculation: formState.immatriculation,
          marque: formState.marque,
          modele: formState.modele,
          carteGrise: formState.carteGrise,
          // idTypeTransportFk: formState.idTypeTransportFk,

          idZoneFk: {
            // "id": 2
            id: formState.idZoneFk,
          },
          idTypeTransportFk:{
            id: formState.idTypeTransportFk,
          },
          // proprietaire: {
          //   // "id": 2
          //   nom: formState.proprietaire,
          // },
          statut: true,
        }
      );
      if (resp.status === 200) {
        console.log(resp);
        visible.value = false;
        message.success("Modification reussi");

        console.log("RESULTAT DE RETOUR");
        console.log(resp);
      } else {
        console.log("RESULTAT DE RETOUR EN CAS D'ECHEC");
        console.log(resp);
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
      formatResult: (res) => res.data.data.vehicule,
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
    // Supprimer un type de transport (ok)
    const onDelete = (id) => {
      return axios
        .delete(`http://192.168.252.206:4000/vehicule/delete/${id}`, {
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
    // Model de modification
    const showModal = (
      id,
      immatriculation,
      modele,
      marque,
      idZoneFk,
      carteGrise,
      nbPlace
    ) => {
      formState.id = id;
      formState.immatriculation = immatriculation;
      formState.modele = modele;
      formState.marque = marque;
      formState.idZoneFk = idZoneFk;
      formState.carteGrise = carteGrise;
      formState.nbPlace = nbPlace;
      visible.value = true;
    };
    //Déclaration de form state
    const formState = reactive({
      id: "",
      immatriculation: "",
      modele: "",
      marque: "",
      idZoneFk: "",
      carteGrise: "",
      nbPlace: "",
      idTypeTransportFk: "",
      // idTypeTransportFk: "",
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
      dataListZone: [],
      dataListTypeTransport: [],
      datalistVehicule: [],
      formState,
      visible,
      onSubmit,
    };
  },

  mounted() {
    console.log("Component mounted");
// liste des zones dans une liste deroulante
    fetch("http://192.168.252.206:4000/api/zones")
      .then((response) => response.json())
      .then((res) => {
        this.dataListZone = res.data;

        console.log(this.dataListZone);
      });

      //liste des types de transport dans une liste deroulante
       fetch("http://192.168.252.206:4000/api/typetransport")
      .then((response) => response.json())
      .then((res) => {
        this.dataListTypeTransport = res.data;

        console.log(this.dataListTypeTransport);
      });
//liste des véhicule pour la recherche 
      fetch("http://192.168.252.206:4000/vehicule/list")
      .then((response) => response.json())
      .then((res) => {
        this.datalistVehicule = res.data.vehicule;

        console.log("Liste des vehicule",this.datalistVehicule);
      });
  },
});
</script>

<style>
#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}
</style>
