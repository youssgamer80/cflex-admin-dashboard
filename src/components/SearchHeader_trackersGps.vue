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

        <!-- Début  Modal Ajout Type Transport-->
        <a-col :span="8" :offset="6">
          <a-button type="primary" @click="showModal"> Ajouter </a-button>

          <a-modal
            v-model:visible="visible"
            title="Ajout de trackers TrackerGps"
            @ok="onSubmit"
          >
            <a-form
              name="basic"
              autocomplete="off"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              @finish="onFinish"
            >
              <a-form-item label="Libelle" :rules="[{ required: true }]">
                <a-input v-model:value="formState.libelle" />
              </a-form-item>

              <!-- Type Transport -->
              <a-form-item label="Vehicule">
                <a-select
                  v-model:value="formState.idVehiculeFk"
                  placeholder="please select your type transport"
                >
                  <a-select-option
                    v-for="item in datavehicule"
                    v-bind:key="item.id"
                    :value="item.id"
                    >{{ item.marque }}
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
import { defineComponent, ref, reactive } from "vue";
import axios from "axios";
import { message } from "ant-design-vue";

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
      console.log("LIBELLE :" + formState.libelle);
      console.log("IDVEHICULE :" + formState.idVehiculeFk);
      // console.log("Marque :" + formState.modele);
      // console.log("Marque :" + formState.carteGrise);
      // console.log("ZONE :" + formState.idZoneFk);
      // console.log("ZONE :" + formState.idTypeTransportFk);

      return axios
        .post("http://192.168.252.206:4000/api/Trackergpss/addTrackergps", {
          libelle: formState.libelle,
          idVehiculeFk: formState.idVehiculeFk,
        })
        .then((resp) => {
          console.log(resp.data.data);
          if (resp.status === 200) {
            if (resp.data.data !== null) {
              console.log(resp.data.length);
              visible.value = false;
              message.success("Enregistrement reussi");
            } else {
              message.info("Ce vehicule a deja un tracker");
            }
          } else {
            console.log(resp);
            message.error("impossible!!");
          }
        });
    };
    const formState = reactive({
      libelle: "",
      idVehiculeFk: "",
    });

    let options = ref([]);
    let option = [];

    // let options = [];

    const choice = (value) => {
      console.log(option);
      formState.nom = value;
      option.forEach((element) => {
        if (formState.nom == element.label) {
          (formState.lat = element.value.lat),
            (formState.lon = element.value.lon);
        }
      });
      console.log(
        "Nom de l'element choisi " +
          formState.nom +
          " La latitude :" +
          formState.lat +
          " La longitude :" +
          formState.lon
      );
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
      datavehicule: [],

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
    fetch("http://192.168.252.206:4000/vehicule/list")
      .then((response) => response.json())
      .then((res) => {
        this.datavehicule = res.data.vehicule;
        console.log(this.datavehicule);
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




