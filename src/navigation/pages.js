export default [
  {
    header: 'Type vehicule & demandes',
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
    header: 'proprietaire',
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
    children: [

      {
        title: "Liste des Lignes",
        icon: 'FileTextIcon',
        route: '/tableau-de-bord/liste-ligne'
      },
    ]

  },
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



]
