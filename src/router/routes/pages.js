export default [
    {
        path: '/login',
        name: 'auth-login',
        component: () => import('../../views/LoginView.vue'),
        meta: {
            title: 'Login',
            layout: 'simplelayout',
        }
    },
    {
        path: '/accueil',
        name: 'accueil',
        component: () => import('../../views/dashboard/AccueilView.vue'),
       
    },
]