<template>
  <div>
    <p class="text-h4 mt-6 pt-6" v-if="!!courseName">
      {{ courseName }}
    </p>
    <p class="text-h6" v-if="!!teacherFullName">
      Преподаватель: {{ teacherFullName }}
    </p>
    <v-divider v-if="lessons.length !== 0"></v-divider>
    <p class="text-h4 mt-6 mb-3" v-if="lessons.length !== 0">
      Уроки
    </p>
    <h1 class="mt-10 text-center" v-else>
      Для вас здесь пока что ничего нет
    </h1>
    <v-row dense>
      <v-col
        v-for="item in lessons"
        :key="item.id"
        :cols="12"
        class="mb-3 mt-3"
      >
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <div class="mb-2 text-h6">
                {{ item.name }}
              </div>
              <v-progress-linear
                v-model="item.tasksAccepted / item.tasksTotal * 100"
                color="green"
              ></v-progress-linear>
              <div class="text-caption">
                <b class="green--text text--accent-4">{{ item.tasksAccepted }}</b> / {{ item.tasksTotal }} задач зачтено
              </div>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                :to="item.link"
              >
                Перейти к уроку <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "index",
  async fetch({ store, route, error }){
    await store.dispatch('student/loadCourse', { courseId: route.params.course_id, groupId: route.params.group_id, error })
  },
  computed: {
    courseName() {
      return this.$store.getters['student/course'].courseName
    },
    teacherFullName() {
      return this.$store.getters['student/course'].teacherFullName
    },
    lessons() {
      return this.$store.getters['student/course'].lessons.map((elem) => {
        return {
          ...elem,
          link: `/courses/${this.$route?.params.course_id}/groups/${this.$route?.params.group_id}/lessons/${elem.id}`
        }
      })
    }
  }
}
</script>
