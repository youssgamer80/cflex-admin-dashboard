import { createRouter, createWebHistory } from 'vue-router'
import pages from './routes/pages'
import ListeTypeTransport from '../views/typetransport/ListeTypeTransport.vue'
import UneDemande from '../views/demandes/UneDemande.vue'
import VehiculeView from '../views/vehicules/VehiculeView.vue'
// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)



const routes = [
  { path: '/', redirect: { name: 'accueil' } },
  ...pages,
  { path: '/tableau-de-bord/liste-type-transport', name: 'liste-type-transport', component: ListeTypeTransport },


  { path: '/tableau-de-bord/liste-demandes', name: 'liste-demandes', component: UneDemande },
  { path: '/vehicules', name: 'vehicule', component: VehiculeView },

 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
