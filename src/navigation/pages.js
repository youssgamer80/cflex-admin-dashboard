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
      title: 'Invoice',
      icon: 'FileTextIcon',
      children: [
        {
          title: 'List',
          route: 'apps-invoice-list',
        },
        {
          title: 'Preview',
          route: { name: 'apps-invoice-preview', params: { id: 4987 } },
        },
        {
          title: 'Edit',
          route: { name: 'apps-invoice-edit', params: { id: 4987 } },
        },
        {
          title: 'Add',
          route: { name: 'apps-invoice-add' },
        },
      ],
    },
  ]
  