<template>
    <component v-bind:is="layout">
    <slot />
    </component>
    
</template>

<script>
import DashBoard from './layouts/DashBoard.vue'
import SimpleLayout from './layouts/SampleLayout.vue'
export default {
  computed: {
    // layout () {
    //   return this.$store.getters.layout
    // }
    layout() {
      if (this.$route.meta.layout === 'simplelayout') return 'simple-layout'
      return 'app-layout'
    },
     
  },
  components: {
    'app-layout': DashBoard,
    'simple-layout': SimpleLayout
    // define as many layouts you want for the application
  }
}
</script>