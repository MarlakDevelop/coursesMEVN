<template>
  <div class="wrapper">
    <v-btn
      class="mt-6"
      :to="`/teacher_panel/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}/lessons/${( this.$route.params.lesson_id )}`"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К уроку
      </div>
    </v-btn>
    <p class="text-h4 mt-6 pt-6">
      {{ lessonName }}
    </p>
    <v-divider></v-divider>
    <p class="text-h5 mt-6 mb-3">
      Прогресс учащихся
    </p>
    <v-row>
      <v-col
        v-for="item in students"
        :key="item.id"
        :cols="12"
      >
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <div class="mb-2 text-h6">
                {{ item.fullName }}
              </div>
              <v-progress-linear
                v-model="item.tasksAccepted / tasksTotal * 100"
                color="green"
              ></v-progress-linear>
              <div class="text-caption">
                <b class="green--text text--accent-4">{{ item.tasksAccepted }}</b> / {{ tasksTotal }} задач зачтено
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "index",
  middleware: ['auth'],
  async fetch({ store, route, error }){
    await store.dispatch('teacher/loadLessonProgress', { courseId: route.params.course_id, groupId: route.params.group_id, lessonId: route.params.lesson_id, error, store })
  },
  head() {
    return {
      title: this.lessonName,
    }
  },
  computed: {
    lessonName() {
      return this.$store.getters['teacher/lesson'].lessonName
    },
    students() {
      return this.$store.getters['teacher/lesson'].students
    },
    isVisible() {
      return this.$store.getters['teacher/lesson'].isVisible
    },
    tasksTotal() {
      return this.$store.getters['teacher/lesson'].tasksTotal
    }
  }
}
</script>
