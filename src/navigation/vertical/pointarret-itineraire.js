// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield, MapPin } from 'react-feather'

export default [
    {
        header: 'Points d\'arrets & itineraires'
    },
    {
        id: 'pointarret',
        title: 'Points d\'arrets',
        icon: <MapPin size={20} />,
        navLink: '/apps/user/list'
    },

    {
        id: 'invoiceApp',
        title: 'Invoice',
        icon: <FileText size={20} />,
        children: [
            {
                id: 'invoiceList',
                title: 'List',
                icon: <Circle size={12} />,
                navLink: '/apps/invoice/list'
            },
            {
                id: 'invoicePreview',
                title: 'Preview',
                icon: <Circle size={12} />,
                navLink: '/apps/invoice/preview'
            },
            {
                id: 'invoiceEdit',
                title: 'Edit',
                icon: <Circle size={12} />,
                navLink: '/apps/invoice/edit'
            },
            {
                id: 'invoiceAdd',
                title: 'Add',
                icon: <Circle size={12} />,
                navLink: '/apps/invoice/add'
            }
        ]
    }


]
