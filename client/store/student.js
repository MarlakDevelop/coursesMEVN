export const state = () => ({
  course: {
    courseName: '',
    teacherFullName: '',
    lessons: []
  },
  lesson: {
    lessonName: '',
    tasksAccepted: 0,
    tasksTotal: 0,
    tasks: [],
    materials: []
  },
  material: {
    materialName: '',
    body: ''
  },
  task: {
    taskName: '',
    body: '',
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
        name: '',
        comment: ''
      },
      history: []
    },
    tasks: []
  }
})

export const mutations = {
  setCourse(state, payload) {
    state.course = {
      ...state.course,
      ...payload
    }
  },
  setLesson(state, payload) {
    state.lesson = {
      ...state.lesson,
      ...payload
    }
  },
  setMaterial(state, payload) {
    state.material = {
      ...state.material,
      ...payload
    }
  },
  setTask(state, payload) {
    state.task = {
      ...state.task,
      ...payload
    }
  },
  setSolution(state, payload) {
    state.task.solution = {
      ...state.task.solution,
      ...payload,
      subSolution: payload.lastSubSolution
    }
    delete state.task.solution.lastSubSolution
  },
  setSolutionHistory(state, payload) {
    state.task.solution.history = payload
  },
  setSubSolution(state, payload) {
    state.task.solution.subSolution = {
      ...state.task.solution.subSolution,
      ...payload
    }
  },
  setVerdict(state, payload) {
    state.task.solution.verdict = {
      ...state.task.solution.verdict,
      ...payload
    }
  },
  clearTaskData(state) {
    state.task = {
      taskName: '',
      body: '',
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
          name: '',
          comment: ''
        },
        history: []
      },
      tasks: []
    }
  }
}

export const actions = {
  async loadCourse({commit}, {courseId, groupId, error}) {
    try {
      const data = await this.$axios.$get(`student/courses/${courseId}/groups/${groupId}`)
      commit('setCourse', data)
    } catch(e) {
      error(e)
    }
  },
  async loadLesson({commit}, {courseId, groupId, lessonId, error}) {
    try {
      const data = await this.$axios.$get(`student/courses/${courseId}/groups/${groupId}/lessons/${lessonId}`)
      commit('setLesson', data)
    } catch(e) {
      error(e)
    }
  },
  async loadMaterial({commit}, {courseId, groupId, lessonId, materialId, error}) {
    try {
      const data = await this.$axios.$get(`student/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/materials/${materialId}`)
      commit('setMaterial', data)
    } catch(e) {
      error(e)
    }
  },
  async loadTask({commit}, {courseId, groupId, lessonId, taskId, error}) {
    try {
      const data = await this.$axios.$get(`student/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/tasks/${taskId}`)
      commit('setTask', data)
    } catch(e) {
      error(e)
    }
  },
  async loadTaskAndSolution({commit}, {courseId, groupId, lessonId, taskId, solutionId, error}) {
    try {
      const taskData = await this.$axios.$get(`student/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/tasks/${taskId}`)
      const solutionData = await this.$axios.$get(`student/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/tasks/${taskId}/solutions/${solutionId}`)
      const historyData = await this.$axios.$get(`student/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/tasks/${taskId}/solutions/${solutionId}/history`)
      commit('setTask', taskData)
      commit('setSolution', solutionData)
      commit('setSolutionHistory', historyData['answers'])
    } catch(e) {
      error(e)
    }
  },
  async loadSubSolution({commit}, {courseId, groupId, lessonId, taskId, solutionId, subSolutionId, error}) {
    try {
      const data = await this.$axios.$get(`student/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/tasks/${taskId}/solutions/${solutionId}/solutions/${subSolutionId}`)
      data['id'] = subSolutionId
      commit('setSubSolution', data)
    } catch (e) {
      error(e)
    }
  },
  async loadVerdict({commit}, {courseId, groupId, lessonId, taskId, solutionId, verdictId, error}) {
    try {
      const data = await this.$axios.$get(`student/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/tasks/${taskId}/solutions/${solutionId}/verdicts/${verdictId}`)
      commit('setVerdict', data)
    } catch (e) {
      error(e)
    }
  }
}

export const getters = {
  course: s => s.course,
  lesson: s => s.lesson,
  material: s => s.material,
  task: s => s.task
}
