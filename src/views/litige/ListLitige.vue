<template>
  <a-typography-title :level="4">Liste Des Litiges</a-typography-title>

  <SearchHeader_Litige @search="handleSearch" />
  <a-card :style="{
    padding: '24px',
    background: '#fff',
    textAlign: 'center',
    minHeight: '360px',
  }" :bordered="false" id="macarte">
    <a-table :columns="columns" :row-key="keylitige" :data-source="dataSource" :pagination="pagination" :loading="loading"
      @change="handleTableChange">
      <template #bodyCell="{ column,  record }">
        <template v-if="column.dataIndex === 'libelle'">{{ record.libelle }}
        </template>
         <template v-if="column.dataIndex === 'usager'"></template>
          <template v-if="column.dataIndex === 'vehicule'"></template>
           <template v-if="column.dataIndex === 'libelle'"></template>

        <template v-else-if="['action'].includes(column.dataIndex)">
          <div>
            <!--Début Modale Modifier type Transport-->
      
        

            <a-divider type="vertical" />
            <!--Début popup Supprimer type Transport-->
            <a-popconfirm v-if="dataSource.length" title="Voulez vous supprimez ce litige ?" @confirm="onDelete(record.id)">
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
import { DeleteOutlined } from "@ant-design/icons-vue";

import SearchHeader_Litige from "../../components/SearchHeader_Litige.vue";
import axios from "axios";
const columns = [
    {
    title: "id",
    dataIndex: "id",
    sorter: true,
  },
 {
    title: "usager",
    dataIndex: "usager",
    sorter: true,
  },
     {
    title: "vehicule ciblé",
    dataIndex: "vehicule",
    sorter: true,
  },
  {
    title: "description du litige",
    dataIndex: "libelle",
    sorter: true,
  },
  
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const queryData = (params) => {
  return axios.get("", {
    params,
  });
};

export default defineComponent({
  components: {
    SearchHeader_Litige,
    // EditOutlined,
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
          `http://192.168.252.206:4001/api/v1/ModeDeplacement/deleteModeDeplacement/${id}`,
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
    

    };
  },


  mounted() {


    console.log("Component mounted");

    // fetch("http://192.168.252.206:4001/api/zoneparents")
    //   .then(response => response.json())
    //   .then(res => {
    //     this.dataZoneParent = res.data

    //     // console.log(this.dataZoneParent[0].zoneparent)
    //   })

    // fetch("http://192.168.252.206:4001/list")
    //   .then(response => response.json())
    //   .then(res => {
    //     this.dataTypeZone = res

    //     // console.log(this.dataTypeZone)
    //   })


      fetch("http://192.168.252.206:4001/api/v1/ModeDeplacement/getModeDeplacements")
      .then(response => response.json())
      .then(res => {
        this.dataListModeDeplacement = res.data

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