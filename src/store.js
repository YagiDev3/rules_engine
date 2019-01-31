import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ruleSteps: [{}]
  },
  mutations: {
    setRuleStep (state, payload) {
      state.ruleSteps = payload
    }
  },
  actions: {
    addRuleStep ({ commit }, payload) {
      const steps = []
      steps.push(payload)
      console.log(payload)
      commit('setRuleStep', steps)
    }
  },
  getters: {
    loadSteps: state => {
      return state.ruleSteps
    }
  }
})
