import { createApp } from 'vue'
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


  const app = createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
app.mount('#app')

