export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('../../views/LoginView.vue'),
        meta: {
            title: 'login',
            layout: 'simplelayout',
        }
    },
    {
        path: '/accueil',
        name: 'accueil',
        component: () => import('../../views/dashboard/AccueilView.vue'),
       
    },
]