<template>
  <a-card :bordered="true" style="margin: 1px 0" id="macarte">
    <div class="components-input-demo-presuffix">
      <!-- Début Champ de recherche proprietaire-->
      <a-row>
        <a-col :span="8">
         <a-input-search
            type="text"
            placeholder="Rechercher"
            enter-button
            @change="onChange"
            @keyup="onChange"
            v-model:value="searchText"
          />
          <br />
          <!-- Balise  pour lister l'ensemble des proprietaire -->
          <div v-for="(zone, index) in filters" :key="zone.libelle">
            {{ index }}. {{ filter.libelleTypeTransport }}
          </div>
          <!-- Balise  pour lister l'ensemble des proprietaire -->
        </a-col>
       
      </a-row>
    </div>
  </a-card>
</template>


<script>
import { defineComponent, ref, reactive } from "vue";
import axios from "axios";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "SearchHeader",
  components: {},
  data() {
    return {
      searchText: '',
    };
  },

  setup() {
    const userName = ref("");
    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };
    //Consomation de l'api pour enregiqtrer un type de transport (ok)
    const onSubmit = (e) => {
      console.log(e);
      visible.value = true;
      return axios
        .post(
          "http://192.168.252.206:4000/proprietaire/save",
          {
            nom: formState.nom.proprietaire,
            prenom: formState.prenom.proprietaire,
            genre:formState.genre.proprietaire,
            statut: true,
          }
        )
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
      libelle_type_transport: "",
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
    onChange() {
      this.$emit("search", this.searchText);
    },
  },
emits:["newValue"]
  // computed: {
  //   resultQuery() {
  //     if (this.searchQuery) {
  //       return this.resources.filter((item) => {
  //         return this.searchQuery
  //           .toLowerCase()
  //           .split(" ")
  //           .every((v) => item.title.toLowerCase().includes(v));
  //       });
  //     } else {
  //       return this.resources;
  //     }
  //   },
  // },
});
</script>




