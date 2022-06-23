import { createRouter, createWebHistory } from 'vue-router'
import pages from './routes/pages'
import ListeTypeTransport from '../views/typetransport/ListeTypeTransport.vue'
import ListeTypeZone from '../views/typezone/ListeTypeZone.vue'
import ListeZone from '../views/zone/ListeZone.vue'
import ListePointArret from '../views/pointarret/ListePointArret.vue'
import UneDemande from '../views/demandes/UneDemande.vue'
import DetailDemande from '../views/demandes/DetailDemande.vue'
import AjoutTypeTransport from '../views/typetransport/AjoutTypeTransport.vue'
// import AjoutTypeTransport from '../views/typetransport/AjoutTypeTransport.vue'
import ListeLigne from '../views/ligne/ListeLigne.vue'
import ListeModeDeplacement from '../views/mode_deplacement/ListeModeDeplacement.vue'
import CarteMap_PointArret from '../views/carteMap/CarteMap_PointArret.vue'
import ListeProprietaire from '../views/proprietaire/ListeProprietaire.vue'
import ListeVehicule from '../views/vehicules/ListeVehicule.vue'
import ListeTrackersGps from '../views/trackers_gps/ListeTrackersGps.vue'
import ListeBorne from '../views/borne/ListeBorne.vue'
// import AjoutBorne from '../views/borne/AjoutBorne.vue'
import ListeTroncon from '../views/tronçon/ListeTroncon.vue'
import LignePointArretMap from '../views/LignePointArretMap/LignePointArretMap.vue'
import ListeClientC from '../views/clientele/ListeClient.vue'
import Listeutilisateur from '../views/administration/ListeUtilisateur.vue'
import Role from '../views/administration/listeRole.vue'
//import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
//import { canNavigate } from '@/acl/routeProtection'





// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)



const routes = [
  { path: '/', redirect: { name: 'accueil' } },
  ...pages,
  { path: '/tableau-de-bord/liste-type-transport', name: 'liste-type-transport', component: ListeTypeTransport },


  { path: '/tableau-de-bord/liste-proprietaires', name: 'liste-proprietaire', component: ListeProprietaire },
  { path: '/tableau-de-bord/liste-demandes', name: 'liste-demandes', component: UneDemande },
  { path: '/tableau-de-bord/details-demandes/:id', name: 'details-demandes', component: DetailDemande },

  { path: '/tableau-de-bord/liste-trackers_gps', name: 'liste-trackers_gps', component: ListeTrackersGps },
  { path: '/tableau-de-bord/liste-borne', name: 'liste-borne', component: ListeBorne },
  // { path: '/tableau-de-bord/ajout-borne', name: 'liste-proprietaire', component: AjoutBorne },
  { path: '/tableau-de-bord/liste-troncon', name: 'liste-troncon', component: ListeTroncon},
 
  { path: '/tableau-de-bord/liste-vehicules', name: 'liste-vehicules', component: ListeVehicule},
  { path: '/tableau-de-bord/type-transport', name: 'type-transport', component: AjoutTypeTransport },
  { path: '/tableau-de-bord/liste-zone', name: 'liste-zones', component: ListeZone },
  { path: '/tableau-de-bord/type-zone', name: 'type-zone', component: ListeTypeZone },
  { path: '/tableau-de-bord/liste-pointarret', name: 'liste-pointsarret', component: ListePointArret },
  { path: '/tableau-de-bord/liste-ligne', name: 'liste-ligne', component: ListeLigne },
  { path: '/tableau-de-bord/liste-mode-deplacement', name: 'liste-mode-deplacement', component: ListeModeDeplacement },
  { path: '/tableau-de-bord/afficahgeCarteMap', name: 'affichageCarteMap', component: CarteMap_PointArret },
  { path: '/tableau-de-bord/lignepointarret/:data', name: 'liasionLignePointAret', component: LignePointArretMap },
  { path: '/tableau-de-bord/liste-client', name: 'listeclient', component: ListeClientC },
  { path: '/tableau-de-bord/liste-utilisateur', name: 'listeUtilisateur', component: Listeutilisateur },
  { path: '/tableau-de-bord/liste-role', name: 'listeRole', component: Role }




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
