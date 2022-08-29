// ** React Imports
import { Fragment, useState, useEffect } from 'react'
// ** Invoice List Sidebar

// ** Table Columns
import { columns } from './columns'
import { store } from '@store/store'
// ** Store & Actions
import { getAllDataTypesZone, getDataTypesZone, updateTypeZone, addTypeZone, deleteTypeZone } from '../store'
import { useDispatch, useSelector } from 'react-redux'
// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { Check, X, ChevronDown, Share, Printer, FileText, File, Grid, Copy, MoreVertical, Trash2, Eye } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
// ** Utils
import { selectThemeColors } from '@utils'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Table Header
const CustomHeader = ({ storeData, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(storeData.data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
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
              Rechercher:
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
            <UncontrolledDropdown className='me-1'>
              <DropdownToggle color='secondary' caret outline>
                <Share className='font-small-4 me-50' />
                <span className='align-middle'>Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <Printer className='font-small-4 me-50' />
                  <span className='align-middle'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(storeData.data)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid className='font-small-4 me-50' />
                  <span className='align-middle'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File className='font-small-4 me-50' />
                  <span className='align-middle'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy className='font-small-4 me-50' />
                  <span className='align-middle'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

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
  const storeData = useSelector(state => state.typesZone)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Selectionner un statut', number: 0 })
  const [formModal, setFormModal] = useState(false)
  const [updateStatut, setUpdateStatut] = useState(null)
  const [update, setUpdate] = useState(false)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllDataTypesZone())
    dispatch(
      getDataTypesZone({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        status: currentStatus.value
      })
    )

  }, [dispatch, storeData.data.length, sort, sortColumn, currentPage])
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({})

  const toggleSidebar = () => {
    setFormModal(!formModal)
    reset()
    setUpdate(false)
  }
  // ** User filter options

  const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: 'pending', label: 'Pending', number: 1 },
    { value: 'active', label: 'Active', number: 2 },
    { value: 'inactive', label: 'Inactive', number: 3 }
  ]

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getDataTypesZone({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        status: currentStatus.value
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getDataTypesZone({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
        status: currentStatus.value
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    const filteredPersons = storeData.data.filter(
      point => {
        return (
          point
            .libelle
            .toLowerCase()
            .includes(val.toLowerCase())
        )
      }
    )
    dispatch(
      getDataTypesZone({
        sort,
        q: val,
        sortColumn,
        data: filteredPersons,
        page: currentPage,
        perPage: rowsPerPage,
        status: currentStatus.value
      })
    )
  }
  const checkIsValid = data => {
    return Object.values(data).every(field => (field !== undefined))
  }
  const onSubmit = data => {
    console.log("enregistrer un pa", data)
    if (checkIsValid(data)) {
      update ? dispatch(updateTypeZone(data)) : dispatch(addTypeZone(data))
      setFormModal(!formModal)
      reset()
    } else {
      for (const key in data) {
        if (data[key] === undefined) {
          setError(key, {
            type: key
          })
        }
      }
    }

  }
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(storeData.total / rowsPerPage))

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
      status: currentStatus.value,
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (storeData.data.length > 0) {
      return storeData.data
    } else if (storeData.data.length === 0 && isFiltered) {
      return []
    } else {
      return storeData.allData.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getDataTypesZone({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        status: currentStatus.value
      })
    )
  }
  const MySwal = withReactContent(Swal)

  const handleSuspendedClick = (row) => {
    return MySwal.fire({
      title: 'Êtes vous sûr?',
      text: `De vouloir supprimer ${row.libelle}`,
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
        store.dispatch(deleteTypeZone(row.id))
        MySwal.fire({
          icon: 'success',
          title: 'Supprimé !',
          text: `Le Type zone ${row.libelle} a bien été supprimée`,
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })

      }
    })
  }

  const handleEditClick = data => {
    const keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (key === 'statut') {
        setUpdateStatut(data[key])
      } else {
        setValue(key, data[key])
        // setCurrentZonesData(data)
      }
    }
    setFormModal(!formModal)
    setUpdate(true)
  }
  const updatedColumns = [
    ...columns,
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
              <DropdownItem tag='a' className='w-100' onClick={() => handleEditClick(row)}>
                <Eye size={14} className='me-50' />
                <span className='align-middle'>Voir</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
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
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Filtre</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
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
                  setCurrentStatus(data)
                  dispatch(
                    getDataTypesZone({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      status: data.value,
                      perPage: rowsPerPage
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
            columns={updatedColumns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={storeData}
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
                Type Zone
              </Label>
              <Controller
                name='libelle'
                control={control}
                render={({ field }) => (
                  <Input {...field} id='username' placeholder='Type Zone' invalid={errors.libelle && true} />
                )}
              />
              {errors.libelle && <FormFeedback>Ajouter un Type Zone</FormFeedback>}
            </Col>
            <Col xs={12}>
              <div className='d-flex align-items-center'>
                <div className='form-switch'>

                  <Controller
                    name='statut'
                    control={control}
                    defaultValue={update ? updateStatut : true}
                    render={({ field }) => (
                      <Input {...field} type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                    )}
                  />
                  <Label className='form-check-label' htmlFor='billing-switch'>
                    <span className='switch-icon-left'>
                      <Check size={14} />
                    </span>
                    <span className='switch-icon-right'>
                      <X size={14} />
                    </span>
                  </Label>
                </div>
                <Label className='form-check-label fw-bolder' for='billing-switch'>
                  Actif
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
