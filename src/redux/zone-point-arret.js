// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config


const initialZonePointArret = () => {
  const item = window.localStorage.getItem('zonePointArretData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

export const zonePointArretSlice = createSlice({
  name: 'zonePointArret',
  initialState: {
    userData: initialZonePointArret()
  },
  reducers: {
    handleZone: (state, action) => {
      state.zone = action.payload
      localStorage.setItem('zoneData', JSON.stringify(action.payload))
    }
    // handleLogout: state => {
    //   state.userData = {}
    //   state[config.storageTokenKeyName] = null
    //   state[config.storageRefreshTokenKeyName] = null
    //   // ** Remove user, accessToken & refreshToken from localStorage
    //   localStorage.removeItem('userData')
    //   localStorage.removeItem(config.storageTokenKeyName)
    //   localStorage.removeItem(config.storageRefreshTokenKeyName)
    // }
  }
})

export const { handleZone } = zonePointArretSlice.actions

export default zonePointArretSlice.reducer
