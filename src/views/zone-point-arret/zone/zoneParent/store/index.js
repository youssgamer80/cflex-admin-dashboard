// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
// import axios from 'axios'
import client from '@src/api/api'
//import { handleZone } from '@store/zone-point-arret'

export const getAllDataZoneParent = createAsyncThunk('zonesParents/getAllDataZoneParent', async () => {
  const response = await client.get('/zoneparents')
  return response.data
})

export const getDataZoneParent = createAsyncThunk('zonesParents/getDataPointArret', async params => {
  const response = await client.get('/zoneparents', params)
  return {
    params,
    data: response.data.data,
    totalPages: response.data.data.length
  }
})

export const getUser = createAsyncThunk('zonesParents/getUser', async id => {
  const response = await client.get('/api/users/user', { id })
  return response.data.user
})

export const addZoneParent = createAsyncThunk('zonesParents/addUser', async (user, { dispatch, getState }) => {
  await client.post('/apps/users/add-user', user)
  await dispatch(getDataPointArret(getState().zone.params))
  await dispatch(getAllDataZoneParent())
  return user
})

export const deleteUser = createAsyncThunk('zonesParents/deleteUser', async (id, { dispatch, getState }) => {
  await client.delete('/apps/users/delete', { id })
  await dispatch(getDataPointArret(getState().zone.params))
  await dispatch(getAllDataZoneParent())
  return id
})

export const appUsersSlice = createSlice({
  name: 'zonesParents',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllDataZoneParent.fulfilled, (state, action) => {
        state.allData = action.payload.data
      })
      .addCase(getDataZoneParent.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default appUsersSlice.reducer
