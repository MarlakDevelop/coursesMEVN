export const state = () => ({
  users: [],
  user: {
    login: '',
    fullName: ''
  },
  courses: [],
  course: {
    courseName: ''
  },
  lessons: [],
  lesson: {
    lessonName: '',
    rating: 0
  },
  tasks: [],
  task: {
    taskName: '',
    body: ''
  },
  materials: [],
  material: {
    materialName: '',
    body: ''
  },
  groups: [],
  group: {
    groupName: '',
    teacher: {
      fullName: '',
      login: ''
    },
    students: []
  }
})

export const mutations = {
  setUsers(state, payload) {
    state.users = payload
  },
  setUser(state, payload) {
    state.user = {
      ...state.user,
      ...payload
    }
  },
  setCourses(state, payload) {
    state.courses = payload
  },
  setCourse(state, payload) {
    state.course = {
      ...state.course,
      ...payload
    }
  },
  setLessons(state, payload) {
    state.lessons = payload
  },
  setLesson(state, payload) {
    state.lesson = {
      ...state.lesson,
      ...payload
    }
  },
  setTasks(state, payload) {
    state.tasks = payload
  },
  setTask(state, payload) {
    state.task = {
      ...state.task,
      ...payload
    }
  },
  setMaterials(state, payload) {
    state.materials = payload
  },
  setMaterial(state, payload) {
    state.material = {
      ...state.material,
      ...payload
    }
  },
  setGroups(state, payload) {
    state.groups = payload
  },
  setGroup(state, payload) {
    state.group = {
      ...state.group,
      ...payload
    }
  },
}

export const actions = {
  async loadUsers({commit}, {error}) {
    try {
      const data = await this.$axios.$get(`control/users`)
      commit('setUsers', data)
    } catch(e) {
      error(e)
    }
  },
  async loadUser({commit}, {userId, error}) {
    try {
      const data = await this.$axios.$get(`control/users/${userId}`)
      commit('setUser', data)
    } catch(e) {
      error(e)
    }
  },
  async loadCourses({commit}, {error}) {
    try {
      const data = await this.$axios.$get(`control/courses`)
      commit('setCourses', data)
    } catch(e) {
      error(e)
    }
  },
  async loadCourse({commit}, {courseId, error}) {
    try {
      const data = await this.$axios.$get(`control/courses/${courseId}`)
      commit('setCourse', data)
      commit('setLessons', data['lessons'])
    } catch(e) {
      error(e)
    }
  },
  async loadLesson({commit}, {courseId, lessonId, error}) {
    try {
      const data = await this.$axios.$get(`control/courses/${courseId}/lessons/${lessonId}`)
      commit('setLesson', data)
      commit('setTasks', data['tasks'])
      commit('setMaterials', data['materials'])
    } catch(e) {
      error(e)
    }
  },
  async loadTask({commit}, {courseId, lessonId, taskId, error}) {
    try {
      const data = await this.$axios.$get(`control/courses/${courseId}/lessons/${lessonId}/tasks/${taskId}`)
      commit('setTask', data)
    } catch (e) {
      error(e)
    }
  },
  async loadMaterial({commit}, {courseId, lessonId, materialId, error}) {
    try {
      const data = await this.$axios.$get(`control/courses/${courseId}/lessons/${lessonId}/materials/${materialId}`)
      commit('setMaterial', data)
    } catch (e) {
      error(e)
    }
  },
  async loadGroups({commit}, {error}) {
    try {
      const data = await this.$axios.$get(`control/groups`)
      commit('setGroups', data)
    } catch (e) {
      error(e)
    }
  },
  async loadGroup({commit}, {groupId, error}) {
    try {
      const data = await this.$axios.$get(`control/groups/${groupId}`)
      commit('setGroup', data)
    } catch (e) {
      error(e)
    }
  },
  async loadUsersExcludeTeacher({commit}, {groupId, error}) {
    try {
      const data = await this.$axios.$get(`control/groups/${groupId}/users_exclude_teacher`)
      commit('setUsers', data)
    } catch (e) {
      error(e)
    }
  },
  async loadUsersExcludeStudents({commit}, {groupId, error}) {
    try {
      const data = await this.$axios.$get(`control/groups/${groupId}/users_exclude_students`)
      commit('setUsers', data)
    } catch (e) {
      error(e)
    }
  }
}

export const getters = {
  users: s => s.users,
  user: s => s.user,
  courses: s => s.courses,
  course: s => s.course,
  lessons: s => s.lessons,
  lesson: s => s.lesson,
  tasks: s => s.tasks,
  task: s => s.task,
  materials: s => s.materials,
  material: s => s.material,
  groups: s => s.groups,
  group: s => s.group,
}
