<template>
<a-menu-item key="1">
      <template #icon>
        <CarOutlined />
      </template>
      Navigation One
    </a-menu-item>
</template>

<script>
import { CarOutlined} from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VerticalNavMenuSimpleItem',
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