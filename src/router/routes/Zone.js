// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'


const Zone = lazy(() => import('../../views/apps/zone/list'))


const AppRoutes = [

    {
        element: <Zone />,
        path: '/apps/zone/list'
    }
]

export default AppRoutes
