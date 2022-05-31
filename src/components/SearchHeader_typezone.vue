<template>
  <a-card :bordered="false" style="margin: 10px 0" id="macarte">
    <a-typography-title :level="5">Recherche</a-typography-title>
    <div class="components-input-demo-presuffix">
      <!-- Début Champ de recherche Type Transport-->
      <a-row>
        <a-col :span="8">
          <a-input-search v-model.trim="searchQuery" type="text" placeholder="Rechercher" @keyup="getAllTypeTyp"
            enter-button="Rechercher" @search="onSearch" />
          <br />
          <!-- Balise  pour lister l'ensemble des types transport -->
          <div v-for="(zone, index) in filters" :key="zone.libelle">
            {{ index }}. {{ filter.libelle }}
          </div>
          <!-- Balise  pour lister l'ensemble des types transport -->
        </a-col>
        <!-- Fin  Champ de recherche Type Transport-->

        <!-- Début  Modal Ajout Type Transport-->
        <a-col :span="8" :offset="6">
          <a-button type="primary" @click="showModal"> Ajouter </a-button>
          <a-modal v-model:visible="visible" width="500px" title="Ajouter un type de zone" @ok="onSubmit">
            <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-item label="Libelle" :rules="[{ required: true }]">
                <a-input v-model:value="formState.libelle" />
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
import { message } from "ant-design-vue";
import { defineComponent, ref, reactive } from "vue";
import axios from "axios";


export default defineComponent({
  name: "SearchHeader",
  components: {},

  setup() {
   

    

    const userName = ref("");
    const visible = ref(false);
    const showModal = () => { visible.value = true };
    //fonction pour enregiqtrer un type de tt
    const onSubmit = (e) => {
  
      console.log(e); 
      
      return axios
        .post("http://localhost:4000/api/typezone/addTypeZone", {
          libelle:formState.libelle,
          statut:true,
          
        })
        .then((resp) => {
          if (resp.status === 200) {
            visible.value = false;
            message.success("Enregistrement reussi");
          } else {
            message.error("impossible!!");
          }
        });
    };
    const formState = reactive({
      libelle: "",
      statut: "",
     
    });

    return {
      userName,
      visible,
      showModal,
      onSubmit,
      formState,
      filters: [],
      searchQuery: "",
 
    };
  },
  mounted() {
    console.log("Component mounted");

  },
  methods: {
   

    getAllTypeZone() {
      fetch("http://192.168.252.206:4000/list")
        .then(response => response.json())
        .then(res => {
          if (this.searchQuery) {
            this.filters = res.result.filter(filters => filters.libelle.toLowerCase().includes(this.searchQuery.toLowerCase()))
          } else {
            this.filters = res.result;
          }
        });
    },

    created() {
      this.getAllTypeZone();
      
    }
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.resources.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.resources;
      }
    },
  },
});
</script>




