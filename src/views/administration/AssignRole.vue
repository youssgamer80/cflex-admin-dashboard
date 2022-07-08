<template>


<a-card :bordered="false" style="margin: 10px 0" id="macarte">
    <a-typography-title :level="5">Role</a-typography-title>
    <div class="components-input-demo-presuffix">
      <!-- Début Champ de recherche : DEBUT-->
      <a-row>
        <a-col :span="8">
          <!-- <a-input-search type="text" placeholder="Rechercher" enter-button @change="onChange" @keyup="onChange"
            v-model:value="searchText" /> -->

                  <a-select v-model:value="Idroles" tree-data-simple-mode style="width: 100%" :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" :tree-data="treeData" @change="modifAssignRole"
                                    placeholder="liste role" :load-data="onLoadData"
                                   >
                                    <!--liste des roles -->
                                    <a-select-option v-for="utilisateur in roles" v-bind:key="utilisateur.id"
                                        :value="utilisateur.id">{{
                                                utilisateur.role
                                        }}
                                    </a-select-option>
                
                
                                     </a-select>
          <br />
        </a-col>




          </a-row>


          


          


   <a-table :style="{
        padding: '21px',
        background: '#fff',
        textAlign: 'center'   
    }" :bordered="false" :columns="columns" :row-key="keyBornes" :data-source="dataSource" :pagination="pagination"
            :loading="loading" @change="handleTableChange">
            <template #bodyCell="{ column }">
           <template v-if="column.dataIndex === 'id'"><a-select name="" id="" disabled="disabled"></a-select></template>
        
      


        </template>




</a-table>
</div>
</a-card>

</template>

<script>


import { defineComponent } from "vue";


// import axios from "axios";


const columns = [

    {
        title: "entete",
        dataIndex: "id",
        sorter: true,
    },
    {
        title: "ajouter",
        dataIndex: "libelle",
        sorter: true,
    },
    {
        title: "modifier",
        dataIndex: "idPointArretFk",
    },

    {
        title: "supprimer",
        dataIndex: "action",
    },
    
];


export default defineComponent({

    components: {

        
    },


     data() {
        return {

            ListeUtilisateur: []
        }

    },
      methods: {

        
    },
      setup() {

        const modifAssignRole = async () => {



        };


       

  


       
      

       

 


     



        return {

          
         
            columns,
   
            modifAssignRole,
          
           
            roles: [],
   
         

        };
    },






      mounted() {




        fetch("http://192.168.252.123:4002/api/roles")
            .then(response => response.json())
            .then(res => {
                this.roles = res.data;

            });




    },

});
</script>

<style>

 #macarte {
     box-shadow: 5px 8px 24px 5px rgba(208, 216, 243, 0.6);
 }

</style>