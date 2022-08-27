// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import Swal from 'sweetalert2'
import { getUser, deleteUser } from '../store'
import withReactContent from 'sweetalert2-react-content'
// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const isAvatar = false

const MySwal = withReactContent(Swal)

const renderClient = row => {
  if (isAvatar) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color='light-success'
        content={row.zoneparent || 'C Flex'}
      />
    )
  }
}
const handleSuspendedClick = (row) => {
  return MySwal.fire({
    title: 'Êtes vous sûr?',
    text: "De vouloir supprimer cette zone",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, je suis sûr',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ms-1'
    },
    buttonsStyling: false
  }).then(function (result) {
    if (result.value) {
      store.dispatch(deleteUser(row.id))
      MySwal.fire({
        icon: 'success',
        title: 'Supprimé !',
        text: `La zone ${row.libelle} a bien été supprimée`,
        customClass: {
          confirmButton: 'btn btn-success'
        }
      })
    }
  })
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
    selector: row => row.zoneparent,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className='fw-bolder'>{row.zoneparent}</span>
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
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/apps/user/view/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                handleSuspendedClick(row)

              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
