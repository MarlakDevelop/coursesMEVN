const cookieparser = process.server ? require('cookieparser') : undefined


export const state = () => ({
  token: null,
  fullName: ''
})

export const mutations = {
  setToken(state, payload) {
    state.token = payload
  },
  clearToken(state) {
    state.token = null
  },
  setFullName(state, payload) {
    state.fullName = payload
  }
}

export const actions = {
  nuxtServerInit({ dispatch, commit }, { req }) {
    let token = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        token = parsed.token
      } catch (err) {
      }
    }
    commit('setToken', token)
    dispatch('loadMe', {token})
  },
  login({commit, dispatch}, {token}) {
    commit('setToken', token)
    dispatch('loadMe', {token})
  },
  logout({commit}) {
    commit('clearToken')
  },
  async loadMe({commit}, {token}) {
    try {
      const data = await this.$axios.$get(
        'auth/me',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      commit('setFullName', data['fullName'])
    } catch(e) {
    }
  }
}

export const getters = {
  hasToken: s => !!s.token,
  token: s => s.token,
  fullName: s => s.fullName
}
