<template>
  <a-typography-title :level="4">Liste Des Lignes</a-typography-title>

  <SearchHeader_Carte @search="handleSearch" />
  <a-card :style="{
    padding: '24px',
    background: '#fff',
    textAlign: 'center',
    minHeight: '360px',
  }" :bordered="false" id="macarte">
  
  </a-card>
</template>

<script>
// import { usePagination } from "vue-request";
import {  defineComponent } from "vue";
// import { message } from "ant-design-vue";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";

import SearchHeader_Carte from "../../components/SearchHeader_Carte.vue";
// import axios from "axios";
// const columns = [
//   {
//     title: "Nom",
//     dataIndex: "nom",
//     sorter: true,
//   },
//   {
//     title: "Depart",
//     dataIndex: "depart",
//     sorter: true,
//   },
//   {
//     title: "Arrivée",
//     dataIndex: "arrivee",
//     sorter: true,
//   }, {
//     title: "Zone",
//     dataIndex: "zone",
//     sorter: true,
//   },
//   {
//     title: "Tarif",
//     dataIndex: "tarif",
//     sorter: true,
//   },
//   {
//     title: "Action",
//     dataIndex: "action",
//   },
// ];

// const queryData = (params) => {
//   return axios.get("http://192.168.252.223:4001/api/lignes", {
//     params,
//   });
// };

export default defineComponent({
  components: {
    SearchHeader_Carte,
    // EditOutlined,
    // DeleteOutlined,
  },


  methods: {

    // handleSearch(value) {
    //   let NewdataSource = []

    //   if (value.length > 0) {

    //     this.dataListLigne.filter((item) => {
    //       if (item.depart.toLowerCase().includes(value.toLowerCase())) {
    //         NewdataSource.push(item);
    //       }

    //     })
    //     this.dataSource = NewdataSource

    //   }
    //   else {
    //     this.dataSource = this.dataListLigne
    //   }
    // }
  },
  setup() {

    // const onSubmit = async () => {



    //   const resp = await axios
    //     .put(`http://192.168.252.223:4001/api/lignes/updateligne/${formState.id}`, {
    //       libelle: formState.libelle,

    //       idTypeZoneFk: {
    //         // "id": 2
    //         id: formState.idTypeZoneFk
    //       },
    //       idZoneparentFk: {
    //         // "id": 3
    //         id: formState.idZoneparentFk
    //       },
    //       statut: true
    //     });
    //   if (resp.status === 200) {
    //     visible.value = false;
    //     message.success("Modification reussi");


    //   } else {
    //     message.error("impossible!!");
    //   }


    // };


    // const {
    //   data: dataSource,
    //   run,
    //   loading = ref(false),
    //   current,
    //   pageSize,
    // } = usePagination(queryData, {
    //   formatResult: (res) => {

    //     return res.data.data
    //   },
    //   pagination: {
    //     currentKey: "page",
    //     pageSizeKey: "results",
    //   },
    // });
    // const pagination = computed(() => ({
    //   total: 200,
    //   current: current.value,
    //   pageSize: pageSize.value,
    // }));

    // const handleTableChange = (pag, filters, sorter) => {
    //   run({
    //     results: pag.pageSize,
    //     page: pag?.current,
    //     sortField: sorter.field,
    //     sortOrder: sorter.order,
    //     ...filters,
    //   });
    // };

    // const onDelete = (id) => {
    //   return axios
    //     .delete(`http://192.168.252.223:4001/api/lignes/deleteligne/${id}`)
    //     .then((resp) => {
    //       if (resp.status === 200) {
    //         // console.log(typeof dataSource)
    //         dataSource.value = dataSource.value.filter(
    //           (item) => item.id !== id
    //         );
    //         message.success("Supprimé avec succès!!");
    //       } else {
    //         message.error("impossible!!");
    //       }
    //     });
    // };

    // const visible = ref(false);

    // const showModal = (id, libelle, idTypeZoneFk, idZoneparentFk) => {
    //   formState.id = id;
    //   formState.libelle = libelle;
    //   formState.idTypeZoneFk = idTypeZoneFk;
    //   formState.idZoneparentFk = idZoneparentFk;

    //   visible.value = true;
    // };


    // const formState = reactive({
    //   id: '',
    //   libelle: '',
    //   idTypeZoneFk: '',
    //   idZoneparentFk: '',
    // });


    // const handleOk = e => {
    //   console.log(e);
    //   visible.value = false;
    // };
    // let searchQuery

    return {
      // searchQuery,
      // dataSource,
      // pagination,
      // loading,
      // columns,
      // handleTableChange,
      // onDelete,
      // showModal,
      // handleOk,
      // visible,
      // formState,
      // dataTypeTransport: [],
      // dataZone: [],
      // dataListLigne: [],
      // onSubmit,


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