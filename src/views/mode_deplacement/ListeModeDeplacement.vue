<template>
  <a-typography-title :level="4">Liste Des Modes de deplacement</a-typography-title>

  <SearchHeader_mode_deplacement @search="handleSearch" />
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
            <a-modal v-model:visible="visible" title="Modification" @ok="onUpdate">


              <a-form name="basic" autocomplete="off" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
                >



                <a-form-item label="libelle" name="modedeplacement"
                 >
                  <a-input v-model:value="formState.libelle" />
                </a-form-item>

                <!-- <a-form-item label="Type de zone">
                  <a-select v-model:value="formState.idTypeZoneFk" placeholder="please select your zone">

                    <a-select-option v-for="item in dataTypeZone" v-bind:key="item.id" :value="item.id">{{ item.libelle
                    }}
                    </a-select-option>
                  </a-select>
                </a-form-item> -->

                <!-- <a-form-item label="Zone parent">
                  <a-select v-model:value="formState.idZoneparentFk" placeholder="please select your zone">

                    <a-select-option v-for="item in dataZoneParent" v-bind:key="item.id" :value="item.id">{{
                        item.zoneparent
                    }}
                    </a-select-option>
                  </a-select>
                </a-form-item> -->


              </a-form>

            </a-modal>

            <edit-outlined :style="{ color: '#08f26e' }"
              @click="showModal(record.id, record.modeDeplacement)" />



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

import SearchHeader_mode_deplacement from "../../components/SearchHeader_mode_deplacement.vue";
import axios from "axios";
const columns = [
  {
    title: "Nom",
    dataIndex: "modeDeplacement",
    sorter: true,
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const queryData = (params) => {
  return axios.get("http://localhost:4001/api/v1/ModeDeplacement/getModeDeplacements", {
    params,
  });
};

export default defineComponent({
  components: {
    SearchHeader_mode_deplacement,
    EditOutlined,
    DeleteOutlined,
  },

  
  methods: {

    handleSearch(value) {
      let NewdataSource = []
      
      if (value.length > 0) {

        this.dataListModeDeplacement.filter((item) => {
          if (item.modeDeplacement.toLowerCase().includes(value.toLowerCase())) {
            NewdataSource.push(item);
          }
          
        })
        this.dataSource = NewdataSource

      }
      else {
        this.dataSource = this.dataListModeDeplacement
      }
    }
  },
  setup() {

    const onUpdate = async () => {



      const resp = await axios
        .put(`http://localhost:4001/api/v1/ModeDeplacement/updateModeDeplacement/${formState.id}`, {
          modeDeplacement: formState.libelle,
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
          `http://localhost:4001/api/v1/ModeDeplacement/deleteModeDeplacement/${id}`,
          {
            data: {
              statut: false,
            },
          }
        )
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
    const showModal = (id, libelle) => {
      formState.id = id;
      formState.libelle = libelle;

      visible.value = true;
    };


    const formState = reactive({
      id: '',
      libelle: '',
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

      dataListModeDeplacement: [],
      onUpdate,


    };
  },


  mounted() {


    console.log("Component mounted");

    // fetch("http://localhost:4001/api/zoneparents")
    //   .then(response => response.json())
    //   .then(res => {
    //     this.dataZoneParent = res.data

    //     // console.log(this.dataZoneParent[0].zoneparent)
    //   })

    // fetch("http://localhost:4001/list")
    //   .then(response => response.json())
    //   .then(res => {
    //     this.dataTypeZone = res

    //     // console.log(this.dataTypeZone)
    //   })


      fetch("http://localhost:4001/api/v1/ModeDeplacement/getModeDeplacements")
      .then(response => response.json())
      .then(res => {
       this.dataListModeDeplacement= res.data

        console.log(this.dataListModeDeplacement)
      })
  },
});
</script>

<style>
#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}
</style>