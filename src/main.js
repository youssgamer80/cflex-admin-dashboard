import * as Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import store from './store'


// Vue.config.productionTip = false
// new Vue({
//     el: '#app',
//     router,
//     store,
//     components: { App },
//     template: '<App/>'
//   }).use(Antd)


  const app = Vue.createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .use(VueAxios, axios)
app.mount('#app')

