export const state = () => ({
  token: null,
  fullName: ''
})

export const mutations = {
  setToken(state, payload) {
    state.token = payload
    localStorage.setItem('token', payload)
  },
  clearToken(state) {
    state.token = null
    localStorage.removeItem('token')
  },
  setFullName(state, payload) {
    state.fullName = payload
  }
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('loadMe')
  },
  login({commit}, {token}) {
    commit('setToken', token)
  },
  logout({commit}) {
    commit('clearToken')
  },
  async loadMe({commit}) {
    try {
      const data = await this.$axios.$get('auth/me')
      commit('setFullName', data['fullName'])
    } catch(e) {
    }
  }
}

export const getters = {
  hasToken: s => !!s.token,
  fullName: s => s.fullName
}
