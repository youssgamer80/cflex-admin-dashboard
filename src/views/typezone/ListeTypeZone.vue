<template>
  <a-typography-title :level="4">Liste Des Types de zone</a-typography-title>

  <SearchHeaderTypeZone />
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
            <a-modal v-model:visible="visible" title="Modification">

              <!-- <a-input v-model:value="formState.username" placeholder="Basic usage" />
               <a-input v-model:value="formState.password" placeholder="Basic usage" />
              -->
              <a-form :model="formState" name="basic" autocomplete="off" :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }" @finish="onFinish">

                <!-- <a-form-item label="Username" name="username"
                  :rules="[{ required: true, message: 'Please input your username!' }]">
                  <a-input v-model:value="formState.id" />
                </a-form-item> -->

                <a-form-item label="libelle" name="libelle"
                  :rules="[{ required: true, message: 'Please input your libelle!' }]">
                  <a-input v-model:value="formState.libelle" />
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                  <a-button type="primary" html-type="submit">Submit</a-button>
                </a-form-item>
              </a-form>

            </a-modal>
            <edit-outlined :style="{ color: '#08f26e' }" @click="showModal(record.id, record.libelle)" />



            <a-divider type="vertical" />
            <!--Début popup Supprimer type Transport-->
            <a-popconfirm v-if="dataSource.length" title="Voulez vous supprimez?" @confirm="onDelete(record.id)">
              <a>
                <delete-outlined :style="{ color: '#f73772' }" />
              </a>
              <!-- <template>
                <p>test</p>
              </template> -->
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

import SearchHeaderTypeZone from "../../components/SearchHeader_typezone.vue";
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
  return axios.get("http://localhost:4000/api/typezone", {
    params,
  });
};

export default defineComponent({
  components: {
    SearchHeaderTypeZone,
    EditOutlined,
    DeleteOutlined,
  },
  methods: {

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
        console.log(res.data.data)
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
          `http://localhost:4000/api/typezone/deleteTypeZone/${id}`
        )
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

    const onFinish = values => {
      

      console.log('Success:', values);
      return axios
        .put(`http://localhost:4000/api/typezone/updateTypeZone/${formState.id}`, {
          libelle:formState.libelle,
          statut:true,
        })
        .then((resp) => {
          if (resp.status === 200) {
            visible.value = false;
            message.success("Modification reussi");
          } else {
            message.error("impossible!!");
          }
        });



    };

    // const onFinishFailed = errorInfo => {
    //   console.log('Failed:', errorInfo);
    // };
    const visible = ref(false);

    const showModal = (id, libelle) => {
      formState.id = id;
      formState.libelle = libelle;
      visible.value = true;
    };

    const handleOk = e => {
      console.log(e);
      visible.value = false;
    };


    const formState = reactive({
      id: '',
      libelle: '',

    });

    return {
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
      onFinish,
    };
  },
});
</script>

<style>
#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}
</style>