// ** Icons Import
import { Mail, MessageSquare, CheckSquare, TrendingUp, StopCircle, FileText, Circle, ShoppingCart, User, Shield, MapPin } from 'react-feather'

export default [
    {
        header: 'Points d\'arrets & zones'
    },
    {
        id: 'zone',
        title: 'Zone',
        icon: <StopCircle size={20} />,
        navLink: '/apps/zone-point-arret/zone'
    },

    // {
    //     id: 'ligne',
    //     title: 'Ligne',
    //     icon: <TrendingUp size={20} />,
    //     navLink: '/apps/ligne/list'
    // },
    {
        id: 'pointarret',
        title: 'Points d\'arrets',
        icon: <MapPin size={20} />,
        navLink: '/apps/zone-point-arret/point-arret/list'
    }
]
