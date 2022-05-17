<template>
<StatistiquesComponent/>
</template>
<script>
import { defineComponent } from "vue";
import StatistiquesComponent from "../../components/statistiques/StatistiquesComponent.vue";
export default defineComponent({
  name: "AccueilView",
  components: {
    StatistiquesComponent,
  },
  
  
});
</script>
