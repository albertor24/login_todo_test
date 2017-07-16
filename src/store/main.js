import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const mutations = {
  setAuth (state, auth) {
    state.auth = auth
  }
}

const state = {
  auth: false
}

export default new Vuex.Store({
  state,
  mutations
})
