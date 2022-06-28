<template>
  <a-typography-title :level="4">Liste Des trajets</a-typography-title>

  <SearchHeadertrajet @search="handleSearch" />
  <a-card :style="{
        padding: '24px',
        background: '#fff',
        textAlign: 'center',
        minHeight: '360px',
    }" :bordered="false" id="macarte">
    <a-table :columns="columns" :row-key="keytrajet" :data-source="dataSource" :pagination="pagination"
             :loading="loading" @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'id'">{{ record.id }}
        </template>
        <template v-if="column.dataIndex === 'libelle'">{{ record.depart }}
        </template>

        <template v-if="column.dataIndex === 'idPointArretFk'">{{ record.destination }}
        </template>
         <template v-if="column.dataIndex === 'statut'">
            <p v-if="statut">disponible</p>
            <p v-else>pas disponible</p>
        </template>
        <template v-else-if="['action'].includes(column.dataIndex)">
          <div>


            <!-- modification borne ( config sur icon widget ) -->
            <edit-outlined :style="{ color: '#08f26e' }"
                           @click="showModal(record.id,  record.depart, record.idPointArretFk.nom)" />


            <a-divider type="vertical" />
            <!-- popup modification  -->
            <a-popconfirm v-if="dataSource.length"
                          title="Voulez vous supprimez les informations de ce trajet?"
                          @confirm="onDelete(record.id)">
              <a>

                <delete-outlined :style="{ color: '#f73772' }" />

              </a>

            </a-popconfirm>


          </div>
        </template>
      </template>
    </a-table>
    <a-modal v-model:visible="visible" title="Modification informations du trajet" @ok="modifTrajet">


      <a-form name="basic" autocomplete="off" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">



        <a-form-item label="point arrivee" name="libelle" :rules="[{ required: true }]">

          <a-input v-model:value="formState.libelle" />

        </a-form-item>
        <a-form-item label="point de depart"
                     :rules="[{ required: true, message: 'entrez le point d arret SVP!' }]">

        </a-form-item>


      </a-form>

    </a-modal>

  </a-card>

</template>

<script>
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive } from "vue";
import { message } from "ant-design-vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";

import SearchHeadertrajet from "../../components/SearchHeader_borne.vue";
import axios from "axios";

const columns = [

  {
    title: "id",
    dataIndex: "id",
    sorter: true,
  },
  {
    title: "depart",
    dataIndex: "libelle",
    sorter: true,
  },
  {
    title: "destination",
    dataIndex: "idPointArretFk",
  },
  {
    title: "statut",
    dataIndex: "statut",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];



const queryData = (params) => {
  return axios.get("http://192.168.252.206:4000/api/trajets", {
    params,
  });
};



export default defineComponent({
  components: {
    SearchHeadertrajet,
    EditOutlined,
    DeleteOutlined,
  },

  methods: {

    handleSearch(value) {
      let NewdataSource = []

      if (value.length > 0) {

        this.dataTrajet.filter((item) => {
          if (item.destination.toLowerCase().includes(value.toLowerCase()) || item.depart.toLowerCase().includes(value.toLowerCase())) {
            console.log(item)
            NewdataSource.push(item);
          }


        })
        this.dataSource = NewdataSource

      }
      else {
        this.dataSource = this.dataTrajet
      }
    },
  },
  setup() {

    const modifTrajet = async () => {



      const resp = await axios
          .put(`http://192.168.252.206:4000/api/trajets/updateTrajet/${formState.id}`, {
            libelle: formState.libelle,
            idPointArretFk: formState.idPointArretFk

            // libele: {

            //     id: formState.libelle
            // },
            // idZoneparentFk: {

            //     id: formState.libel
            // },

          });
      if (resp.status === 200) {
        visible.value = false;
        message.success("Modification reussi");


        // this.queryData();



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

      // reglage du changemenet d etat de la table apres recherche  d une borne
      filteredList() {
        return this.dataTrajet.filter((post) => {
          return post.libelle
              .toLowerCase()
              .includes(this.rechercheTrajet.toLowerCase());
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

    const onDelete = (id) => {
      return axios
          .delete(`http://192.168.252.206:4000/api/trajets/deleteTrajet/${id}`,
              {
                data: {
                  statut: false,
                },
              }
          )
          .then((resp) => {
            if (resp.status === 200) {
              console.log(typeof dataSource)
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
    let notEgal

    const showModal = (id, libelle, idPointArretFk) => {
      formState.id = id;
      formState.libelle = libelle;
      formState.idPointArretFk = idPointArretFk;
      visible.value = true;
    };


    const formState = reactive({
      id: '',
      libelle: '',
      idPointArretFk: '',

    });



    const searchQuery = ref('');

    return {
      searchQuery,
      dataSource,
      pagination,
      loading,
      columns,
      handleTableChange,
      onDelete,
      showModal,

      visible,
      formState,
      pointarret: [],
      modifTrajet,
      notEgal

    };
  },


  mounted() {




    fetch("http://192.168.252.206:4000/api/pointarrets")
        .then(response => response.json())
        .then(res => {
          this.pointarret = res.data

        })

    fetch("http://192.168.252.206:4000/api/trajets")
        .then((response) => response.json())
        .then((res) => {
          this.dataTrajet = res.data;

          console.log(this.dataTrajet);
        });



  },
});
</script>

<style>
#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}
</style>