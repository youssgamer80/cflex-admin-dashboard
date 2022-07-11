<template>
  <a-card :bordered="false" style="margin: 10px 0" id="macarte">
    <a-typography-title :level="5">Recherche</a-typography-title>
    <div class="components-input-demo-presuffix">
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
        </a-col>
        <!-- Fin  Champ de recherche Type Transport-->

        <a-col :span="8" :offset="6">
          <a-button type="primary" @click="showModal"> Ajouter </a-button>

          <a-modal
            v-model:visible="visible"
            title="Ajout de point d'arrêt"
            @ok="onSubmit"
          >
            <a-form
              name="basic"
              autocomplete="off"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              @finish="onFinish"
            >
              <a-form-item label="Nom" name="nom">
                <!-- <a-input v-model:value="formState.nom" /> -->
                <a-select
                  v-model:value="value"
                  show-search
                  placeholder="Cherchez le lieu"
                  style="width: 200px"
                  :options="options"
                  :filter-option="filterOption"
                  @change="choice"
                  @search="handleChange"
                ></a-select>
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
                <a-select
                  v-model:value="formState.idZoneFk"
                  placeholder="please select your zone"
                >
                  <a-select-option
                    v-for="item in dataZone"
                    v-bind:key="item.id"
                    :value="item.id"
                    >{{ item.libelle }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Type Point Arret">
                <a-select
                  v-model:value="formState.idtypePointArret"
                  placeholder="please select your zone"
                >
                  <a-select-option
                    v-for="item in dataTypePointArret"
                    v-bind:key="item.id"
                    :value="item.id"
                    >{{ item.typePointArret }}
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
import { message } from "ant-design-vue";
import { defineComponent, ref, reactive } from "vue";
import axios from "axios";

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
    const showModal = () => {
      visible.value = true;
    };
    //fonction pour enregiqtrer un type de tt

    const onSubmit = () => {
      // let i =0
      console.log("NOM :" + formState.nom);
      console.log("ZONE :" + formState.idZoneFk);
      console.log("TYPE POINT ARRET :" + formState.idtypePointArret);
      console.log("LATITUDE :" + formState.lat);
      console.log("LONGITUDE :" + formState.lon);

<<<<<<< HEAD
      if (formState.nom != "" && formState.idZoneFk != "" && formState.lat != "" && formState.lon != "") {
        return axios
          .post("http://192.168.252.206:4001/api/pointarrets/addPointArret", {
=======
      console.log({
>>>>>>> b8d9cccb4353db939f8d262fd723b08635f4ce57
            nom: formState.nom,
            longitude: formState.lon,
            latitude: formState.lat,
            idZoneFk: {
              id: formState.idZoneFk
            },
            idtypePointArret: {
              id: formState.idtypePointArret
            },
            statut: true,
          })

      if (
        formState.nom != "" &&
        formState.idZoneFk != "" &&
        formState.idtypePointArret != "" &&
        formState.lat != "" &&
        formState.lon != ""
      ) {
        return axios
          .post("http://192.168.252.206:4001/api/pointarrets/addPointArret", {
            nom: formState.nom,
            longitude: formState.lon,
            latitude: formState.lat,
            idZoneFk: {
              id: formState.idZoneFk
            },
            idtypePointArret: {
              id: formState.idtypePointArret
            },
            statut: true,
          })
          .then((resp) => {
            if (resp.status === 200) {
              visible.value = false;
              message.success("Enregistrement reussi");
            } else {
              console.log(resp)
              message.error("impossible!!");
            }
          });
      } else {
        message.info("Veuillez remplir les champs vide svp !");
      }

<<<<<<< HEAD

      // return axios
      //   .post("http://192.168.252.206:4001/api/pointarrets/addPointArret", {
      //     nom: formState.nom,
      //     longitude: formState.lon,
      //     latitude: formState.lat,
      //     idZoneFk: {
      //       id: formState.idZoneFk
      //     },
      //     statut: true,

      //   })
      //   .then((resp) => {
      //     if (resp.status === 200) {
      //       visible.value = false;
      //       message.success("Enregistrement reussit");
      //     } else {
      //       message.error("impossible!!");
      //     }
      //   });
=======
      
>>>>>>> b8d9cccb4353db939f8d262fd723b08635f4ce57
    };

    const formState = reactive({
      nom: "",
      idZoneFk: "",
      lat: "",
      lon: "",
      idtypePointArret:""
    });

<<<<<<< HEAD
    let dataZone=[]

=======
>>>>>>> b8d9cccb4353db939f8d262fd723b08635f4ce57
    let options = ref([]);
    let option = [];

    // let options = [];

<<<<<<< HEAD
    const choice = value => {

=======
    const choice = (value) => {
>>>>>>> b8d9cccb4353db939f8d262fd723b08635f4ce57
      console.log(option);
      formState.nom = value;
      option.forEach((element) => {
        if (formState.nom == element.label) {
<<<<<<< HEAD
          formState.lat = element.value.lat,
            formState.lon = element.value.lon
            formState.city = element.value.city

        }

      })

      console.log("dataZone",dataZone)
      console.log("Nom de l'element choisit "+formState.nom+" La latitude :"+formState.lat+ " La longitude :"+formState.lon+" la zone est "+formState.city, "et l'id de la zone :",formState.id)
=======
          (formState.lat = element.value.lat),
            (formState.lon = element.value.lon);
        }
      });
      console.log(
        "Nom de l'element choisit " +
          formState.nom +
          " La latitude :" +
          formState.lat +
          " La longitude :" +
          formState.lon
      );
>>>>>>> b8d9cccb4353db939f8d262fd723b08635f4ce57
      // options.value.forEach(element =>{
      //   if(formState.lat == element.value){

      //     formState.nom = element.label
      //     console.log("Trouvé "+ formState.nom)
      //   }
      //   // console.log("Chaque element")
      //   // console.log(element.value)
      // })
      // console.log("Le Label "+ formState.nom)
      // console.log("La latitude "+ formState.lat)
    };

    const handleChange = (value) => {
      if (value.length) {
        console.log("vide");
      }
      // console.log(`selected ${value}`);
      options.value = [];
      fetch(
        `https://nominatim.openstreetmap.org/?addressdetails=1&q=${value}&countrycodes=ci&format=json`
      )
        .then((response) => response.json())
        .then((res) => {
          console.log("value", value);
          res.forEach((element) => {
            console.log("LABEL :", element);
            option.push({
              value: {
                lat: element.lat,
                lon: element.lon,
<<<<<<< HEAD
                city: element.address.city
=======
>>>>>>> b8d9cccb4353db939f8d262fd723b08635f4ce57
              },
              label: element.display_name,
            });
          });

          // console.log(option.value)

          option.forEach((element) => {
            options.value.push({
              value: element.label,
              label: element.label,
            });
            console.log("element1");
            console.log(option), console.log("element2");
            console.log(options);
          });
        });
    };

    const filterOption = (input, options) => {
      return options.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    return {
      userName,
      visible,
      showModal,
      onSubmit,
      formState,
      filters: [],
      searchQuery: "",
<<<<<<< HEAD
      dataZone,


=======
      dataZone: [],
      dataTypePointArret: [],
>>>>>>> b8d9cccb4353db939f8d262fd723b08635f4ce57

      // value: ref(undefined),
      filterOption,
      handleChange,
      options,
      option,
      choice,
    };
  },
  mounted() {
    console.log("Component mounted");

<<<<<<< HEAD
    fetch("http://192.168.252.206:4001/api/zones")
      .then(response => response.json())
      .then(res => {
        this.dataZone = res.data
=======
    fetch("http://192.168.252.206:4001/api/zones")
      .then((response) => response.json())
      .then((res) => {
        this.dataZone = res.data;
>>>>>>> b8d9cccb4353db939f8d262fd723b08635f4ce57
        // console.log(res.data)
        // console.log(this.dataZoneParent[0].zoneparent)
      });
    fetch(
      "http://192.168.252.206:4001/api/v1/TypePointArret/getTypePointArrets"
    )
      .then((response) => response.json())
      .then((res) => {
        this.dataTypePointArret = res.data;
        // console.log(res.data)
        // console.log(this.dataZoneParent[0].zoneparent)
      });
  },
  methods: {
    onChange() {
      this.$emit("search", this.searchText);
    },
  },
});
</script>




