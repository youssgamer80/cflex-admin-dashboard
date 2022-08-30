// ** React Imports
import { Fragment, useState } from 'react'
// ** Store & Actions
// import { getAllData, getData } from '../store'
import { useDispatch } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'
import makeAnimated from 'react-select/animated'
import Map from '@src/views/components/mapbox/map'
// ** Utils
import { selectThemeColors } from '@utils'


// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Label,
    CardBody,
    CardTitle,
    CardHeader
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const animatedComponents = makeAnimated()

const UsersList = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    // const store = useSelector(state => state.users)
    // ** States
    // const [sidebarOpen, setSidebarOpen] = useState(false)
    const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
    const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' })

    // ** Function to toggle sidebar

    // ** Get data on mount
    // useEffect(() => {
    //     dispatch(getAllData())
    //     dispatch(
    //         getData({
    //             sort,
    //             sortColumn,
    //             q: searchTerm,
    //             page: currentPage,
    //             perPage: rowsPerPage,
    //             role: currentRole.value,
    //             status: currentStatus.value,
    //             currentPlan: currentPlan.value
    //         })
    //     )
    // }, [dispatch, store.data.length, sort, sortColumn, currentPage])

    // ** User filter options
    const roleOptions = [
        { value: '', label: 'Select Role' },
        { value: 'admin', label: 'Admin' },
        { value: 'author', label: 'Author' },
        { value: 'editor', label: 'Editor' },
        { value: 'maintainer', label: 'Maintainer' },
        { value: 'subscriber', label: 'Subscriber' }
    ]
    const colorOptions = [
        { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
        { value: 'blue', label: 'Blue', color: '#0052CC', isFixed: true },
        { value: 'purple', label: 'Purple', color: '#5243AA', isFixed: true },
        { value: 'red', label: 'Red', color: '#FF5630', isFixed: false },
        { value: 'orange', label: 'Orange', color: '#FF8B00', isFixed: false },
        { value: 'yellow', label: 'Yellow', color: '#FFC400', isFixed: false }
    ]

    const planOptions = [
        { value: '', label: 'Select Plan' },
        { value: 'basic', label: 'Basic' },
        { value: 'company', label: 'Company' },
        { value: 'enterprise', label: 'Enterprise' },
        { value: 'team', label: 'Team' }
    ]
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Points</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md='6'>
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
                        <Col className='my-md-0 my-1' md='6'>
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
                    </Row>
                </CardBody>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Options</CardTitle>
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col className='mb-1' md='12' sm='12'>
                            <Label className='form-label'>Animated Select</Label>
                            <Select
                                isClearable={false}
                                theme={selectThemeColors}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                defaultValue={[colorOptions[4], colorOptions[5]]}
                                isMulti
                                options={colorOptions}
                                className='react-select'
                                classNamePrefix='select'
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Map />

        </Fragment>
    )
}

export default UsersList
