export const state = () => ({
  group: {
    groupName: '',
    lessons: [],
    students: [],
    waitingTasks: [],
  },
  lesson: {
    lessonName: '',
    tasks: [],
    materials: [],
    students: [],
    isVisible: false,
    tasksTotal: 0
  },
  material: {
    materialName: '',
    body: ''
  },
  task: {
    taskName: '',
    body: '',
    studentsSolutions: []
  },
  solution: {
    id: 0,
    status: 'accepted',
    statusDate: null,
    subSolution: {
      id: 0,
      date: null,
      file: {
        path: '',
        mimeType: '',
        body: ''
      }
    },
    verdict: {
      id: '',
      name: '',
      comment: ''
    },
    history: []
  }
})

export const mutations = {
  setGroup(state, payload) {
    state.group = {
      ...state.group,
      ...payload
    }
  },
  setGroupWaitingTasks(state, payload) {
    state.group.waitingTasks = payload
  },
  setLesson(state, payload) {
    state.lesson = {
      ...state.lesson,
      ...payload
    }
  },
  changeLessonVisibility(state) {
    state.lesson.isVisible = !state.lesson.isVisible
  },
  setTask(state, payload) {
    state.task = {
      ...state.task,
      ...payload
    }
  },
  setMaterial(state, payload) {
    state.material = {
      ...state.material,
      ...payload
    }
  },
  setSolution(state, payload) {
    state.solution = {
      ...state.solution,
      ...payload,
      subSolution: payload.lastSubSolution
    }
    delete state.solution.lastSubSolution
  },
  setSolutionHistory(state, payload) {
    state.solution.history = payload
  },
  setSubSolution(state, payload) {
    state.solution.subSolution = {
      ...state.solution.subSolution,
      ...payload
    }
  },
  setVerdict(state, payload) {
    state.solution.verdict = {
      ...state.solution.verdict,
      ...payload
    }
  }
}

export const actions = {
  async loadGroup({commit}, {courseId, groupId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `teacher/courses/${courseId}/groups/${groupId}`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setGroup', data)
    } catch(e) {
      error(e)
    }
  },
  async loadGroupRating({commit}, {courseId, groupId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `teacher/courses/${courseId}/groups/${groupId}/rating`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setGroup', data)
    } catch(e) {
      error(e)
    }
  },
  async loadGroupWaitingTasks({commit}, {courseId, groupId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `teacher/courses/${courseId}/groups/${groupId}/waiting_tasks`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setGroupWaitingTasks', data['solutions'])
      delete data['solutions']
      commit('setGroup', data)
    } catch(e) {
      error(e)
    }
  },
  async loadLesson({commit}, {courseId, groupId, lessonId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `teacher/courses/${courseId}/groups/${groupId}/lessons/${lessonId}`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setLesson', data)
    } catch(e) {
      error(e)
    }
  },
  changeLessonVisibility({commit}) {
    commit('changeLessonVisibility')
  },
  async loadLessonProgress({commit}, {courseId, groupId, lessonId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `teacher/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/progress`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setLesson', data)
    } catch(e) {
      error(e)
    }
  },
  async loadTask({commit}, {courseId, groupId, lessonId, taskId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `teacher/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/tasks/${taskId}`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setTask', data)
    } catch(e) {
      error(e)
    }
  },
  async loadSolution({commit}, {courseId, groupId, lessonId, taskId, solutionId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `teacher/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/tasks/${taskId}/solutions/${solutionId}`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setSolution', data)
    } catch(e) {
      error(e)
    }
  },
  async loadSolutionHistory({commit}, {courseId, groupId, lessonId, taskId, solutionId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `teacher/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/tasks/${taskId}/solutions/${solutionId}/history`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setSolutionHistory', data['answers'])
    } catch(e) {
      error(e)
    }
  },
  async loadMaterial({commit}, {courseId, groupId, lessonId, materialId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `teacher/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/materials/${materialId}`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setMaterial', data)
    } catch(e) {
      error(e)
    }
  },
  async loadSubSolution({commit}, {courseId, groupId, lessonId, taskId, solutionId, subSolutionId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `teacher/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/tasks/${taskId}/solutions/${solutionId}/solutions/${subSolutionId}`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      data['id'] = subSolutionId
      commit('setSubSolution', data)
    } catch(e) {
      error(e)
    }
  },
  async loadVerdict({commit}, {courseId, groupId, lessonId, taskId, solutionId, verdictId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `teacher/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/tasks/${taskId}/solutions/${solutionId}/verdicts/${verdictId}`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      data['id'] = verdictId
      commit('setVerdict', data)
    } catch(e) {
      error(e)
    }
  }
}

export const getters = {
  group: s => s.group,
  lesson: s => s.lesson,
  material: s => s.material,
  task: s => s.task,
  solution: s => s.solution
}
