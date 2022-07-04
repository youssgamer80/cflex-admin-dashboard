<template>
  <a-card :bordered="false" style="margin: 10px 0" id="macarte">
    <a-typography-title :level="5">Recherche</a-typography-title>
    <div class="components-input-demo-presuffix">
      <!-- Début Champ de recherche Type Transport-->
      <a-row>
        <a-col :span="8">
          <a-input-search
            v-model:value="searchText"
            type="text"
            placeholder="Rechercher"
            @keyup="onChange"
            enter-button="Rechercher"
            @search="onSearch"
          />
          <br />
          <!-- Balise  pour lister l'ensemble des types transport -->
           <div v-for="(type_point_arret, index) in filters" :key="type_point_arret.typePointArret ">
               {{index}}. {{filter.typePointArret}}
          </div>
          <!-- Balise  pour lister l'ensemble des types transport -->
        </a-col>
        <!-- Fin  Champ de recherche Type Transport-->

        <!-- Début  Modal Ajout Type Transport-->
        <a-col :span="8" :offset="6">
          <a-button type="primary" @click="showModal"> Ajouter </a-button>
          <a-modal
            v-model:visible="visible"
            width="500px"
            title="Ajouter type de point d'arret"
            @ok="onSubmit"
          >
            <a-form
              :model="formState"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-form-item label="Libelle" :rules="[{ required: true }]">
                <a-input v-model:value="formState.typePointArret" />
              </a-form-item>
            </a-form>
          </a-modal>
        </a-col>
        <!-- Fin Modal Ajout Type Transport-->
      </a-row>
    </div>
  </a-card>
</template>


<script>
import { defineComponent, ref, reactive } from "vue";
import axios from "axios";

export default defineComponent({
  name: "SearchHeader",
  components: {},

  setup() {
    const userName = ref("");
    const visible = ref(false);
    const showModal = () => {visible.value = true};
//fonction pour enregiqtrer un type de tt
    const onSubmit = (e) => { console.log(e); visible.value = false;
      return axios
        .post("http://192.168.252.135:4001/api/v1/TypePointArret/addTypePointArret", {
          typePointArret: formState.typePointArret,
          statut: true,
        })
        .then((resp) => {
          console.log(resp.data);
        });
    };
    const formState = reactive({
      typePointArret: "",
      statut: "",
    });

    return {
      userName,
      visible,
      showModal,
      onSubmit,
      formState,
      filters:[],
      searchQuery:"",
    };
  },
mounted() {
  console.log("Component mounted");
},
methods: {
  getAllTypeTypeTransports() {
fetch("http://192.168.252.135:4001/api/v1/TypePointArret/getTypePointArrets")
.then(response => response.json())
.then(res => {
  if(this.searchQuery){
    this.filters = res.result.filter(filters => filters.typePointArret.toLowerCase().includes(this.searchQuery.toLowerCase()))
  } else{
    this.filters = res.result;
  }
});
  },
  created() {
    this.getAllTypeTypeTransports();
  }
}
 
});
</script>




