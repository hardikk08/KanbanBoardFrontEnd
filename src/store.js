import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stageData: {},
    projectToBeMovedPreviousStage: ''
  },
  mutations: {
    SAVE_ALL_STAGES (state, data) {
      state.stageData = data
    },
    MOVE_PROJECT (state, data) {
      state.projectToBeMovedPreviousStage = data
    }
  },
  actions: {
    SAVE_ALL_STAGES ({ commit, state }, data) {
      commit('SAVE_ALL_STAGES', data)
    },
    MOVE_PROJECT ({ commit, state }, data) {
      commit('MOVE_PROJECT', data)
    }
  }
})
