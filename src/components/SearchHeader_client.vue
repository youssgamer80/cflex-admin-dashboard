<template>
    <a-card :bordered="false" style="margin: 10px 0" id="macarte">
        <a-typography-title :level="5">Recherche des clients usagers</a-typography-title>
        <div class="components-input-demo-presuffix">
            <!-- Début Champ de recherche proprietaire-->
            <a-row>
                <a-col :span="8">
                    <a-input-search type="text" placeholder="Rechercher" enter-button @change="onChange"
                        @keyup="onChange" v-model:value="searchText" />
                    <br />
                    <!-- Balise  pour lister l'ensemble des proprietaire -->
                    <div v-for="(data, index) in filters" :key="data.id">
                        {{ index }}. {{ filter.nom }}
                    </div>
                    <!-- Balise  pour lister l'ensemble des proprietaire -->
                </a-col>
                <!-- Fin  Champ de recherche proprietaire-->

            </a-row>
        </div>
    </a-card>
</template>


<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "SearchHeader",
    components: {},
    data() {
        return {
            searchText: '',
        };
    },

    setup() {

        const visible = ref(false);

        //Consomation de l'api pour enregiqtrer un type de transport (ok)




        return {

            visible,


            searchQuery: "",
        };

    },


    methods: {
        onChange() {
            this.$emit("rechercheCl", this.searchText);
        },
    },

});
</script>




