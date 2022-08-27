// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'


const PointArret = lazy(() => import('../../views/zone-point-arret/point-arret/list'))
const PointArretView = lazy(() => import('../../views/zone-point-arret/point-arret/view'))
const Zone = lazy(() => import('../../views/zone-point-arret/zone'))


const AppRoutes = [

    {
        element: <PointArret />,
        path: '/apps/zone-point-arret/point-arret/list'
    },
    {
        path: '/apps/zone-point-arret/point-arret/view',
        element: <Navigate to='/apps/zone-point-arret/point-arret/view/1' />
    },
    {
        element: <PointArretView />,
        path: '/apps/zone-point-arret/point-arret/view/:id'
    },
    {
        element: <Zone />,
        path: '/apps/zone-point-arret/zone'
    }
]

export default AppRoutes
