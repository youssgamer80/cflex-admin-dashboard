import * as Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.less'

import 'bootstrap/dist/css/bootstrap.min.css'

// import VueLayers from 'vuelayers'
// import 'vuelayers/dist/vuelayers.css' 

//import { initAPIClient } from './services/APIClient'
//initAPIClient(store)
  const app = Vue.createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  // .use(VueLayers)
  .use(VueAxios, axios)
app.mount('#app')

