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
  console.log('xxxxxx', response)
  return response.data.data
})

export const addPointArret = createAsyncThunk('pointArrets/addPointArret', async (user, { dispatch, getState }) => {

  const response = await client.post('/pointarrets/addPointArret', user)
  if (response.status === 200) {
    await dispatch(getDataPointArret(getState().users.params))
    await dispatch(getAllDataPointArret())
    toast.success("Point d'arret ajouté !!!")
    return user

  } else {
    toast.error("Une erreur est survenue !")
    return {}
  }

})

export const deleteUser = createAsyncThunk('pointArrets/deleteUser', async (id, { dispatch, getState }) => {
  await client.delete(`/pointarrets/deletePointArret/${id}`, { id })
  await dispatch(getDataPointArret(getState().users.params))
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
