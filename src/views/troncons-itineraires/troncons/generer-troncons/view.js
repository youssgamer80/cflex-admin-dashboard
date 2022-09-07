// ** React Imports
import { Fragment, useState } from 'react'
// ** Store & Actions
// import { getAllData, getData } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'
import makeAnimated from 'react-select/animated'
import Map from '@src/views/components/mapbox/map'
import { selectPointLigne } from './store'
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
    const dispatch = useDispatch()
    // ** Store Vars
    const store = useSelector(state => state.genererTroncon)
    const storePointArret = useSelector(state => state.pointArret)
    const storeZone = useSelector(state => state.zone)
    const pointsOptions = []
    const zonesOptions = []
    const pointsArretsLigne = []
    // const [sidebarOpen, setSidebarOpen] = useState(false)
    const [currentPoint1, setCurrentPoint1] = useState({ value: '', label: 'Selectionner le départ' })
    const [currentPoint2, setCurrentPoint2] = useState({ value: '', label: "Selectionner l'arrivée" })
    const [currentZone, setCurrentZone] = useState({ value: '', label: "Selectionner Zone" })
    // const [currentPointsLigne, setCurrentPointsLigne] = useState({
    //     features: []
    // })
    const [currentData, setData] = useState({})

    if (storePointArret.allData !== null) {
        for (let i = 0; i < storePointArret.allData.length; i++) {
            const countryOptionsJson = {}
            countryOptionsJson['value'] = storePointArret.allData[i].id
            countryOptionsJson['label'] = storePointArret.allData[i].nom
            pointsOptions.push(countryOptionsJson)

        }
    }
    if (storeZone.allData !== null) {
        for (let i = 0; i < storeZone.allData.length; i++) {
            const countryOptionsJson = {}
            countryOptionsJson['value'] = storeZone.allData[i].id
            countryOptionsJson['label'] = storeZone.allData[i].nom
            zonesOptions.push(countryOptionsJson)

        }
    }
    if (storePointArret.allData !== null) {
        for (let i = 0; i < storePointArret.allData.length; i++) {
            const countryOptionsJson = {}
            countryOptionsJson['value'] = storePointArret.allData[i].id
            countryOptionsJson['label'] = storePointArret.allData[i].nom
            countryOptionsJson['color'] = '#FB5A00'
            countryOptionsJson['isFixed'] = true
            countryOptionsJson['longitude'] = storePointArret.allData[i].longitude
            countryOptionsJson['latitude'] = storePointArret.allData[i].latitude
            pointsArretsLigne.push(countryOptionsJson)

        }
    }

    const addOnMap = points => {
        const featuresArray = []

        for (let i = 0; i < points.length; i++) {
            const point = points[i]
            const countryOptionsJson = {
                location: point.label,
                city: point.label,
                state: point.label,
                coordinates: [point.longitude, point.latitude]
            }
            featuresArray.push(countryOptionsJson)
        }

        dispatch(selectPointLigne(featuresArray))

    }

    const {
        control,
        // reset,
        handleSubmit,
        setError,
        // setValue,
        formState: { errors }
    } = useForm({ defaultValues: {} })


    const onSubmit = data => {
        setData(data)


        const filtersObject = {
            nom: data.nom,
            tarif: data.tarif
        }

        if (Object.values(filtersObject).every(field => field !== undefined) && (currentPoint2 !== currentPoint1) && currentPoint1.value.length > 1 && currentPoint2.value.length > 1 && currentZone.value.length > 1) {


            // const sendData = {
            //     nom: data.nom,
            //     depart: currentPoint1.value,
            //     arrivee: currentPoint2.value,
            //     tarif: data.tarif,
            //     idZoneFk: {
            //         id: currentPoint1.value
            //     }

            // }
            console.log('xxxxx', data)

        } else {
            for (const key in data) {
                if (key === 'nom' || key === 'tarif') {
                    if (data[key] === undefined) {
                        setError(key, {
                            type: 'manual'
                        })
                    }
                }
                if (currentPoint2.value.length < 2 || currentPoint1.value.length < 2) {

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
                                                className={classnames('react-select', { 'is-invalid': currentData !== undefined ? currentData.depart === undefined : true })}
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
                                                className={classnames('react-select', { 'is-invalid': currentData !== undefined ? currentData.arrivee === undefined : true })}
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
                                                className={classnames('react-select', { 'is-invalid': currentData !== undefined ? currentData.idZoneFk === undefined : true })}
                                                classNamePrefix='select'
                                                options={zonesOptions}
                                                onChange={data => {
                                                    setCurrentZone(data)

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
                                        isMulti
                                        options={pointsArretsLigne}
                                        onChange={data => {
                                            addOnMap(data)
                                        }}
                                        classNamePrefix='select'
                                        className='react-select'
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
                <Map points={store.selected} />
            </div>
        </Fragment>
    )
}

export default UsersList
