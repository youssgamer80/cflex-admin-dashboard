// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Eye } from 'react-feather'

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
        color={row.idTypeZoneFk.libelle === 'Ville' ? 'light-primary' : row.idTypeZoneFk.libelle === 'Quartier' ? 'light-success' : row.idTypeZoneFk.libelle === 'Commune' ? 'light-info' : 'light-secondary'}
        content={row.libelle || 'John Doe'}
      />
    )
  }
}
// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    Commune: {
      class: 'text-primary',
      icon: User
    },
    Quartier: {
      class: 'text-success',
      icon: Database
    },
    Ville: {
      class: 'text-info',
      icon: Edit2
    }

  }

  const Icon = row.idTypeZoneFk.libelle ? roleObj[row.idTypeZoneFk.libelle].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.idTypeZoneFk.libelle] ? roleObj[row.idTypeZoneFk.libelle].class : ''} me-50`} />
      {row.idTypeZoneFk.libelle}
    </span>
  )
}

// const statusObj = {
//   pending: 'light-warning',
//   active: 'light-success',
//   inactive: 'light-secondary'
// }

export const columns = [
  {
    name: 'Zone',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.libelle,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <span className='fw-bolder'>{row.libelle}</span>
          {/* <small className='text-truncate text-muted mb-0'>{row.idZoneparentFk.zoneparent}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'Type Zone',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.idTypeZoneFk.libelle,
    cell: row => renderRole(row)
  },
  {
    name: 'Zone parent',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.idZoneparentFk.zoneparent,
    cell: row => <span className='text-capitalize'>{row.idZoneparentFk.zoneparent}</span>
  },
  // {
  //   name: 'Billing',
  //   minWidth: '230px',
  //   sortable: true,
  //   sortField: 'billing',
  //   selector: row => row.billing,
  //   cell: row => <span className='text-capitalize'>{row.billing}</span>
  // },
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
