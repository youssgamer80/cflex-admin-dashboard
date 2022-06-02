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
        <template v-if="column.dataIndex === 'nom'">{{ record.nom }}
        </template>
        <template v-if="column.dataIndex === 'statut'">
          <h1 v-if="text">Disponible</h1>
          <h1 v-else>Indisponible</h1>
        </template>
        <template v-else-if="['action'].includes(column.dataIndex)">
          <div>
            <!--Début Modale Modifier type Transport-->
            <a-modal v-model:visible="visible" title="Modification" @ok="onSubmit">


              <a-form name="basic" autocomplete="off" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                @finish="onFinish">



                <a-form-item label="libelle" name="libelle"
                  :rules="[{ required: true, message: 'Please input your libelle!' }]">
                  <a-input v-model:value="formState.nom" />
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
              @click="showModal(record.id, record.nom, record.idZoneFk.id)" />



            <!--Début Modale Modifier type Transport-->

            <a-divider type="vertical" />
            <!--Début popup Supprimer type Transport-->
            <a-popconfirm v-if="dataSource.length" title="Voulez vous supprimez?" @confirm="onDelete(record.id)">
              <a>
                <delete-outlined :style="{ color: '#f73772' }" />
              </a>
              <template>
                <p>test</p>
              </template>
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

import SearchHeader_PointArret from "../../components/SearchHeader_PointArret.vue";
import axios from "axios";
const columns = [
  {
    title: "Libellé",
    dataIndex: "nom",
    sorter: true,
  },
  {
    title: "Statut",
    dataIndex: "statut",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const queryData = (params) => {
  return axios.get("http://192.168.1.8:4001/api/pointarrets", {
    params,
  });
};

export default defineComponent({
  components: {
    SearchHeader_PointArret,
    EditOutlined,
    DeleteOutlined,
  },

  
  methods: {

    handleSearch(value) {
      let NewdataSource = []
      

      // console.log("Old data")
      // console.log(this.oldData)

      // console.log("Test tapé")
      // console.log(value.length)
      // console.log("Chaque element")


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

    const onSubmit = async () => {



      const resp = await axios
        .put(`http://192.168.1.8:4001/api/pointarrets/updatePointArret/${formState.id}`, {
          nom: formState.libelle,
          longitude: formState.libelle,
          latitude: formState.libelle,
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

    const onDelete = (id) => {
      return axios
        .delete(
          `http://192.168.1.8:4001/api/pointarrets/deletePointArret/${id}`,
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
    const showModal = (id, nom, idZoneFk) => {
      formState.id = id;
      formState.nom = nom;
      formState.idZoneFk = idZoneFk;
      visible.value = true;
    };


    const formState = reactive({
      id: '',
      nom: '',
      idZoneFk: '',
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
      dataListZone: [],
      dataListPointArret: [],
      onSubmit,

    };
  },


  mounted() {


    console.log("Component mounted");

    fetch("http://192.168.1.8:4001/api/zones")
      .then(response => response.json())
      .then(res => {
        this.dataListZone = res.data

        // console.log(this.dataZone[0].zoneparent)
      })

    // fetch("http://192.168.1.8:4001/list")
    //   .then(response => response.json())
    //   .then(res => {
    //     this.dataTypeZone = res

    //     // console.log(this.dataTypeZone)
    //   })


      fetch("http://192.168.1.8:4001/api/pointarrets")
      .then(response => response.json())
      .then(res => {
       this.dataListPointArret= res.data

        console.log(this.dataListPointArret)
      })
  },
});
</script>

<style>
#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}
</style>