// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser, deleteUser } from '../store'

// ** Icons Imports
import {MapPin,  Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import {Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const isAvatar = false
const renderClient = row => {
  console.log('statut', row.nom)
  if (isAvatar) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
<Avatar className='me-1' color='light-warning' width='32' height='32'  icon={<MapPin size={14} />} />
    )
  }
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
            to={`/apps/user/view/${row.id}`}
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
                store.dispatch(deleteUser(row.id))
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
