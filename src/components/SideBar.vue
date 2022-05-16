<template>
  <a-layout-sider width="280" style="background: #fff" breakpoint="lg" collapsed-width="0" id="macarte">
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline" :style="{ height: '100%', borderRight: 0 }">


      <a :to="'/'">
        <a-card :style="{
          margin: '0px 0px 10px 0px',
          overflow: 'initial',
          borderRadius: '0px',
          boxShadow: '8px 8px 24px 8px rgba(208, 216, 243, 0.7)',
        }">
          <img src="./../assets/logo.png" alt="Paris" class="center" />
        </a-card>
      </a>

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

#macarte {
  box-shadow: 5px 0px 24px 5px rgba(208, 216, 243, 0.6);

}

.log {
  background: url('../assets/logo.png');
}

img {
  height: 25px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>