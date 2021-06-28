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
  async loadUsers({commit}, {store, error}) {
    try {
      const data = await this.$axios.$get(
        `control/users`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setUsers', data)
    } catch(e) {
      error(e)
    }
  },
  async loadUser({commit}, {userId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `control/users/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setUser', data)
    } catch(e) {
      error(e)
    }
  },
  async loadCourses({commit}, {store, error}) {
    try {
      const data = await this.$axios.$get(
        `control/courses`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setCourses', data)
    } catch(e) {
      error(e)
    }
  },
  async loadCourse({commit}, {courseId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `control/courses/${courseId}`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setCourse', data)
      commit('setLessons', data['lessons'])
    } catch(e) {
      error(e)
    }
  },
  async loadLesson({commit}, {courseId, lessonId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `control/courses/${courseId}/lessons/${lessonId}`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setLesson', data)
      commit('setTasks', data['tasks'])
      commit('setMaterials', data['materials'])
    } catch(e) {
      error(e)
    }
  },
  async loadTask({commit}, {courseId, lessonId, taskId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `control/courses/${courseId}/lessons/${lessonId}/tasks/${taskId}`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setTask', data)
    } catch (e) {
      error(e)
    }
  },
  async loadMaterial({commit}, {courseId, lessonId, materialId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `control/courses/${courseId}/lessons/${lessonId}/materials/${materialId}`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setMaterial', data)
    } catch (e) {
      error(e)
    }
  },
  async loadGroups({commit}, {store, error}) {
    try {
      const data = await this.$axios.$get(
        `control/groups`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setGroups', data)
    } catch (e) {
      error(e)
    }
  },
  async loadGroup({commit}, {groupId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `control/groups/${groupId}`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setGroup', data)
    } catch (e) {
      error(e)
    }
  },
  async loadUsersExcludeTeacher({commit}, {groupId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `control/groups/${groupId}/users_exclude_teacher`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
      commit('setUsers', data)
    } catch (e) {
      error(e)
    }
  },
  async loadUsersExcludeStudents({commit}, {groupId, store, error}) {
    try {
      const data = await this.$axios.$get(
        `control/groups/${groupId}/users_exclude_students`,
        {
          headers: {
            'Authorization': `Bearer ${store?.getters['token']}`
          }
        }
      )
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
