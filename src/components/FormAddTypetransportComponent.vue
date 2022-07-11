<template>
  <a-card id="macarte">
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="Libelle " :rules="[{ required: true }]">
        <a-input v-model:value="formState.libelle_type_transport" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Créer</a-button>
        <a-button style="margin-left: 10px">Annuler</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
import { defineComponent, reactive } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const formState = reactive({
      libelle_type_transport: "",
      statut: "",
    });

    const onSubmit = () => {
      console.log("showwwwwwwww");
      return axios
        .post("http://192.168.252.206:4001/api/typetransport/addtypetransport", {
          libelleTypeTransport: formState.libelle_type_transport,
          statut: true,
        })
        .then((resp) => {
          console.log(resp.data);
        });
    };

    return {
      labelCol: {
        style: {
          width: "150px",
        },
      },
      wrapperCol: {
        span: 14,
      },
      formState,
      onSubmit,
    };
  },
});
</script>   