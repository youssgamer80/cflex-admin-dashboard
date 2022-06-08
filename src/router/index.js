import { createRouter, createWebHistory } from 'vue-router'
import pages from './routes/pages'
import ListeTypeTransport from '../views/typetransport/ListeTypeTransport.vue'
import ListeTypeZone from '../views/typezone/ListeTypeZone.vue'
import ListeZone from '../views/zone/ListeZone.vue'
import ListePointArret from '../views/pointarret/ListePointArret.vue'
import UneDemande from '../views/demandes/UneDemande.vue'
import DetailDemande from '../views/demandes/DetailDemande.vue'
import VehiculeView from '../views/vehicules/VehiculeView.vue'
import AjoutVehicule from '../views/vehicules/AjoutVehicule.vue'
import AjoutTypeTransport from '../views/typetransport/AjoutTypeTransport.vue'
import ListeLigne from '../views/ligne/ListeLigne.vue'
import ListeModeDeplacement from '../views/mode_deplacement/ListeModeDeplacement.vue'
//import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
//import { canNavigate } from '@/acl/routeProtection'





// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)



const routes = [
  { path: '/', redirect: { name: 'accueil' } },
  ...pages,
  { path: '/tableau-de-bord/liste-type-transport', name: 'liste-type-transport', component: ListeTypeTransport },
  


  { path: '/tableau-de-bord/liste-demandes', name: 'liste-demandes', component: UneDemande },
  { path: '/tableau-de-bord/details-demandes', name: 'details-demandes', component: DetailDemande },
  { path: '/tableau-de-bord/vehicules', name: 'vehicule', component: VehiculeView },
  { path: '/tableau-de-bord/ajout-vehicule', name: 'ajout-vehicule', component: AjoutVehicule },
  { path: '/tableau-de-bord/type-transport', name: 'type-transport', component: AjoutTypeTransport },
  { path: '/tableau-de-bord/liste-zone', name: 'liste-zones', component: ListeZone },
  { path: '/tableau-de-bord/type-zone', name: 'type-zone', component: ListeTypeZone },
  { path: '/tableau-de-bord/liste-pointarret', name: 'liste-pointsarret', component: ListePointArret },
  { path: '/tableau-de-bord/liste-ligne', name: 'liste-ligne', component: ListeLigne },
  { path: '/tableau-de-bord/liste-mode-deplacement', name: 'liste-mode-deplacement', component: ListeModeDeplacement },


 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach(async (to, _,next) => {
//   const isLoggedIn = isUserLoggedIn()
  
 

//   if (!canNavigate(to)) {
//     // Redirect to login if not logged in
//     if (
//       // make sure the user is authenticated
//       !isLoggedIn &&
//       // ❗️ Avoid an infinite redirect
//       to.name !== 'auth-login'
//     ) {
//       // redirect the user to the login page
//       return next({ name: 'auth-login' })
//     }

//     // If logged in => not authorized
//     return next({ name: 'misc-not-authorized' })
//   }

//   if (to.meta.redirectIfLoggedIn && isLoggedIn) {
//     const userData = getUserData()
//     next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
//   }
// })

export default router
