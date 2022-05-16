<template>
  <div>
    <a-radio-group v-model:value="mode" :style="{ marginBottom: '8px' }">
      <a-radio-button value="top">Horizontal</a-radio-button>
      <a-radio-button value="left">Vertical</a-radio-button>
    </a-radio-group>
    <a-tabs
      v-model:activeKey="activeKey"
      :tab-position="mode"

      @tabScroll="callback"
    >
     <a-tab-pane key="1" tab="Liste des demandes"><table-gestion-demande/></a-tab-pane>
    <a-tab-pane key="2" tab="En cour de traitement"><slot></slot></a-tab-pane>
    <a-tab-pane key="3" tab="Demandes Validées"><slot></slot></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import TableGestionDemande from './TableGestionDemande.vue';
export default defineComponent({
  components: { TableGestionDemande },
  setup() {
    const mode = ref('top');
    const activeKey = ref(1);

    const callback = val => {
      console.log(val);
    };

    return {
      mode,
      callback,
      activeKey,
    };
  },

});
</script>