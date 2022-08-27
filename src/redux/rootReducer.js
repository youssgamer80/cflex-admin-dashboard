// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import todo from '@src/views/apps/todo/store'
import chat from '@src/views/apps/chat/store'
import users from '@src/views/apps/user/store'
import email from '@src/views/apps/email/store'
import kanban from '@src/views/apps/kanban/store'
import pointArret from '@src/views/zone-point-arret/point-arret/store'
import invoice from '@src/views/apps/invoice/store'
import calendar from '@src/views/apps/calendar/store'
import ecommerce from '@src/views/apps/ecommerce/store'
import dataTables from '@src/views/tables/data-tables/store'
import permissions from '@src/views/apps/roles-permissions/store'
import zone from '@src/views/zone-point-arret/zone/zone/store'
import zoneParent from '@src/views/zone-point-arret/zone/zoneParent/store'
import typesZone from '@src/views/zone-point-arret/zone/typesZone/store'
// import zonePointArret from './zone-point-arret'


const rootReducer = {
  auth,
  todo,
  chat,
  email,
  users,
  kanban,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  permissions,
  // zonePointArret,
  pointArret,
  zone,
  zoneParent,
  typesZone

}

export default rootReducer
