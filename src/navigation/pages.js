export default [
    {
      header: 'Type vehicule & demandes',
    },
    {
      title: 'Email',
      route: 'apps-email',
      icon: 'MailIcon',
    },
    {
      title: 'Demandes',
      icon: 'FileTextIcon',
      children: [
        {
          title: 'Liste des demandes',
          route: '/tableau-de-bord/liste-demandes/',
        },
        {
          title: 'Demande annulée',
          route: '/tableau-de-bord/demande-annulee/',
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
        {
          title: 'supprimer un type de transport',
          route: '/tableau-de-bord/supprimer-type-transport/',
        },
       
      ],
    },
  ]
  