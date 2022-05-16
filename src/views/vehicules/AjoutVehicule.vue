<template>
<a-card id = "macarte">
    <a-typography-title :level="4" style="color:#BEBEBE"><car-filled />Formulaire d'ajout vehicule</a-typography-title>

  <div>
    <a-form
      ref="formRef"
      name="advanced_search"
      class="ant-advanced-search-form"
      :model="formState"
      @finish="onFinish"
    >
      <a-row :gutter="24">
        <template v-for="i in 10" :key="i">
          <a-col v-show="expand || i <= 6" :span="8">
            <a-form-item
              :name="`field-${i}`"
              :rules="[{ required: true, message: 'input something' }]"
            >
              <p>{{`field-${i}`}}</p>
              <a-input v-model:value="formState[`field-${i}`]" placeholder="placeholder"></a-input>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" html-type="submit">Search</a-button>
          <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">Clear</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</a-card>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import { CarFilled } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
CarFilled
  },

  setup() {
    const expand = ref(false);
    const formRef = ref();
    const formState = reactive({});

    const onFinish = values => {
      console.log('Received values of form: ', values);
      console.log('formState: ', formState);
    };

    return {
      formRef,
      formState,
      expand,
      onFinish,
    };
  },

});
</script>
<style>
#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
[data-theme='dark'] .ant-advanced-search-form {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #434343;
  padding: 24px;
  border-radius: 2px;
}
[data-theme='dark'] #components-form-demo-advanced-search .search-result-list {
  border: 1px dashed #434343;
  background: rgba(255, 255, 255, 0.04);
}
 #macarte {
  box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
}
</style>
