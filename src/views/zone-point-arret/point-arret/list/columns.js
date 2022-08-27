// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser, deletePointArret } from '../store'

// ** Icons Imports
import { MapPin, Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// ** Renders Client Columns
const isAvatar = false
const renderClient = row => {
  if (isAvatar) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar className='me-1' color='light-warning' width='32' height='32' icon={<MapPin size={14} />} />
    )
  }
}
const MySwal = withReactContent(Swal)
const handleSuspendedClick = (row) => {
  return MySwal.fire({
    title: 'Êtes vous sûr?',
    text: `De vouloir supprimer ${row.nom}`,
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
      store.dispatch(deletePointArret(row.id))
      MySwal.fire({
        icon: 'success',
        title: 'Supprimé !',
        text: `Le point d'arret ${row.nom} a bien été supprimé`,
        customClass: {
          confirmButton: 'btn btn-success'
        }
      })
    }
  })
}
export const columns = [
  {
    name: 'Nom',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.nom,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/zone-point-arret/point-arret/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className='fw-bolder'>{row.nom}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },

  {
    name: 'Zone',
    minWidth: '138px',
    sortable: true,
    sortField: 'zone',
    selector: row => row.idZoneFk.libelle,
    cell: row => <span className='text-capitalize'>{row.idZoneFk.libelle}</span>
  },
  {
    name: 'Longitude',
    minWidth: '138px',
    sortable: true,
    sortField: 'longitude',
    selector: row => row.longitude,
    cell: row => <span className='text-capitalize'>{row.longitude}</span>
  },
  {
    name: 'Latitude',
    minWidth: '138px',
    sortable: true,
    sortField: 'latitude',
    selector: row => row.latitude,
    cell: row => <span className='text-capitalize'>{row.latitude}</span>
  },

  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: row => row.statut,
    cell: row => (
      <Badge className='text-capitalize' color={row.statut ? 'light-success' : 'light-danger'} pill>
        {row.statut ? 'Actif' : 'Inactif'}
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
              to={`/apps/zone-point-arret/point-arret/view/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
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
              <span className='align-middle'>Supprimer</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
