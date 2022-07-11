<template>
  <a-card :bordered="false" style="margin: 10px 0" id="macarte">
    <a-typography-title :level="5">Recherche</a-typography-title>
    <div class="components-input-demo-presuffix">
      <!-- Début Champ de recherche Type Transport-->
      <a-row>
        <a-col :span="8">
          <a-input-search type="text" placeholder="Rechercher" enter-button @change="onChange" @keyup="onChange"
            v-model:value="searchText" />
          <br />
        </a-col>
        <!-- Fin  Champ de recherche Type Transport-->

        <!-- Début  Modal Ajout Type Transport-->
        <a-col :span="8" :offset="6">
          <a-button type="primary" @click="showModal"> Ajouter </a-button>
         

          <a-modal v-model:visible="visible" title="Ajout d'un mode de deplacement" @ok="onSubmit">


            <a-form name="basic" autocomplete="off" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
              @finish="onFinish">



             


              <a-form-item label="Nom" name="nom">
                <a-input v-model:value="formState.modeDeplacement" />
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
  name: "SearchHeade_mode_deplacement",
  components: {},

  data() {
    return {
      searchText: "",
    };
  },


  setup() {

    const visible = ref(false);
    const showModal = () => { visible.value = true };
    //fonction pour enregiqtrer un type de tt

    const onSubmit = () => {

      return axios
        .post("http://192.168.252.206:4001/api/v1/ModeDeplacement/addModeDeplacement", {
          modeDeplacement: formState.modeDeplacement

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
      modeDeplacement: "",
    });


    



    

   
  

    return {

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

    onChange() {
      this.$emit("search", this.searchText);
    },



  },
  
});
</script>




