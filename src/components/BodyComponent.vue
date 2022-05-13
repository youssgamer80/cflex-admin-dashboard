<template>
    <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>List</a-breadcrumb-item>
            <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' ,minHeight: windowHeight}">
            <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
    </a-layout>

</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'BodyComponent',
      data() {
    return {
      windowHeight: window.innerHeight*0.8 + 'px',
      success: false
    }
  },
  mounted() {
    window.onresize = () => {
      this.windowHeight =  window.innerHeight*0.8 + 'px'
    }
   
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