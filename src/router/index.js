import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)



const routes = [
  {
    path: '/',
    name: 'DashBoard',
    component: DashBoard
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
