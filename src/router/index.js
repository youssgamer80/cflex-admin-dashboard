import { createRouter, createWebHistory } from 'vue-router'
import pages from './routes/pages'
// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)



const routes = [
  { path: '/', redirect: { name: 'accueil' } },
  ...pages,

 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
