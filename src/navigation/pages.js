export default [
  {
    header: 'Demandes & véhicules',
  },
 


  {
    title: 'Demandes',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'Liste des demandes',
        route: '/tableau-de-bord/liste-demandes',
      },

      // {
      //   title: 'Demande annulée',
      //   route: '/tableau-de-bord/demande-annulee',
      // },

    ],
  },
  {
    title: 'Proprietaire',
    children: [
      {
        title: 'Liste des proprietaires',
        icon: 'MailIcon',
        route: '/tableau-de-bord/liste-proprietaires',

      },
    ],

  },
  {
    title: 'Vehicule',
    icon: 'MailIcon',
    children: [
      {
        title: 'Liste des vehicules',
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/liste-vehicule',
      },

    ],
  },
  {
    title: "Tracker Gps",
    children: [

      {
        title: "Liste des tracker gps",
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/liste-trackers_gps'
      },
    ]

  },
 
  {
    header: 'En attente de nommination',
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
        title: 'Liste types point arret',
        icon: 'MailIcon',
        route: '/tableau-de-bord/liste-type-point-arret',

      },
      {
        title: "Affichage sur la carte ",
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/afficahgeCarteMap'
      }
    ]
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
    title: "Tronçon",

    children: [

      {
        title: "Liste des tronçons",
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/liste-troncon'
      },
    ]


  },
  {
    title: "Ligne",
    icon: "FiletextIcon",
    children: [

      {
        title: "Liste des Lignes",
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/liste-ligne'
      },
    ]

  },
  {
    title: "Trajets",

    children: [

      {
        title: "Liste des trajets",
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/liste-trajet'
      },
    ]


  },
  {
    title: 'Itineraire',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'Gerener des Itineraires',
        route: '/tableau-de-bord/generer-itineraire',
      },


    ],
  },
 
  

  // {
  //   header: 'Zone et Type de zone',
  // },
 
  
  
  {
    title: "Mode de Deplacement",
    icon: "FiletextIcon",
    children: [

      {
        title: "Liste des modes de deplacement",
        icon: 'FileTextIcon',
        route: "/tableau-de-bord/liste-mode-deplacement"
      },
    ]
  },
  // {
  //   title: 'Type point arret',
  //   children: [
  //     {
  //       title: 'Liste des points arrets',
  //       icon: 'MailIcon',
  //       route: '/tableau-de-bord/liste-type-point-arret',

  //     },
  //   ],

  // },
 
  
  

  {
    header: 'Utilisateurs et permissions',
  },
  {
    title: "administration",

    children: [

      {
        title: "Liste des utilisateurs",
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/liste-utilisateur',
      },
      {
        title: "Role",
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/liste-role'
      },
    ]
  },
  {
    title: "client usager",
    icon: "FiletextIcon",
    children: [

      {
        title: "Liste des clients usagers",
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/liste-client'
      },
    ]

  },


]
