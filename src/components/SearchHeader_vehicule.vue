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
              <a-form-item label="Marque" :rules="[{ required: true }]">
                <a-input v-model:value="formState.marque" />
              </a-form-item>
              <a-form-item label="Modele" :rules="[{ required: true }]">
                <a-input v-model:value="formState.modele" />
              </a-form-item>
              <a-form-item
                label="Immatriculation"
                :rules="[{ required: true }]"
              >
                <a-input v-model:value="formState.immatriculation" />
              </a-form-item>
              <!-- Type Transport -->
              <a-form-item label="Type Transport">
                <a-select
                  v-model:value="formState.idTypeTransportFk"
                  placeholder="please select your type transport"
                >
                  <a-select-option
                    v-for="item in dataTypeTransport"
                    v-bind:key="item.id"
                    :value="item.id"
                    >{{ item.libelleTypeTransport }}
                  </a-select-option>
                </a-select>
              </a-form-item>
               <!-- Proprietaire -->
              <a-form-item label="Proprietaire">
                <a-select
                  v-model:value="formState.proprietaire"
                  placeholder="please select your proprietaire"
                >
                  <a-select-option
                    v-for="item in dataProprietaire"
                    v-bind:key="item.id"
                    :value="item.id"
                    >{{ item.nom }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="Nombre de place"
                :rules="[{ required: true }]"
              >
                <a-input v-model:value="formState.nbPlace" />
              </a-form-item>
              <a-form-item label="Carte grise" :rules="[{ required: true }]">
                <a-input v-model:value="formState.carteGrise" />
              </a-form-item>
              
              <!-- zone -->
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
      console.log("Immatriculation :" + formState.immatriculation);
      console.log("Marque :" + formState.marque);
      console.log("Marque :" + formState.modele);
      console.log("Marque :" + formState.carteGrise);
      console.log("ZONE :" + formState.idZoneFk);
      console.log("ZONE :" + formState.idTypeTransportFk);

      return axios
        .post("http://192.168.252.206:4000/vehicule/save", {
          immatriculation: formState.immatriculation,
          marque: formState.marque,
          modele: formState.modele,
          carteGrise: formState.carteGrise,
          nbPlace: formState.nbPlace,
          idZoneFk: {
            id: formState.idZoneFk,
          },
          proprietaire: {
            id: formState.proprietaire,
          },
          idTypeTransportFk: {
            id: formState.idTypeTransportFk,
          },
          statut: true,
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
      idZoneFk: "",
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
      dataZone: [],
      dataProprietaire: [],
      dataTypeTransport: [],

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

    fetch("http://192.168.252.206:4001/api/zones")
      .then((response) => response.json())
      .then((res) => {
        this.dataZone = res.data;
        // console.log(res.data)
        // console.log(this.dataZoneParent[0].zoneparent)
      });

    fetch("http://192.168.252.206:4000/proprietaire/list")
      .then((response) => response.json())
      .then((res) => {
        this.dataProprietaire = res.data.proprietaire;
        // console.log(res.data)
        // console.log(this.dataZoneParent[0].zoneparent)
      });
    fetch("http://192.168.252.206:4000/api/typetransport")
      .then((response) => response.json())
      .then((res) => {
        this.dataTypeTransport = res.data;
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




