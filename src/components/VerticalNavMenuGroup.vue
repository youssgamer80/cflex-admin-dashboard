<template>
<a-sub-menu :key="item.title">
 <template #icon>
<CarOutlined />
</template>
<template #title>{{item.title}}</template>

<a-menu-item-group key="g1">
<template #icon>
<QqOutlined />
</template>
<a-menu-item v-for="(child, i) in item.children" :key="item.title+i">  <router-link :to="child.route">{{child.title}}</router-link></a-menu-item>
</a-menu-item-group>
</a-sub-menu>
</template>

<script>
import { CarOutlined} from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VerticalNavMenuGroup',
  components: {
CarOutlined,

},

  props: {
    item: {
      type: Object,
      required: true,
    },
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