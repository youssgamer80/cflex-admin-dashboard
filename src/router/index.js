import { createRouter, createWebHistory } from 'vue-router'
import pages from './routes/pages'
import ListeTypeTransport from '../views/typetransport/ListeTypeTransport.vue'
import UneDemande from '../views/demandes/UneDemande.vue'
import VehiculeView from '../views/vehicules/VehiculeView.vue'
import AjoutVehicule from '../views/vehicules/AjoutVehicule.vue'
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
  { path: '/tableau-de-bord/vehicules', name: 'vehicule', component: VehiculeView },
  { path: '/tableau-de-bord/ajout-vehicule', name: 'ajout-vehicule', component: AjoutVehicule },
  

 
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
