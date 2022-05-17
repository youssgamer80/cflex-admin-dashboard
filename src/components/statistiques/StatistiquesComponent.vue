<template>
  <a-card :bordered="false" style="width: 300px" id="macarte">
      <a-tooltip title="Ant User" placement="top">
        <a-avatar :style="{background: '#87d068',opacity:'0.5'}" :size="64">
            <user-outlined :style="{ fontSize: '16px', color: '#87d068' }"/>
        </a-avatar>
      </a-tooltip>

  </a-card>
</template>

<script>
import { UserOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    UserOutlined,
  },
});
</script>

<style>
</style>


