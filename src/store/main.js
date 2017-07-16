import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {isUserAuth} from '../services/auth'

const state = {
  auth: isUserAuth()
}

const mutations = {
  setAuth (state, auth) {
    console.log(auth)
    state.auth = auth
  }
}

export default new Vuex.Store({
  state,
  mutations
})
