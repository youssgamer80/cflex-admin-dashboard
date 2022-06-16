<template>
  <a-card :bordered="false" style="margin: 10px 0" id="macarte">
    <a-typography-title :level="5">Affichage Par Zone</a-typography-title>
    <a-col :span="8">

    
      <a-space>
        <a-select ref="select" v-model:value="formState.id" style="width: 150px" @change="onChange">
          <a-select-option v-for="item in formState.dataCarte" v-bind:key="item.id" :value="item.id">{{
              item.libelle
          }}
          </a-select-option>

        </a-select>

      </a-space>

    </a-col>
  </a-card>
</template>


<script>

import { defineComponent, reactive } from "vue";


export default defineComponent({
  name: "SearchHeader",
  components: {},




  setup() {



    const formState = reactive({
      id: "",
      dataCarte: [],
    });

    return {
      formState,
      



    };
  },

  methods: {

    onChange() {

      console.log("ENFANT :",this.formState.id)
      this.$emit("change", this.formState.id);
    },
  },

  mounted() {
    console.log("Component mounted");

    fetch("http://192.168.252.223:4001/api/zones")
      .then(response => response.json())
      .then(res => {
        this.formState.dataCarte = res.data
        console.log(this.formState.dataCarte)
        // console.log(this.dataZoneParent[0].zoneparent)
      })

  },


});
</script>




