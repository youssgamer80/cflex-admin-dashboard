<template>
  <a-card :bordered="false" style="margin: 10px 0" id="macarte">
    <a-typography-title :level="5">Recherche</a-typography-title>
    <div class="components-input-demo-presuffix">
      <a-row>
        <a-col :span="8">
          <a-input
            v-model:value="userName"
            placeholder="Type transport..."
            style="width: 150%"
          >
          </a-input>
        </a-col>
        <a-col :span="8" :offset="6">
         
          <a-button type="primary">
             <router-link :to="'/tableau-de-bord/type-transport'">
             Ajouter un type de transport
          </router-link>
          </a-button>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>


<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "SearchHeader",
  components: {},

  setup() {
    const userName = ref("");
    return {
      userName,
    };
  },
});
</script>




