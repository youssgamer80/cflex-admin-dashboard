<template>
    <component v-bind:is="layout">
    <slot />
    </component>
    
</template>

<script>
import AppLayout from './layouts/AppLayout.vue'
import SimpleLayout from './layouts/SampleLayout.vue'
export default {
  computed: {
    layout () {
      return this.$store.getters.layout
    }
  },
  components: {
    'app-layout': AppLayout,
    'simple-layout': SimpleLayout
    // define as many layouts you want for the application
  }
}
</script>