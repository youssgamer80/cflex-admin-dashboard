// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
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

export const getUser = createAsyncThunk('typesZone/getUser', async id => {
  const response = await client.get('/api/users/user', { id })
  return response.data.user
})

export const addTypeZone = createAsyncThunk('typesZone/addUser', async (user, { dispatch, getState }) => {


  await client.post('/typezone/addTypeZone', user).then((res) => {
    if (res.status === 200) {
      dispatch(getDataTypesZone(getState().typesZone.params))
      dispatch(getAllDataTypesZone())
      toast.success("Type Zone  ajouté !!!")
    } else {
      toast.error("Une erreur est survenue, veuillez réessayer")
    }
  })
  return user
})

export const updateTypeZone = createAsyncThunk('typesZone/addUser', async (user, { dispatch, getState }) => {

  await client.put(`/typezone/updateTypeZone/${user.id}`, user).then((res) => {
    if (res.status === 200) {
      dispatch(getDataTypesZone(getState().typesZone.params))
      dispatch(getAllDataTypesZone())
      toast.success("Type Zone modifié !!!")
    } else {
      toast.error("Une erreur est survenue, veuillez réessayer")
    }
  })
  return user
})

export const deleteTypeZone = createAsyncThunk('typesZone/deleteUser', async (id, { dispatch, getState }) => {
  await client.delete(`/typezone/deleteTypeZone/${id}`)
  await dispatch(getDataTypesZone(getState().typesZone.params))
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
