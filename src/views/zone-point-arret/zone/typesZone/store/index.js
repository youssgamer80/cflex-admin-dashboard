// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
// import axios from 'axios'
import client from '@src/api/api'
//import { handleZone } from '@store/zone-point-arret'

export const getAllDataTypesZone = createAsyncThunk('typesZone/getAllDataTypesZone', async () => {
  const response = await client.get('/typezone')
  console.log("xxxxxxx", response.data)
  return response.data
})

export const getDataTypesZone = createAsyncThunk('typesZone/getDataPointArret', async params => {
  const response = await client.get('/typezone', params)
  return {
    params,
    data: response.data.data,
    totalPages: response.data.data.length
  }
})

export const getUser = createAsyncThunk('typesZone/getUser', async id => {
  const response = await client.get('/api/users/user', { id })
  return response.data.user
})

export const addUser = createAsyncThunk('typesZone/addUser', async (user, { dispatch, getState }) => {
  await client.post('/apps/users/add-user', user)
  await dispatch(getDataPointArret(getState().users.params))
  await dispatch(getAllDataTypesZone())
  return user
})

export const deleteUser = createAsyncThunk('typesZone/deleteUser', async (id, { dispatch, getState }) => {
  await client.delete('/apps/users/delete', { id })
  await dispatch(getDataPointArret(getState().users.params))
  await dispatch(getAllDataTypesZone())
  return id
})

export const typesZoneSlice = createSlice({
  name: 'typesZone',
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
      .addCase(getAllDataTypesZone.fulfilled, (state, action) => {
        state.allData = action.payload.data
      })
      .addCase(getDataTypesZone.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default typesZoneSlice.reducer
