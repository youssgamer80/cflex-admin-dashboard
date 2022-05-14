<template>  
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
       <VerticalNavMenuItems :items="items"/>
        </a-menu>
      </a-layout-sider>
</template>
<script>
import { defineComponent, ref } from 'vue';
import VerticalNavMenuItems from './VerticalNavMenuItems.vue';
export default defineComponent({

  name: 'SideBar',
  components: {
    VerticalNavMenuItems,
  },

data() {
  return {
    items: [
    // {
    //   header: 'Type vehicule & demandes',
    // },
    // {
    //   title: 'Email',
    //   route: 'apps-email',
    //   icon: 'MailIcon',
    // },
   
    {
      title: 'Invoice',
      icon: 'FileTextIcon',
      children: [
        {
          title: 'List',
          route: 'apps-invoice-list',
        },
        {
          title: 'Preview',
          route: { name: 'apps-invoice-preview', params: { id: 4987 } },
        },
        {
          title: 'Edit',
          route: { name: 'apps-invoice-edit', params: { id: 4987 } },
        },
        {
          title: 'Add',
          route: { name: 'apps-invoice-add' },
        },
      ],
    },
  ]
 } },
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