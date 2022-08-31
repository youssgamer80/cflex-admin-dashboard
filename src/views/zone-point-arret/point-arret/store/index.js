// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
// ** Axios Imports
// import axios from 'axios'
import client from '../../../../api/api'

export const getAllDataPointArret = createAsyncThunk('pointArrets/getAllDataPointArret', async () => {
  const response = await client.get('/pointarrets')
  console.log(response)
  return response.data.data
})

export const getDataPointArret = createAsyncThunk('pointArrets/getDataPointArret', async params => {
  const response = await client.get('/pointarrets', params)
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

export const getUser = createAsyncThunk('pointArrets/getUser', async id => {
  const response = await client.get(`/pointarrets/${id}`, { id })
  return response.data.data
})

export const addPointArret = createAsyncThunk('pointArrets/addPointArret', async (user, { dispatch, getState }) => {

  await client.post('/pointarrets/addPointArret', user).then((res) => {
    if (res.status === 200) {
      dispatch(getDataPointArret(getState().pointArret.params))
      dispatch(getAllDataPointArret())
      toast.success("Point d'arret ajouté !!!")
    } else {
      toast.error("Une erreur est survenue, veuillez réessayer")
    }
  })
  return user
})

export const deletePointArret = createAsyncThunk('pointArrets/deleteUser', async (id, { dispatch, getState }) => {
  await client.delete(`/pointarrets/deletePointArret/${id}`, { id })
  await dispatch(getDataPointArret(getState().pointArret.params))
  await dispatch(getAllDataPointArret())
  return id
})
// export const updatePointArret = createAsyncThunk('appUser/updateUser' , async(id , {dispatch , getState})=>{
//   await client.update()
// })


export const pointArretsSlice = createSlice({
  name: 'pointArrets',
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
      .addCase(getAllDataPointArret.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getDataPointArret.fulfilled, (state, action) => {
        console.log("xxxxxxx", action.payload)
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default pointArretsSlice.reducer
