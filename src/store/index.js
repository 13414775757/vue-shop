import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activePath: '',
  },
  mutations: {
    chengePath(state, path) {
      this.state.activePath = path;
    }
  },
  actions: {
  },
  modules: {
  }
})
