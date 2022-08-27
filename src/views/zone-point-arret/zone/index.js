// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'
import Breadcrumbs from '@components/breadcrumbs'
import ZoneList from './zone/list/zone'
import ZoneParent from './zoneParent/list/zoneParent'
import TypesZone from './typesZone/list/typesZone'


// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const Zone = () => {
    // ** States
    const [activeTab, setActiveTab] = useState('1')
    const [data, setData] = useState(null)

    const toggleTab = tab => {
        setActiveTab(tab)
    }

    useEffect(() => {
        axios.get('/account-setting/data').then(response => setData(response.data))
    }, [])

    return (
        <Fragment>
            <Breadcrumbs title='Zones' data={[{ title: "Points d'arrets & zones" }, { title: 'Zones' }]} />
            {data !== null ? (
                <Row>
                    <Col xs={12}>
                        <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />

                        <TabContent activeTab={activeTab}>
                            <TabPane tabId='1'>
                                <ZoneList />
                            </TabPane>
                        </TabContent>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId='2'>
                                <ZoneParent />
                            </TabPane>
                        </TabContent>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId='3'>
                                <TypesZone />
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            ) : null}
        </Fragment>
    )
}

export default Zone
