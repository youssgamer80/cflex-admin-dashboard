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
  if (params.q.length >= 2) {
    return {
      params,
      data: params.data,
      totalPages: params.data.length
    }
  }

  //localStorage.setItem('zoneData', JSON.stringify(response.data.data))
  return {
    params,
    data: response.data.data,
    totalPages: response.data.data.length
  }
})

export const getZone = createAsyncThunk('zones/getUser', async id => {
  console.log(`/zones/${id}`)
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

export const updateZone = createAsyncThunk('zones/addUser', async (zone, { dispatch, getState }) => {
  await client.put(`/zones/updateZone/${zone.id}`, zone).then((res) => {
    if (res.status === 200) {
      dispatch(getDataZone(getState().zone.params))
      dispatch(getAllDataZone())
      toast.success("Zone modifiée !!!")
    } else {
      toast.error("Une erreur est survenue, veuillez réessayer")
    }
  })
  return user
})


export const deleteZone = createAsyncThunk('zones/deleteUser', async (id, { dispatch, getState }) => {
  await client.delete(`/zones/deleteZone/${id}`)
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
  reducers: {
    selectZone: (state, action) => {
      if (action.payload === undefined) {
        state.selected = null
      } else {
        state.selected = action.payload
      }
    }
  },
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
        state.selectedZone = action.payload.data
      })
  }
})
export const { selectZone } = appUsersSlice.actions
export default appUsersSlice.reducer
