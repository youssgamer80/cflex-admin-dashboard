// ** React Imports
import { Fragment, useState, useEffect } from 'react'
// ** Store & Actions
// import { getAllData, getData } from '../store'
import { useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'
import makeAnimated from 'react-select/animated'
import Map from '@src/views/components/mapbox/map'
import classnames from 'classnames'
// ** Utils
import { selectThemeColors } from '@utils'
import { useForm, Controller } from 'react-hook-form'
import Cleave from 'cleave.js/react'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Label,
    Button,
    CardBody,
    CardTitle,
    CardHeader,
    FormFeedback
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const animatedComponents = makeAnimated()

const UsersList = () => {
    // ** Store Vars
    // const dispatch = useDispatch()
    const storePointArret = useSelector(state => state.pointArret)
    const pointsOptions = []
    // const [sidebarOpen, setSidebarOpen] = useState(false)
    const [currentPoint1, setCurrentPoint1] = useState({ value: '', label: 'Selectionner le départ' })
    const [currentPoint2, setCurrentPoint2] = useState({ value: '', label: "Selectionner l'arrivée" })
    const [data, setData] = useState({})
    // ** Function to toggle sidebar
    // ** User filter options

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
    // ** Get data on mount
    if (storePointArret.allData !== null) {
        for (let i = 0; i < storePointArret.allData.length; i++) {
            const countryOptionsJson = {}
            countryOptionsJson['value'] = storePointArret.allData[i].id
            countryOptionsJson['label'] = storePointArret.allData[i].nom
            pointsOptions.push(countryOptionsJson)

        }
    }
    useEffect(() => {

    })


    const {
        control,
        // reset,
        handleSubmit,
        setError,
        // setValue,
        formState: { errors }
    } = useForm({ defaultValues: {} })


    const onSubmit = data => {
        const data2 = data
        setData(data)
        delete data2['idZoneFk']
        delete data2['arrivee']
        delete data2['depart']


        if (Object.values(data2).every(field => field !== undefined && currentPoint2 !== currentPoint1)) {
        } else {
            for (const key in data2) {
                if (data2[key] === undefined) {
                    setError(key, {
                        type: 'manual'
                    })
                }
                if (currentPoint2.value.length < 2 || currentPoint1.value.length < 2) {
                    console.log(data2)
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }
    }

    return (
        <Fragment>
            <div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle tag='h4'>Ligne</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row className='gy-1 pt-75'>
                                <Col md={6} xs={12}>
                                    <Label className='form-label' for='depart'>Départ</Label>
                                    <Controller
                                        name='depart'
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                id='depart'
                                                isClearable={false}
                                                options={pointsOptions}
                                                className={classnames('react-select', { 'is-invalid': data !== undefined ? data.depart === undefined : true })}
                                                classNamePrefix='select'
                                                theme={selectThemeColors}
                                                onChange={data => {


                                                    setCurrentPoint1(data)


                                                }}
                                            />
                                        )}
                                    />
                                    {errors.depart && <FormFeedback>Veuillez selectionner le point de départ !!!</FormFeedback>}
                                </Col>
                                <Col md={6} xs={12}>
                                    <Label for='plan-select'>Arrivée</Label>

                                    <Controller
                                        name='arrivee'
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                id="arrivee"
                                                theme={selectThemeColors}
                                                isClearable={false}
                                                className={classnames('react-select', { 'is-invalid': data !== undefined ? data.arrivee === undefined : true })}
                                                classNamePrefix='select'
                                                options={pointsOptions}
                                                onChange={data => {

                                                    setCurrentPoint2(data)

                                                }}
                                            />
                                        )}
                                    />
                                    {errors.depart && <FormFeedback>Veuillez selectionner le point d'arrivée !!!</FormFeedback>}
                                </Col>
                                <Col md={6} xs={12}>
                                    <Label className='form-label' for='nom'>
                                        Nom de la ligne
                                    </Label>
                                    <Controller
                                        name='nom'
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} id='nom' placeholder='ligne' invalid={errors.nom && true} />
                                        )}
                                    />
                                    {errors.nom && <FormFeedback>Ajouter une Zone</FormFeedback>}
                                </Col>

                                <Col md={6} xs={12}>
                                    <Label for='numeral-formatting'>Tarif de la ligne</Label>
                                    <Controller
                                        name='tarif'
                                        control={control}
                                        render={({ field }) => (
                                            <Input {...field} className='form-control' placeholder='Tarif ' id='tarif' invalid={errors.tarif && true} type='number' />
                                        )}
                                    />
                                    {errors.tarif && <FormFeedback>Veuillez définir un tarif pour la ligne</FormFeedback>}
                                </Col>
                                <Col md={6} xs={12}>
                                    <Label for='plan-select'>Zone</Label>

                                    <Controller
                                        name='idZoneFk'
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                theme={selectThemeColors}
                                                isClearable={false}
                                                className={classnames('react-select', { 'is-invalid': data !== undefined ? data.idZoneFk === undefined : true })}
                                                classNamePrefix='select'
                                                options={planOptions}
                                                onChange={data => {
                                                    console.log(data)

                                                }}
                                            />
                                        )}
                                    />
                                    {errors.idZoneFk && <FormFeedback>Veuillez selectionner la zone !!!</FormFeedback>}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle tag='h4'>Selectionner les points de la ligne</CardTitle>
                        </CardHeader>

                        <CardBody>
                            <Row>
                                <Col className='mb-1' md='12' sm='12'>
                                    <Label className='form-label'>Veuillez les selectionner dans l'ordre</Label>
                                    <Select
                                        isClearable={false}
                                        theme={selectThemeColors}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        defaultValue={[colorOptions[4], colorOptions[5]]}
                                        isMulti
                                        options={colorOptions}
                                        classNamePrefix='select'
                                    />
                                </Col>
                                <Col sm='12'>
                                    <Button type='submit' className='btn-next delivery-address' color='primary'>
                                        Générer les Tronçons
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Form>
                <Map />
            </div>
        </Fragment>
    )
}

export default UsersList
