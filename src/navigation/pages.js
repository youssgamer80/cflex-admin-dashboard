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
      header: 'Ulisateur et permissions',
    },

  ]
  