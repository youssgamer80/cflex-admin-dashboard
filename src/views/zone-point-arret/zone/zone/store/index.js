// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import client from '@src/api/api'

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

export const getZone = createAsyncThunk('zones/getUser', async id => {
  console.log("get")
  const response = await client.get(`/zones/${id}`)
  return response.data.data
})

export const addZone = createAsyncThunk('zones/addUser', async (user, { dispatch, getState }) => {
  await client.post('/zones/addZone', user).then((res) => {
    if (res.status === 200) {
      dispatch(getDataZone(getState().zone.params))
      dispatch(getAllDataZone())
      toast.success("Zone ajoutée !!!")
    } else {
      toast.error("Une erreur est survenue, veuillez réessayer")
    }
  })
  return user
})

export const deleteZone = createAsyncThunk('zones/deleteUser', async (id, { dispatch, getState }) => {
  await client.delete(`/zones/deleteZone/${id}`, { statut: false })
  await dispatch(getDataZone(getState().zone.params))
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
    selectedZone: null
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
      .addCase(getZone.fulfilled, (state, action) => {
        state.selectedZone = action.payload
      })
  }
})

export default appUsersSlice.reducer
