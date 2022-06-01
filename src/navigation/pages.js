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
      // route: '/tableau-de-bord/liste-zone'
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
      header: 'Utilisateur et permissions',
    },
    

  ]
  