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
          <a-modal v-model:visible="visible" width="500px" title="Ajouter zone" @ok="onSubmit">

            <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">

              <a-form-item label="Libelle" :rules="[{ required: true }]">
                <a-input v-model:value="formState.libelle" />
              </a-form-item>


              <a-form-item label="Type de zone" :rules="[{ required: true }]">

                <a-space>
                  <a-select ref="select" v-model:value="selecttypezone" style="width: 120px"
                    @change="handleChangeTypezone">
                    <a-select-option v-for="item in dataTypeZone" v-bind:key="item.id" :value="item.id">{{ item.libelle
                    }}
                    </a-select-option>
                    <!-- <a-select-option value="zone2">Lucy</a-select-option>
                  <a-select-option value="zone3">yiminghe</a-select-option> -->
                  </a-select>

                </a-space>

              </a-form-item>

              <a-form-item label="Zone parent" :rules="[{ required: true }]">

                <a-space>
                  <a-select ref="select" v-model:value="selectzoneparent" style="width: 120px"
                    @change="handleChangeZoneparent">
                    <a-select-option v-for="item in dataZoneParent" v-bind:key="item.id" :value="item.id">{{
                        item.zoneparent
                    }}
                    </a-select-option>

                  </a-select>

                </a-space>
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
import { message } from 'ant-design-vue';


export default defineComponent({
  name: "SearchHeader",
  components: {},

  data() {
    return {
      searchText: "",
    };
  },

  setup() {
    let selectzoneparent
    let selecttypezone
    const searchQuery = ref('')
    const handleChangeZoneparent = value => {
      selectzoneparent = value;
      console.log(`selected ${selectzoneparent}`);
    };


 

    const handleChangeTypezone = value => {
      selecttypezone = value;
      console.log(`selected ${selecttypezone}`);
    };



    const userName = ref("");
    const visible = ref(false);
    const showModal = () => { visible.value = true };
    //fonction pour enregiqtrer un type de tt
    const onSubmit = async () => {
      visible.value = true;

      const resp = await axios
        .post("http://192.168.252.203:4001/api/zones/addZone", {
          libelle: formState.libelle,

          idTypeZoneFk: {
            // "id": 2
            id: selecttypezone
          },
          idZoneparentFk: {
            // "id": 3
            id: selectzoneparent
          },
          statut: true
        });
      if (resp.status === 200) {
        visible.value = false;
        message.success("Ajout reussi");
        formState.libelle = ""
        selecttypezone = 0
        selectzoneparent = 0
      } else {
        message.error("impossible!!");
      }
    };
    const formState = reactive({
      libelle: "",
      statut: "",
      // idTypeZoneFk: "",
      // idZoneparentFk: ""
    });

    return {
      selectzoneparent,
      selecttypezone,
      userName,
      visible,
      showModal,
      onSubmit,
      formState,
      filters: [],
      dataTypeZone: [],
      dataZoneParent: [],
      idTypeZoneFk: "",
      idZoneparentFk: "",
      handleChangeZoneparent,
      handleChangeTypezone,
      // onSearch,
      searchQuery


    };
  },
  mounted() {
    console.log("Component mounted");

    fetch("http://192.168.252.203:4001/api/zoneparents")
      .then(response => response.json())
      .then(res => {
        this.dataZoneParent = res.data

          console.log("ZONE PARENT")
        console.log(this.dataZoneParent)
        // console.log(this.dataZoneParent[0].zoneparent)
      })

    fetch("http://192.168.252.203:4001/api/typezone")
      .then(response => response.json())
      .then(res => {
        this.dataTypeZone = res.data

        console.log("TYPE ZONE")
        console.log(this.dataTypeZone)
      })
      .catch(err=>{
        console.log(err)
      })
  },
  methods: {
    


    onChange() {
      this.$emit("search", this.searchText);
    },


  },
  
});
</script>




