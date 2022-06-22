<template>
  <a-typography-title :level="4">Liste Des Zones</a-typography-title>

  <SearchHeaderZone @search="handleSearch" />
  <a-card :style="{
    padding: '24px',
    background: '#fff',
    textAlign: 'center',
    minHeight: '360px',
  }" :bordered="false" id="macarte">
    <a-table :columns="columns" :row-key="keyZone" :data-source="dataSource" :pagination="pagination" :loading="loading"
      @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'libelle'">{{ record.libelle }}
        </template>
        <template v-if="column.dataIndex === 'id_type_zone_fk '">
          {{ record.idTypeZoneFk.libelle }}
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
    title: "Type Zone",
    dataIndex: "id_type_zone_fk ",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const queryData = (params) => {
  return axios.get("http://192.168.252.223:4001/api/zones", {
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
      

      // console.log("Old data")
      // console.log(this.oldData)

      // console.log("Test tapé")
      // console.log(value.length)
      // console.log("Chaque element")


      if (value.length > 0) {

        this.dataListZone.filter((item) => {
          if (item.libelle.toLowerCase().includes(value.toLowerCase())) {
            NewdataSource.push(item);
          }
          
        })
        this.dataSource = NewdataSource

      }
      else {
        this.dataSource = this.dataListZone
      }
    }
  },
  setup() {

    const onSubmit = async () => {



      const resp = await axios
        .put(`http://192.168.252.223:4001/api/zones/updateZone/${formState.id}`, {
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
          `http://192.168.252.223:4001/api/zones/deleteZone/${id}`,
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
      dataZoneParent: [],
      dataTypeZone: [],
      dataListZone: [],
      onSubmit,
      notEgal

    };
  },


  mounted() {


    console.log("Component mounted");

    fetch("http://192.168.252.223:4001/api/zoneparents")
      .then(response => response.json())
      .then(res => {
        this.dataZoneParent = res.data

        // console.log(this.dataZoneParent[0].zoneparent)
      })

    fetch("http://192.168.252.223:4001/list")
      .then(response => response.json())
      .then(res => {
        this.dataTypeZone = res

        // console.log(this.dataTypeZone)
      })


      fetch("http://192.168.252.223:4001/api/zones")
      .then(response => response.json())
      .then(res => {
       this.dataListZone= res.data

        console.log(this.dataListZone)
      })
  },
});
</script>

<style>
#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}
</style>