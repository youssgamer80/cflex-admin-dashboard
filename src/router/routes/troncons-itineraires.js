// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Troncons = lazy(() => import('../../views/troncons-itineraires/index'))

const AppRoutes = [

    {
        element: <Troncons />,
        path: '/troncons-itineraires/troncons'
    }
]

export default AppRoutes
