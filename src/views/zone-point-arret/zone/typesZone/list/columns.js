// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser } from '../store'

import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const isAvatar = false


const renderClient = row => {
  if (isAvatar) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color='light-success'
        content={row.libelle || 'C Flex'}
      />
    )
  }
}

// ** Renders Role Columns
// const renderRole = row => {
//   const roleObj = {
//     Commune: {
//       class: 'text-primary',
//       icon: User
//     },
//     Quartier: {
//       class: 'text-success',
//       icon: Database
//     },
//     Ville: {
//       class: 'text-info',
//       icon: Edit2
//     }

//   }

//   const Icon = row.idTypeZoneFk.libelle ? roleObj[row.idTypeZoneFk.libelle].icon : Edit2

//   return (
//     <span className='text-truncate text-capitalize align-middle'>
//       <Icon size={18} className={`${roleObj[row.idTypeZoneFk.libelle] ? roleObj[row.idTypeZoneFk.libelle].class : ''} me-50`} />
//       {row.idTypeZoneFk.libelle}
//     </span>
//   )
// }

// const statusObj = {
//   pending: 'light-warning',
//   active: 'light-success',
//   inactive: 'light-secondary'
// }

export const columns = [
  {
    name: 'Zones Parents',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.libelle,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className='fw-bolder'>{row.libelle}</span>
          </Link>
          {/* <small className='text-truncate text-muted mb-0'>{row.idZoneparentFk.zoneparent}</small> */}
        </div>
      </div>
    )
  },

  {
    name: 'Statut',
    minWidth: '138px',
    sortable: true,
    sortField: 'statut',
    selector: row => row.statut,
    cell: row => (
      <Badge className='text-capitalize' color={row.statut ? 'light-success' : 'light-secondary'} pill>
        {row.statut ? 'Active' : 'Inactive'}
      </Badge>
    )
  }
]
