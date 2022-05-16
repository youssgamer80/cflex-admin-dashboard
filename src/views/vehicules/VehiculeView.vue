<template>
  <a-typography-title :level="4">Liste Vehicule</a-typography-title>

<SearchHeader/>
    <a-card :style="{ padding: '24px', background: '#fff', textAlign: 'center', minHeight: '360px',}" :bordered="false" id="macarte">
        <a-table
    :columns="columns"
    :row-key="record => record.login.uuid"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, text,record }">
      <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
      <template v-else-if="['action'].includes(column.dataIndex)">
      <div>
   
    <eye-outlined :style="{ color: '#26ABFF' }"/>

    <a-divider type="vertical" />
    <edit-outlined :style="{ color: '#08f26e' }"/>
    
    <a-divider type="vertical" />
    
     <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.email)"
        >
          <a><delete-outlined :style="{ color: '#f73772' }"/></a>
        </a-popconfirm>
  </div>
      </template>
    </template>
  </a-table>
    </a-card>
</template>

<script>
import { usePagination } from 'vue-request';
import { computed, defineComponent } from 'vue';
import { EyeOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons-vue';

import  SearchHeader  from '../../components/SearchHeader.vue';
import axios from 'axios';
const columns = [
{
  title: 'N°',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
}, 
{
  title: 'Gender',
  dataIndex: 'gender',
  filters: [{
    text: 'Male',
    value: 'male',
  }, {
    text: 'Female',
    value: 'female',
  }],
  width: '20%',
},

{
  title: 'Email',
  dataIndex: 'email',
},
{
  title: 'Action',
  dataIndex: 'action',
}
];

const queryData = params => {
  return axios.get('https://randomuser.me/api?noinfo', {
    params,
  });
};

export default defineComponent({
  components : {
    SearchHeader,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined
  },
  setup() {
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(queryData, {
      formatResult: res => res.data.results,
      pagination: {
        currentKey: 'page',
        pageSizeKey: 'results',
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

    const onDelete = key => {
      dataSource.value = dataSource.value.filter(item => item.email !== key);
    };

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