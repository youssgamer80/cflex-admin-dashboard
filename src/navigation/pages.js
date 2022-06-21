export default [
  {
    header: 'Type vehicule & demandes',
  },
  {
    title: 'Vehicule',
    route: '/tableau-de-bord/vehicules',
    icon: 'MailIcon',
  },
  {
    title: 'Proprietaire',
    route: '/tableau-de-bord/liste-proprietaires',
    icon: 'MailIcon',
  },
  {
    title: 'Bornes',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'Gestion des Bornes',
        route: '/tableau-de-bord/liste-borne',
      },


    ],
  },

  {
    title: 'Demandes',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'Liste des demandes',
        route: '/tableau-de-bord/liste-demandes',
      },

      {
        title: 'Demande annulée',
        route: '/tableau-de-bord/demande-annulee',
      },

    ],
  },
  {
    title: 'Type Transport',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'Liste des types de transport',
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/liste-type-transport',
      },

    ],
  },
  {
    header: 'Zone et Type de zone',
  },
  {
    title: 'Zone',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'Liste des zones',
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/liste-zone',
      },

      {
        title: 'Liste des types de zone',
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/type-zone',
      },

    ],
  },
  {
    title: "Point d'arrêt",
    icon: 'FiletextIcon',
    children: [
      {
        title: "Liste des Points d'arrêts",
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/liste-pointarret'
      },
      {
        title: "Affichage sur la carte ",
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/afficahgeCarteMap'
      }
    ]
  },
  {
    title: "Ligne",
    icon: "FiletextIcon",
    route: '/tableau-de-bord/liste-ligne'
  },
  {
    title: "Mode de Deplacement",
    icon: "FiletextIcon",
    route: "/tableau-de-bord/liste-mode-deplacement"
  },
  {
    title: "Tracker Gps",
    
    route: '/tableau-de-bord/liste-trackers_gps'
  },
  {
    title: "Tronçon ",
    
    route: '/tableau-de-bord/liste-troncon'
  },
  {
    header: 'Utilisateur et permissions',
  },


]
