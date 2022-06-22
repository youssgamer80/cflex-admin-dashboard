<template>
  <SearchHeader @search="handleSearch" />

    <a-table
    :columns="columns"
    :data="data"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'idTypeTransportFk'">{{ text.libelleTypeTransport }}</template>
        <template v-if="column.dataIndex === 'id'">
        <router-link :to="url+text">Gerer la demande</router-link>
      </template>
       <template v-if="column.dataIndex === 'etat'">
       <template v-if="text === 1">
       Non traitée
       </template>
       <template v-else-if="text === 2">
        En cours de traitement
        </template>
        <template v-else-if="text === 3">
        Rejetée
        </template>
        <template v-else-if="text === 4">
        Validée
        </template>
      </template>
    </template>
  </a-table>

</template>
<script>
import { usePagination } from 'vue-request';
import { computed, defineComponent } from 'vue';
import axios from 'axios';
import SearchHeader from './SearchHeader_demande.vue';
const columns = [
{
  title: 'Type Transport',
  dataIndex: 'idTypeTransportFk',
  sorter: true,
  width: '20%',
},
{
  title: 'Immatriculation',
  dataIndex: 'immatriculation',
  sorter: true,
  width: '20%',
}
, {
  title: 'Etat',
  dataIndex: 'etat',
  // filters: [{
  //   text: 'Traité',
  //   value: 'false',
  // }, {
  //   text: 'Non traité',
  //   value: 'true',
  // }],

}, {
  title: 'Marque',
  dataIndex: 'marque',
},{
  title: 'ACTION',
  dataIndex: 'id',
  sorter: true,
  width: '20%',
},];


const queryData = params => {
  return axios.get('http://192.168.252.206:4000/api/demandes', {
    params,
  });
};

export default defineComponent({
  components: { SearchHeader },
  setup() {
    const url = "/tableau-de-bord/details-demandes/"
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(queryData, {
      formatResult: res => res.data.data,
      pagination: {
        currentKey: 'page',
        pageSizeKey: 'data',
      },
    });
    const pagination = computed(() => ({
      total: dataSource.length,
      current: current.value,
      pageSize: pageSize.value,
    }));

    const handleTableChange = (pag, filters, sorter) => {
      run({
        data: pag.pageSize,
        page: pag?.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    };


    return {
      dataSource,
      pagination,
      loading,
      columns,
      handleTableChange,
      url,
      datalistDemande: [],
    };
  },
mounted() {
    console.log("Component mounted");

//liste des demandes pour la recherche 
      fetch("http://192.168.252.206:4000/api/demandes")
      .then((response) => response.json())
      .then((res) => {
        this.datalistDemande = res.data;

        console.log("Liste des demandes",this.datalistDemande);
      });
  },
  methods: {
    handleSearch(value) {
      let NewdataSource = [];
      if (value.length > 0) {
        this.datalistDemande.filter((item) => {
          if (
            item.immatriculation
              .toLowerCase()
              .includes(value.toLowerCase())
          ) {
            NewdataSource.push(item);
          }
        });
        this.dataSource = NewdataSource;
      } else {
        this.dataSource = this.datalistDemande;
      }
    },
  },

});
</script>