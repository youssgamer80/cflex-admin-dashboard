export default [
    {
        path: '/login',
        name: 'auth-login',
        component: () => import('../../views/LoginView.vue'),
        meta: {
            title: 'auth-login',
            layout: 'simplelayout',
        }
    },
    {
        path: '/accueil',
        name: 'accueil',
        component: () => import('../../views/dashboard/AccueilView.vue'),
       
    },
]