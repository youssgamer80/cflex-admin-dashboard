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
          route: '/tableau-de-bord/liste-zone',
        },
        
        {
          title: 'Liste des types de zone',
          route: '/tableau-de-bord/type-zone',
        },
       
      ],
    },
    {
      title:"Point d'arrêt",
      icon:'FiletextIcon',
      route: '/tableau-de-bord/liste-pointarret'
    },
    {
      title:"Ligne",
      icon:"FiletextIcon",
      route:'/tableau-de-bord/liste-ligne'
    },
    {
      title:"Mode de Deplacement",
      icon:"FiletextIcon",
      route:"/tableau-de-bord/liste-mode-deplacement"
    },
    {
      header: 'Utilisateur et permissions',
    },
    

  ]
  