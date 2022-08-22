// ** React Imports
import { lazy } from 'react'


const AccountSettings = lazy(() => import('../../views/admin/web-user-admin'))
const AdminRoutes = [
    {
        path: '/admin/web-user-admin',
        element: <AccountSettings />
    }
]

export default AdminRoutes
