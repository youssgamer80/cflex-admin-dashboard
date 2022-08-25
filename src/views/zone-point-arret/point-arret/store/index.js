// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
// ** Axios Imports
// import axios from 'axios'
import client from '../../../../api/api'

export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
  const response = await client.get('/pointarrets')
  console.log(response)
  return response.data.data
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await client.get('/pointarrets', params)
  console.log(params.data)
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

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await client.get('/api/users/user', { id })
  return response.data.user
})

export const addPointArret = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {

  const response = await client.post('/pointarrets/addPointArret', user)
  if (response.status === 200) {
    await dispatch(getData(getState().users.params))
    await dispatch(getAllData())
    toast.success("Point d'arret ajouté !!!")
    return user

  } else {
    toast.error("Une erreur est survenue !")
    return {}
  }

})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await client.delete(`/pointarrets/deletePointArret/${id}`, { id })
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})
// export const updatePointArret = createAsyncThunk('appUser/updateUser' , async(id , {dispatch , getState})=>{
//   await client.update()
// })


export const pointArretdataSlice = createSlice({
  name: 'appUsers',
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
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default pointArretdataSlice.reducer
