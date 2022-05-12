'use strict'

import { createStore } from 'vuex'


export  default  createStore({
  state: {
    layout: 'simple-layout'
  },
  mutations: {
    SET_LAYOUT (state, payload) {
      state.layout = payload
    }
  },
  getters: {
    layout (state) {
      return state.layout
    }
  }
})

/* 
Conserver l'état de l'application avec Vuex
Comme notre application sera complexe, 
nous utiliserons ici Vuex pour gérer l'état de l'application.*/