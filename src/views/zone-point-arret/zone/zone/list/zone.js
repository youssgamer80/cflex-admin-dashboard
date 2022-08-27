// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { StopCircle } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'

const ZoneList = () => {
  return (
    <div className='app-user-list'>
      <Row>

        <Col lg='12' sm='12'>
          <StatsHorizontal
            color='warning'
            statTitle='Zones'
            icon={<StopCircle size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>237</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  )
}

export default ZoneList
