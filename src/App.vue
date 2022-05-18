<template>
    <component v-bind:is="layout" id="mainapp">
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
      console.log(this.$route.meta.layout)
      if (this.$route.meta.layout === 'simplelayout') return 'simple-layout'
      else 
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

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,700,900');

html, body {
font-family: 'Poppins', sans-serif;
}
#mainapp {
 font-family: 'Poppins', sans-serif;
}

</style>
