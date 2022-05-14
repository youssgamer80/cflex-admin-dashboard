<template>
 <a-menu-item v-for="(child, i) in items.children" :key="i + 1"> {{child.title}}</a-menu-item>
</template>

<script>
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '../navigation/utils';
import { provide, ref } from 'vue'
// import VerticalNavMenuGroup from './VerticalNavMenuGroup.vue';
// import VerticalNavMenuSimpleItem from './VerticaINavMenuSimpleItem.vue';
// import VerticalNavMenuHeader from './VerticalNavMenuHeader.vue';
export default {
  name: 'VerticalNavMenuItems',
  components: {
  //  VerticalNavMenuHeader,
  //  VerticalNavMenuGroup,
  //  VerticalNavMenuSimpleItem,
  },
  
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  setup() {
    provide('openGroups', ref([]))

    return {
      resolveNavItemComponent,
    }
  },
}
</script>
