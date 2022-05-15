<template>
    <a-card :bordered="false" style="margin: 10px 0" id="macarte">
    <a-typography-title :level="5">Recherche</a-typography-title>
        <div class="components-input-demo-presuffix">
    <a-input v-model:value="userName" placeholder="Type transport..." style="width:50%">
      <template #suffix>
        <a-tooltip title="Extra information">
          <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
        </a-tooltip>
      </template>
    </a-input>
  </div>
    </a-card>
</template>


<script>
import {  InfoCircleOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
    name: 'SearchHeader',
  components: {
    InfoCircleOutlined,
  },

  setup() {
    const userName = ref('');
    return {
      userName,
    };
  },

});
</script>




