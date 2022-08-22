// ** React Imports
import { lazy } from 'react'


const PointArret = lazy(() => import('../../views/zone-point-arret/point-arret/list'))


const AppRoutes = [

    {
        element: <PointArret />,
        path: '/apps/zone-point-arret/point-arret/list'
    }
]

export default AppRoutes
