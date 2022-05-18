<template>
<a-layout>
  <a-layout style="padding: 0 24px 24px">
    <PageHeader/>
    <a-layout-content
      :style="{
        margin: '24px 24px 0',
        overflow: 'initial',
        minHeight: windowHeight,
      }"
    >
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Cflex ©2022 Created @claudeKme
    </a-layout-footer>
  </a-layout>
</a-layout>

</template>
<script>
import { defineComponent } from "vue";
import PageHeader from "./PageHeader.vue";
export default defineComponent({
  name: "BodyComponent",
  components: {
    PageHeader
},
  data() {
    return {
      windowHeight: window.innerHeight * 0.8 + "px",
      success: false,
    };
  },
  mounted() {
    window.onresize = () => {
      this.windowHeight = window.innerHeight * 0.8 + "px";
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