export const state = () => ({
  studyingCourses: [],
  teachingGroups: [],
  isController: false,
  profileFullName: '',
  ratedCourses: []
})

export const mutations = {
  setStudyingCourses(state, payload) {
    state.studyingCourses = payload
  },
  setTeachingGroups(state, payload) {
    state.teachingGroups = payload
  },
  setController(state, payload) {
    state.isController = payload
  },
  setProfileFullName(state, payload) {
    state.profileFullName = payload
  },
  setProfileRatingCards(state, payload) {
    state.ratedCourses = payload
  }
}

export const actions = {
  async loadCoursesGroupsAndIsController({commit}, {store}) {
    const data = await this.$axios.$get(
      'main',
      {
        headers: {
          'Authorization': `Bearer ${store?.getters['token']}`
        }
      }
    )
    commit('setStudyingCourses', !!data['studyingCourses'] ? data['studyingCourses'] : [] )
    commit('setTeachingGroups', !!data['teachingGroups'] ? data['teachingGroups'] : [])
    commit('setController', !!data['isController'] ? data['isController'] : false)
  },
  async loadProfile({commit}, {store}) {
    const data = await this.$axios.$get(
      'main/profile',
      {
        headers: {
          'Authorization': `Bearer ${store?.getters['token']}`
        }
      }
    )
    commit('setProfileFullName', data['fullName'] ? data['fullName'] : '' )
    commit('setProfileRatingCards', data['courses'] ? data['courses'] : [])
  }
}

export const getters = {
  studyingCourses: s => s.studyingCourses,
  teachingGroups: s => s.teachingGroups,
  isController: s => s.isController,
  profileFullName: s => s.profileFullName,
  ratedCourses: s => s.ratedCourses
}
