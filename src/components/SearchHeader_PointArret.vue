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
          <!-- <a-modal v-model:visible="visible" width="500px" title="Ajouter un type de zone" @ok="onSubmit">
            <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-item label="Libelle" :rules="[{ required: true }]">
                <a-input v-model:value="formState.libelle" />
              </a-form-item>

            </a-form>
          </a-modal> -->

          <a-modal v-model:visible="visible" title="Modification" @ok="onSubmit">


            <a-form name="basic" autocomplete="off" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
              @finish="onFinish">



              <a-form-item label="Nom" name="nom" :rules="[{ required: true, message: 'Please input your libelle!' }]">
                <!-- <a-input v-model:value="formState.nom" /> -->
                <a-select v-model:value="value" show-search placeholder="Select a person" style="width: 200px"
                  :options="options" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                  @search="handleChange" @change="choice"></a-select>
              </a-form-item>


              <!-- <a-form-item label="Nom" name="nom" :rules="[{ required: true, message: 'Please input your libelle!' }]">
                <a-input v-model:value="formState.nom" />
              </a-form-item> -->


              <!-- <a-form-item label="Type de zone">
                <a-select v-model:value="formState.idTypeZoneFk" placeholder="please select your zone">

                  <a-select-option v-for="item in dataTypeZone" v-bind:key="item.id" :value="item.id">{{ item.libelle
                  }}
                  </a-select-option>
                </a-select>
              </a-form-item> -->

              <a-form-item label="Zone">
                <a-select v-model:value="formState.idZoneFk" placeholder="please select your zone">

                  <a-select-option v-for="item in dataZone" v-bind:key="item.id" :value="item.id">{{
                      item.libelle
                  }}
                  </a-select-option>
                </a-select>
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
// import { message } from "ant-design-vue";
import { defineComponent, ref, reactive } from "vue";
// import axios from "axios";


export default defineComponent({
  name: "SearchHeader",
  components: {},

  data() {
    return {
      searchText: "",
    };
  },


  setup() {

    const userName = ref("");
    const visible = ref(false);
    const showModal = () => { visible.value = true };
    //fonction pour enregiqtrer un type de tt
    const onSubmit = () => {

      // let i =0
      console.log(formState.nom)
      console.log(formState.idZoneFk)

      // fetch(`https://nominatim.openstreetmap.org/?addressdetails=1&q=${formState.nom}&countrycodes=ci&format=json`)
      //   .then(response => response.json())
      //   .then(res => {

       
      //   })

      // return axios
      //   .post("http://192.168.1.8:4001/api/typezone/addTypeZone", {
      //     libelle: formState.libelle,
      //     statut: true,

      //   })
      //   .then((resp) => {
      //     if (resp.status === 200) {
      //       visible.value = false;
      //       message.success("Enregistrement reussi");
      //     } else {
      //       message.error("impossible!!");
      //     }
      //   });
    };
    const formState = reactive({
      nom: "",
      idZoneFk: "",
      lat: "",
      lon: ""

    });


    const options = ref([{
      value: 'jack',
      label: 'Jack',
    }, {
      value: 'lucy',
      label: 'Lucy',
    }, {
      value: 'tom',
      label: 'Tom',
    },{
      value: 'indenie',
      label: 'Indenie',
    }]);

    const handleChange = value => {
      console.log(`selected ${value}`);

      fetch(`https://nominatim.openstreetmap.org/?addressdetails=1&q=${value}&countrycodes=ci&format=json`)
      .then(response => response.json())
      .then(res => {
       
          res.forEach(element => {
           console.log("element")
           console.log(element.lat)
           options.value.push({
             value: element.display_name,
             label: element.display_name
           })
         });
          
      })
    };

    const choice = value => {
      console.log(`selected ${value}`);

      // fetch(`https://nominatim.openstreetmap.org/?addressdetails=1&q=${value}&countrycodes=ci&format=json`)
      // .then(response => response.json())
      // .then(res => {
       
      //     res.forEach(element => {
      //      console.log("element")
      //      console.log(element.display_name)
      //      options.value.push({
      //        value: element.display_name,
      //        label: element.display_name
      //      })
      //    });
          
      // })
    };

    const handleBlur = () => {
      console.log('blur');
    };

    const handleFocus = () => {
      console.log('focus');
    };

    // const filterOption = (input, option) => {
    //   return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    // };

    return {
      userName,
      visible,
      showModal,
      onSubmit,
      formState,
      filters: [],
      searchQuery: "",
      dataZone: [],



      value: ref(undefined),
      // filterOption,
      handleBlur,
      handleFocus,
      handleChange,
      options,
      choice

    };
  },
  mounted() {
    console.log("Component mounted");

    fetch("http://192.168.1.8:4001/api/zones")
      .then(response => response.json())
      .then(res => {
        this.dataZone = res.data
        console.log(res.data)
        // console.log(this.dataZoneParent[0].zoneparent)
      })

  },
  methods: {

    onChange() {
      this.$emit("search", this.searchText);
    },



  },
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




