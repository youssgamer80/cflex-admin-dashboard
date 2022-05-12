<template>
 <component
      :is="resolveNavItemComponent(item)"
      v-for="item in items"
      :key="item.header || item.title"
      :item="item"
    />
</template>

<script>
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '../navigation/utils';
import { provide, ref } from 'vue'
import VerticalNavMenuGroup from './VerticalNavMenuGroup.vue';
import VerticalNavMenuSimpleItem from './VerticaINavMenuSimpleItem.vue';
import VerticalNavMenuHeader from './VerticalNavMenuHeader.vue';
export default {
  components: {
   VerticalNavMenuHeader,
   VerticalNavMenuGroup,
   VerticalNavMenuSimpleItem,
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
