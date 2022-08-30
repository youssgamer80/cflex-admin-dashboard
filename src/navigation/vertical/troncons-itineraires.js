// ** Icons Import
import { CornerRightUp, GitBranch } from 'react-feather'

export default [
    {
        header: 'Tronçons & Itineraires'
    },
    {
        id: 'Troncons',
        title: 'Tronçons',
        icon: <CornerRightUp size={20} />,
        navLink: '/troncons-itineraires/troncons'
    },

    // {
    //     id: 'ligne',
    //     title: 'Ligne',
    //     icon: <TrendingUp size={20} />,
    //     navLink: '/apps/ligne/list'
    // },
    {
        id: 'Itineraires',
        title: 'Itineraires',
        icon: <GitBranch size={20} />,
        navLink: '/apps/troncons-itineraires/itineraires/'
    }
]
