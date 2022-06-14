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
            <a-modal v-model:visible="visible" title="Modification" @ok="onSubmit">


              <a-form name="basic" autocomplete="off" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                @finish="onFinish">



                <a-form-item label="libelle" name="libelle"
                  :rules="[{ required: true, message: 'Please input your libelle!' }]">
                  <a-input v-model:value="formState.libelle" />
                </a-form-item>

                <a-form-item label="Type de zone">
                  <a-select v-model:value="formState.idTypeZoneFk" placeholder="please select your zone">

                    <a-select-option v-for="item in dataZone" v-bind:key="item.id" :value="item.id">{{ item.libelle
                    }}
                    </a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item label="Zone parent">
                  <a-select v-model:value="formState.idZoneparentFk" placeholder="please select your zone">

                    <a-select-option v-for="item in dataTypeTransport" v-bind:key="item.id" :value="item.id">{{
                        item.zoneparent
                    }}
                    </a-select-option>
                  </a-select>
                </a-form-item>


              </a-form>

            </a-modal>

            <edit-outlined :style="{ color: '#08f26e' }"
              @click="showModal(record.id, record.libelle, record.idTypeZoneFk.id, record.idZoneparentFk.id)" />



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
import { usePagination } from "vue-request";
import { computed, defineComponent, ref, reactive } from "vue";
import { message } from "ant-design-vue";
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
  return axios.get("http://192.168.252.223:4001/api/lignes", {
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

    const onSubmit = async () => {



      const resp = await axios
        .put(`http://192.168.252.223:4001/api/lignes/updateligne/${formState.id}`, {
          libelle: formState.libelle,

          idTypeZoneFk: {
            // "id": 2
            id: formState.idTypeZoneFk
          },
          idZoneparentFk: {
            // "id": 3
            id: formState.idZoneparentFk
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
        .delete(`http://192.168.252.223:4001/api/lignes/deleteligne/${id}`)
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

    const showModal = (id, libelle, idTypeZoneFk, idZoneparentFk) => {
      formState.id = id;
      formState.libelle = libelle;
      formState.idTypeZoneFk = idTypeZoneFk;
      formState.idZoneparentFk = idZoneparentFk;

      visible.value = true;
    };


    const formState = reactive({
      id: '',
      libelle: '',
      idTypeZoneFk: '',
      idZoneparentFk: '',
    });


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
      dataTypeTransport: [],
      dataZone: [],
      dataListLigne: [],
      onSubmit,


    };
  },


  mounted() {


    console.log("Component mounted");


    // Pour la liste des types de transport
    fetch("http://192.168.252.223:4001/api/typetransport")
      .then(response => response.json())
      .then(res => {
        this.dataTypeTransport = res.data

        // console.log(this.dataTypeTransport[0].zoneparent)
      })

    // Pour la liste des zones

    fetch("http://192.168.252.223:4001/api/zones")
      .then(response => response.json())
      .then(res => {
        this.dataZone = res

        // console.log(this.dataZone)
      })


    fetch("http://192.168.252.223:4001/api/lignes")
      .then(response => response.json())
      .then(res => {
        this.dataListLigne = res.data

        // console.log(this.dataListLigne)
      })
  },
});
</script>

<style>
#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}
</style>