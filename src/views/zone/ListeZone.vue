<template>
  <a-typography-title :level="4">Liste Des Zones</a-typography-title>

  <SearchHeaderZone  @search="handleSearch"/>
  <a-card :style="{
    padding: '24px',
    background: '#fff',
    textAlign: 'center',
    minHeight: '360px',
  }" :bordered="false" id="macarte">
    <a-table :columns="columns" :row-key="keyZone" :data-source="dataSource" :pagination="pagination" :loading="loading"
      @change="handleTableChange">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'libelle'">{{ record.libelle }}
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
                  <a-input v-model:value="formState.libelle" />
                </a-form-item>

                <a-form-item label="Type de zone">
                  <a-select v-model:value="formState.idTypeZoneFk" placeholder="please select your zone">

                    <a-select-option v-for="item in dataTypeZone" v-bind:key="item.id" :value="item.id">{{ item.libelle
                    }}
                    </a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item label="Zone parent">
                  <a-select v-model:value="formState.idZoneparentFk" placeholder="please select your zone">

                    <a-select-option v-for="item in dataZoneParent" v-bind:key="item.id" :value="item.id">{{
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

import SearchHeaderZone from "../../components/SearchHeader_zone.vue";
import axios from "axios";
const columns = [
  {
    title: "Libellé",
    dataIndex: "libelle",
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
  return axios.get("http://192.168.252.206:4000/api/zones", {
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

    handleSearch(value){
      // if(value && value.length > 0) {
      //   this.filteredData = this.technologyData.filter(i => {
      //     const val = value.toLowerCase();
      //     const title = i.title && i.title.toLowerCase();
      //     if(val && title.indexOf(val) !== -1) {
      //       return true
      //     } 
      //     return false
      //   })
      // } else {
      //   this.filteredData = this.technologyData;
      // }
      console.log(value)
    }
  },
  setup() {

    const onSubmit = async () => {


      console.log(formState)
      const resp = await axios
        .put(`http://192.168.252.206:4000/api/zones/updateZone/${formState.id}`, {
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
        .delete(
          `http://192.168.252.206:4000/api/zones/deleteZone/${id}`,
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

    const showModal = (id, libelle, idTypeZoneFk, idZoneparentFk) => {
      formState.id = id;
      formState.libelle = libelle;
      formState.idTypeZoneFk = idTypeZoneFk;
      formState.idZoneparentFk = idZoneparentFk;

      // console.log(formState.idZoneparentFk)
      visible.value = true;
    };

    // const resultQuery = () => {
    //   if (this.searchQuery) {
    //     return this.resources.filter((item) => {
    //       return this.searchQuery.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
    //     })
    //   } else {
    //     return this.resources;
    //   }
    // }
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
      dataZoneParent: [],
      dataTypeZone: [],
      onSubmit
    };
  },


  mounted() {


    console.log("Component mounted");

    fetch("http://192.168.252.206:4000/api/zoneparents")
      .then(response => response.json())
      .then(res => {
        this.dataZoneParent = res.data

        // console.log(this.dataZoneParent[0].zoneparent)
      })

    fetch("http://192.168.252.206:4000/list")
      .then(response => response.json())
      .then(res => {
        this.dataTypeZone = res

        // console.log(this.dataTypeZone)
      })
  },
});
</script>

<style>
#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}
</style>