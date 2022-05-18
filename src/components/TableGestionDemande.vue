<template>
  <a-table :columns="columns" :data-source="data" :pagination="true" class="components-table-demo-nested">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a>Publish</a>
      </template>
    </template>
    <template #expandedRowRender>
      <a-table :columns="innerColumns" :data-source="innerData" :pagination="false">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'state'">
            <span>
              <a-badge status="success" />
              Finished
            </span>
          </template>
          <template v-else-if="column.key === 'operation'">
            <span class="table-operation">
              <a>Pause</a>
              <a>Stop</a>
              <a-dropdown>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>Action 1</a-menu-item>
                    <a-menu-item>Action 2</a-menu-item>
                  </a-menu>
                </template>
                <a>
                  More
                  <down-outlined />
                </a>
              </a-dropdown>
            </span>
          </template>
        </template>
      </a-table>
    </template>
  </a-table>
</template>
<script>
import { DownOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import lodash from 'lodash';
import axios from 'axios';
const columns = [{
  title: 'Nom',
  dataIndex: 'nom',
  key: 'nom',
}, {
  title: 'Prénoms',
  dataIndex: 'prenom',
  key: 'prenom',
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email',
}, {
  title: 'Téléphone',
  dataIndex: 'telephone',
  key: 'telephone',
}, {
  title: 'Action',
  key: 'action',
}];
var data = [];
var donnee = [];


// for (let i = 0; i < 6; ++i) {
//   data.push({
//     key: i,
//     name: `Screem ${i + 1}`,
//     platform: 'iOS',
//     version: '10.3.4.5654',
//     upgradeNum: 500,
//     creator: 'Jack',
//     createdAt: '2014-12-24 23:12:00',
//   });
// }
const queryData = async () => {
  await axios.get(
    "http://localhost:8080/api/demandes").then(response => {
      console.log(lodash.chain(response.data.data).groupBy(x => x.idProprietaireFk)
        .map((value, key) => ({ proprietaire: key, data: value }))
        .value())
      donnee = lodash.chain(response.data.data).groupBy(x => x.idProprietaireFk)
        .map((value, key) => ({ proprietaire: key, data: value }))
        .value()

      console.log('donnee', donnee)

      let owners = []
      // initialize vars
      /* let owners = [
        '1' []
      ]; */

      lodash.each(donnee, function (value) {
        lodash.each(value.data, function (value2) {
          let singleOwner = {
            "owner": value2.proprietaire,
            "orders": [value2]
          };
          let ownerWithIndex = {};
          ownerWithIndex[value2.proprietaire.id] = singleOwner;

          console.log('ownerWithIndex', ownerWithIndex);

          console.log('Test Condition', typeof owners[value2.proprietaire.id]);

          if (typeof owners[value2.proprietaire.id] !== "undefined") {
            console.log(owners);
            owners[value2.proprietaire.id].orders.push(value2)
          } else {
            owners[value2.proprietaire.id] = singleOwner;
            console.log('transformation', Object.entries(ownerWithIndex));
            console.log('owners', owners);
          }

        })

      });

      
      for (let i = 1; i < owners.length; i++) {
        var owner = owners[i].owner;
        owner["key"] = `owner${i}`;
        console.log('owners', owners);
        data.push(owner);
        for (let j = 0; j < owners[i].orders.length; j++) {
          var order = owners[i].orders[j];
          order["key"] = `owner${i}`;
          innerData.push(order);
          console.log(`order${i}`, order);
          
        }
        
      }

      // for (let i = 0; i < owners.length; ++i) {
      //   data.push(owners[i].owner);
      //   for (let j = 0; j < owners [i].data.length; ++j) {
      //     if(owners [i].data[j].idProprietaireFk ==owners [i].proprietaire){
      //       innerData.push(owners [i].data[j]);
      //     }
      //   }
      // }
      // for (let i = 0; i < donnee.length; ++i) {
      //   for (let j = 0; j < donnee[i].data.length; ++j) {
      //     if(donnee[i].proprietaire==donnee[i].data[j].proprietaire){
      //       innerData.push(donnee[i].data[j]);
      //     }
      //   }
      // }

      //  for (let i = 0; i < donnee.length; ++i) {
      //   innerData.push(donnee[i].data[0].codeDemande);
      // }
      // donnee.forEach(element => {
      //   element.data.forEach(element1 => {
      //     if (element.proprietaire == element1.id) {
      //       innerData.push(element1);
      //     }
      //   });
      // })



    });
};
queryData();



const innerColumns = [{
  title: 'Code demande',
  dataIndex: 'codeDemande',
  key: 'codeDemande',
}, {
  title: 'Immatriculation',
  dataIndex: 'immatriculation',
  key: 'immatriculation',
}, {
  title: 'Etat',
  key: 'etat',
}, {
  title: 'Date de demande',
  dataIndex: 'date',
  key: 'date',
}, {
  title: 'Action',
  dataIndex: 'action',
  key: 'action',
}];
let innerData = [];



export default defineComponent({
  components: {
    DownOutlined,
  },
  data() {
    return {
      columns,
      data,
      innerColumns,
      innerData,
    };
  },
  // setup() {
  //   queryData();
  //   return {
  //     data,
  //     columns,
  //     innerColumns,
  //     innerData,


  //   };
  // },

});
</script>