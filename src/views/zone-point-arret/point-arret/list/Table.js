// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
// ** Invoice List Sidebar

// ** Table Columns
import { columns } from './columns'
// ** Store & Actions
import { getAllData, getData, addPointArret } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@components/avatar'
// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Map, Share, Printer, FileText, File, Grid, Copy, Check, X } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  Form
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Table Header
const CustomHeader = ({ toggleSidebar, handleFilter, searchTerm, rowsPerPage, handlePerPage }) => {
  // ** Converts table to CSV


  // ** Downloads CSV

  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='50'>100</option>
            </Input>
            <label htmlFor='rows-per-page'>Entries</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              Rechercher
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>


            <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              Ajouter
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
  const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 })
  const [formModal, setFormModal] = useState(false)
  const [zoneData, setZoneData] = useState(null)
  // ** Function to toggle sidebar
  const toggleSidebar = () => setFormModal(!formModal)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({})

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData())
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value
      })
    )
    setZoneData(JSON.parse(localStorage.getItem('zoneData')))
  }, [dispatch, store.data.length, sort, sortColumn, currentPage])


  // ** User filter options
  const roleOptions = [
    { value: '', label: 'Select Role' },
    { value: 'admin', label: 'Admin' },
    { value: 'author', label: 'Author' },
    { value: 'editor', label: 'Editor' },
    { value: 'maintainer', label: 'Maintainer' },
    { value: 'subscriber', label: 'Subscriber' }
  ]

  const planOptions = [
    { value: '', label: 'Select Plan' },
    { value: 'basic', label: 'Basic' },
    { value: 'company', label: 'Company' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'team', label: 'Team' }
  ]

  const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: 'pending', label: 'Pending', number: 1 },
    { value: 'active', label: 'Active', number: 2 },
    { value: 'inactive', label: 'Inactive', number: 3 }
  ]

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)

    const filteredPersons = store.data.filter(
      point => {
        return (
          point
            .nom
            .toLowerCase()
            .includes(val.toLowerCase()) ||
          point
            .idZoneFk.libelle
            .toLowerCase()
            .includes(val.toLowerCase())
        )
      }
    )
    console.log('recherche', filteredPersons)

    dispatch(
      getData({
        sort,
        q: val,
        data: filteredPersons,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })
    // console.log('Strore', store.data)
    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value
      })
    )
  }

  const onSubmit = data => {
    console.log("enregistrer un pa", data)
    const obj = {}
    const keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (key === 'zone') {
        obj['idZoneFk'] = {
          id: data[key]["value"]
        }
      } else {
        obj[key] = data[key]
      }
    }
    obj["statut"] = true

    dispatch(addPointArret(obj))
    setFormModal(!formModal)

  }
  const zoneOptions = []
  if (zoneData !== null) {
    for (let i = 0; i < zoneData.length; i++) {
      const countryOptionsJson = {}
      countryOptionsJson['value'] = zoneData[i]['id']
      countryOptionsJson['label'] = zoneData[i]['libelle']
      zoneOptions.push(countryOptionsJson)

    }
  }
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label for='role-select'>Role</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                onChange={data => {
                  setCurrentRole(data)
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      role: data.value,
                      page: currentPage,
                      perPage: rowsPerPage,
                      status: currentStatus.value,
                      currentPlan: currentPlan.value
                    })
                  )
                }}
              />
            </Col>
            <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>Plan</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={planOptions}
                value={currentPlan}
                onChange={data => {
                  setCurrentPlan(data)
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: data.value,
                      status: currentStatus.value
                    })
                  )
                }}
              />
            </Col>
            <Col md='4'>
              <Label for='status-select'>Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={statusOptions}
                value={currentStatus}
                onChange={data => {
                  setCurrentStatus(data)
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      status: data.value,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: currentPlan.value
                    })
                  )
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>
      <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setFormModal(!formModal)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Ajouter un point d'arret</h1>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12}>
              <Label className='form-label' for='username'>
                Nom
              </Label>
              <Controller
                name='nom'
                control={control}
                render={({ field }) => (
                  <Input {...field} id='username' placeholder='indenie' invalid={errors.username && true} />
                )}
              />
              {errors.username && <FormFeedback>Ajouter un point d'arret</FormFeedback>}
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='zone'>
                Zone
              </Label>

              <Controller
                name='zone'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id='zone'
                    isClearable={false}
                    className='react-select'
                    classNamePrefix='selChisect'
                    options={zoneOptions}
                    theme={selectThemeColors}
                  />)}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='tax-id'>
                Longitude
              </Label>


              <Controller
                name='longitude'
                control={control}
                render={({ field }) => (
                  <Input {...field} id='tax-id' placeholder='-3.4567567' />)}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='number'>
                Latitude
              </Label>

              <Controller
                name='latitude'
                control={control}
                render={({ field }) => (
                  <Input   {...field} id='contact' placeholder='4.34567' />)}
              />
            </Col>
            <Col xs={12}>
              <div className='d-flex align-items-center'>
                <Avatar className='me-1' color='light-warning' width='32' height='32' icon={<Map size={14} />} />
                <Label className='form-check-label fw-bolder' htmlFor='billing-switch'>
                  Choisir sur la carte
                </Label>
              </div>
            </Col>
            <Col className='d-grid mb-1 mb-lg-0' lg={6} md={12}>
              <Button type='submit' className='me-2' color='primary'>
                Enregistrer
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UsersList
//commit
