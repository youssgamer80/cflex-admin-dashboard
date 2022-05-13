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
          route: 'liste-demandes',
        },
        {
          title: 'Demande annulée',
          route: 'demande-annulee',
        },
       
      ],
    },
   
    {
      title: 'Type Transport',
      icon: 'FileTextIcon',
      children: [
        {
          title: 'Liste des types de transport',
          route: 'liste-type-transport',
        },
        {
          title: 'supprimer un type de transport',
          route: 'supprimer-type-transport',
        },
       
      ],
    },
  ]
  