// ** Icons Import
import { PieChart, Circle, User } from 'react-feather'

export default [
    {
        header: 'Administration'
    },
    {
        id: 'web-user-admin',
        title: 'Utilisateurs web',
        icon: <User size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/admin/web-user-admin'
    }
]
