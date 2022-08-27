// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
import { useSelector } from 'react-redux'
// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { MapPin } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UsersList = () => {
  const storeZone = useSelector(state => state.pointArret)
  return (
    <div className='app-user-list'>
      <Row>

        <Col lg='12' sm='12'>
          <StatsHorizontal
            color='warning'
            statTitle="Point d'arrets"
            icon={<MapPin size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{storeZone.allData.length}</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  )
}

export default UsersList
