<template>
<a-card id = "macarte">
<a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Libelle">
      <a-input v-model:value="formState.name" />
    </a-form-item>
  
    <a-form-item label="Statut">
      <a-input v-model:value="formState.desc" type="textarea" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Créer</a-button>
      <a-button style="margin-left: 10px">Annuler</a-button>
    </a-form-item>
  </a-form>
</a-card>
</template>
<script>
import { defineComponent, reactive, toRaw } from 'vue';
export default defineComponent({
  setup() {
    const formState = reactive({
      name: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    });

    const onSubmit = () => {
      console.log('submit!', toRaw(formState));
    };

    return {
      labelCol: {
        style: {
          width: '150px',
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