import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const state = {
  title: '喵巨人',
  searchList: []
}

const getters = {
  searchList: state => state.searchList
}

const mutations = {
  setTitle(state, title) {
    state.title = title
  },
  addSearchList(state, obj) {
    state.searchList.push(obj)
  },
  setSearchList(state, list) {
    state.searchList = list
  }
}

const actions = {}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()]
})
