// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
// import axios from 'axios'
import client from '@src/api/api'
//import { handleZone } from '@store/zone-point-arret'

export const getAllDataZone = createAsyncThunk('zones/getAllDataZone', async () => {
  const response = await client.get('/zones')
  return response.data
})

export const getDataZone = createAsyncThunk('zones/getDataPointArret', async params => {
  const response = await client.get('/zones', params)
  console.log(response.data.data)
  //localStorage.setItem('zoneData', JSON.stringify(response.data.data))
  return {
    params,
    data: response.data.data,
    totalPages: response.data.data.length
  }
})

export const getUser = createAsyncThunk('zones/getUser', async id => {
  const response = await client.get('/api/users/user', { id })
  return response.data.user
})

export const addUser = createAsyncThunk('zones/addUser', async (user, { dispatch, getState }) => {
  await client.post('/apps/users/add-user', user)
  await dispatch(getDataPointArret(getState().users.params))
  await dispatch(getAllDataZone())
  return user
})

export const deleteUser = createAsyncThunk('zones/deleteUser', async (id, { dispatch, getState }) => {
  await client.delete('/apps/users/delete', { id })
  await dispatch(getDataPointArret(getState().users.params))
  await dispatch(getAllDataZone())
  return id
})

export const appUsersSlice = createSlice({
  name: 'zones',
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
      .addCase(getAllDataZone.fulfilled, (state, action) => {
        state.allData = action.payload.data
      })
      .addCase(getDataZone.fulfilled, (state, action) => {
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
