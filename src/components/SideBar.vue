<template>
  <a-layout-sider width="280" style="background: #fff"        breakpoint="lg"
      collapsed-width="0">
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline"
      :style="{ height: '100%', borderRight: 0 }">
      <VerticalNavMenuItems :items="items" />
    </a-menu>
  </a-layout-sider>
</template>
<script>
import { defineComponent, ref } from 'vue';
import VerticalNavMenuItems from './VerticalNavMenuItems.vue';
import navigationItem from '../navigation/pages';

export default defineComponent({
  name: 'SideBar',
  components: {
    VerticalNavMenuItems,
  },

  data() {
    return {
      items: navigationItem
    }
  },

  setup() {
    return {
      selectedKeys1: ref(['2']),
      selectedKeys2: ref(['1']),
      collapsed: ref(false),
      openKeys: ref(['sub1']),
    };
  },

});
</script>
<style>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>