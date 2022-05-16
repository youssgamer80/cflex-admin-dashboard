<template>
  <a-typography-title :level="4">Liste Type Transport</a-typography-title>

  <SearchHeader />
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
    <a-table
      :columns="columns"
      :row-key="keyTypeTransport"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'libelleTypeTransport'"
          >{{ text }}
        </template>
        <template v-if="column.dataIndex === 'statut'">
          <h1 v-if="text">Disponible</h1>
          <h1 v-else>Indisponible</h1>
        </template>
        <template v-else-if="['action'].includes(column.dataIndex)">
          <div>
            <eye-outlined :style="{ color: '#26ABFF' }" />

            <a-divider type="vertical" />
            <edit-outlined :style="{ color: '#08f26e' }" />

            <a-divider type="vertical" />

            <a-popconfirm
              v-if="dataSource.length"
              title="Voulez vous supprimez?"
              @confirm="onDelete(record.id)"
            >
              <a><delete-outlined :style="{ color: '#f73772' }" /></a>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { usePagination } from "vue-request";
import { computed, defineComponent } from "vue";
import { message } from 'ant-design-vue';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";

import SearchHeader from "../../components/SearchHeader.vue";
import axios from "axios";
const columns = [
  {
    title: "Libellé",
    dataIndex: "libelleTypeTransport",
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
  return axios.get("http://localhost:4001/api/typetransport", {
    params,
  });
};

export default defineComponent({
  components: {
    SearchHeader,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
  },
  setup() {
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
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
      return axios.delete(
        `http://localhost:4001/api/typetransport/deletetypetransport/${ id }`,
        {
          data: {
            statut: false,
          }
        }

        
      ).then((resp)=>{
        if(resp.status === 200){
          dataSource.value = dataSource.value.filter(item => item.id !== id);
        message.success('Supprimé avec succès!!');
        } else {
          message.error('impossible!!');
        }
        
      });
    };

    console.log(dataSource);
    return {
      dataSource,
      pagination,
      loading,
      columns,
      handleTableChange,
      onDelete,
    };
  },
});
</script>

<style>
#macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}
</style>