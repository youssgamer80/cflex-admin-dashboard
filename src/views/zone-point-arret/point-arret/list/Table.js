// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
// ** Invoice List Sidebar

// ** Table Columns
import { columns } from './columns'
import classnames from 'classnames'
// ** Store & Actions
import { getAllDataPointArret, getDataPointArret, addPointArret } from '../store'
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
  Form,
  FormFeedback
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
  const store = useSelector(state => state.pointArret)
  const storeZone = useSelector(state => state.zone)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentZone, setcurrentZone] = useState({ value: '', label: 'Selectionner un zone' })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Selectionner un statut', number: 0 })
  const [formModal, setFormModal] = useState(false)
  const [data, setData] = useState({})
  // ** Function to toggle sidebar
  const toggleSidebar = () => setFormModal(!formModal)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({})

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllDataPointArret())
    dispatch(
      getDataPointArret({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentZone.value,
        status: currentStatus.value
      })
    )
  }, [dispatch, store.data.length, sort, sortColumn, currentPage])


  // ** User filter options

  const statusOptions = [
    { value: true, label: 'Actif', number: 1 },
    { value: false, label: 'Inactif', number: 2 }
  ]

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getDataPointArret({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        role: currentZone.value,
        status: currentStatus.value
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getDataPointArret({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
        role: currentZone.value,
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
      getDataPointArret({
        sort,
        q: val,
        data: filteredPersons,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentZone.value,
        status: currentStatus.value
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
      role: currentZone.value,
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
      getDataPointArret({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentZone.value,
        status: currentStatus.value
      })
    )
  }
  const checkIsValid = data => {
    let isValid = true
    const keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (key === 'latitude' || key === 'longitude') {
        if (!(!isNaN(data[key]) && data[key].toString().indexOf('.') !== -1)) {
          isValid = false
        }
      } else if (data[key] === undefined) {
        isValid = false
      } else {
        if (data[key].length === 0) {
          isValid = false
        }
      }
    }
    return isValid
  }
  const onSubmit = data => {
    // console.log("enregistrer un pa", data)
    setData(data)
    if (checkIsValid(data)) {
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
      console.log("enregistrer un pa", obj)
      setFormModal(!formModal)
    } else {
      for (const key in data) {
        if (data[key] === undefined) {
          setError(key, {
            type: key
          })
        }
        if (key === 'latitude' || key === 'longitude') {
          if (!(!isNaN(data[key]) && data[key].toString().indexOf('.') !== -1)) {
            setError(key, {
              type: key
            })
          }
        }
      }
    }
  }
  const zoneOptions = []
  if (storeZone.allData !== null) {
    for (let i = 0; i < storeZone.allData.length; i++) {
      const countryOptionsJson = {}
      countryOptionsJson['value'] = storeZone.allData[i]['id']
      countryOptionsJson['label'] = storeZone.allData[i]['libelle']
      zoneOptions.push(countryOptionsJson)

    }
  }
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Filtres</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label for='role-select'>Zone</Label>
              <Select
                isClearable={false}
                value={currentZone}
                options={zoneOptions}
                className='react-select'
                classNamePrefix='select'
                placeholder='Selectionner un zone'
                theme={selectThemeColors}
                onChange={data => {
                  setcurrentZone(data)
                  dispatch(
                    getDataPointArret({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      role: data.value,
                      page: currentPage,
                      perPage: rowsPerPage,
                      status: currentStatus.value
                    })
                  )
                }}
              />
            </Col>
            <Col md='4'>
              <Label for='status-select'>Statut</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={statusOptions}
                value={currentStatus}
                onChange={data => {
                  console.log(data.value)
                  setCurrentStatus(data)
                  const filteredPersons = store.data.filter(
                    point => {
                      return (
                        point
                          .statut
                        === data.value
                      )
                    }
                  )
                  console.log('============', store.data)
                  dispatch(
                    getDataPointArret({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      data: filteredPersons,
                      page: currentPage,
                      status: data.value,
                      perPage: rowsPerPage,
                      role: currentZone.value
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
                  <Input {...field} id='username' placeholder='indenie' invalid={errors.nom && true} />
                )}
              />
              {errors.nom && <FormFeedback>Veuillez saisir le nom du point d'arret</FormFeedback>}
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
                    classNamePrefix='selChisect'
                    options={zoneOptions}
                    theme={selectThemeColors}
                    className={classnames('react-select', { 'is-invalid': data !== undefined ? data.zone === undefined : true })}
                  />)}
              />
              {errors.zone && <FormFeedback>Veuillez selectionner une zone</FormFeedback>}
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='tax-id'>
                Longitude
              </Label>


              <Controller
                name='longitude'
                control={control}
                render={({ field }) => (
                  <Input {...field} id='tax-id' placeholder='-3.4567567' invalid={errors.longitude && true} />)}
              />
              {errors.longitude && <FormFeedback>Entrez une longitude correcte</FormFeedback>}
            </Col>
            <Col md={6} xs={12}>
              <Label className='form-label' for='number'>
                Latitude
              </Label>

              <Controller
                name='latitude'
                control={control}
                render={({ field }) => (
                  <Input   {...field} id='contact' placeholder='4.34567' invalid={errors.latitude && true} />)}
              />
              {errors.latitude && <FormFeedback>Entrez une latitude correcte</FormFeedback>}
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