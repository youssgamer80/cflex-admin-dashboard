// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
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
  if (params.q.length >= 2) {
    return {
      params,
      data: params.data,
      totalPages: params.data.length
    }
  }
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

  await client.post('/zoneparents/addZoneparent', user).then((res) => {
    if (res.status === 200) {
      dispatch(getDataZoneParent(getState().zoneParent.params))
      dispatch(getAllDataZoneParent())
      toast.success("Zone parent ajoutée !!!")
    } else {
      toast.error("Une erreur est survenue, veuillez réessayer")
    }
  })
  return user
})

export const updateZoneParent = createAsyncThunk('zonesParents/addUser', async (zone, { dispatch, getState }) => {
  await client.put(`/zoneparents/updateZoneparent/${zone.id}`, zone).then((res) => {
    if (res.status === 200) {
      dispatch(getDataZoneParent(getState().zoneParent.params))
      dispatch(getAllDataZoneParent())
      toast.success("Zone parent modifiée !!!")
    } else {
      toast.error("Une erreur est survenue, veuillez réessayer")
    }
  })
  return user
})

export const deleteZoneParent = createAsyncThunk('zonesParents/deleteUser', async (id, { dispatch, getState }) => {
  await client.delete(`/zoneparents/deleteZoneparent/${id}`)
  await dispatch(getDataZoneParent(getState().zoneParent.params))
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
