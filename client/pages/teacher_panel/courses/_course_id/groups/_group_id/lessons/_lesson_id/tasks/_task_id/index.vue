<template>
  <div class="wrapper">
    <v-btn
      class="mt-6"
      :to="`/teacher_panel/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}/lessons/${this.$route.params.lesson_id}`"
    >
      <v-icon>mdi-chevron-left</v-icon>
      <div class="pr-2 pl-1">К уроку</div>
    </v-btn>
    <p class="text-h4 mt-6 mb-6">
      {{ title }}
    </p>
    <v-row>
      <v-col
        :cols="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 12 : 9"
      >
        <div
          v-html="body"
          class="overflow-x-auto overflow-y-auto"
        ></div>
      </v-col>
      <v-col
        :cols="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 12 : 3"
      >
        <v-card>
          <v-card-title class="justify-center">
            <div>
              Прогресс учащихся
            </div>
          </v-card-title>
          <v-list
            dark
            class="ml-4 mr-4"
          >
            <v-list-item
              v-for="item in solutions"
              :to="item.link"
              class="mt-2 mb-2"
            >
              <v-list-item-title>
                {{ item.studentFullName }}
              </v-list-item-title>
              <v-spacer></v-spacer>
              <v-list-item-action>
                <v-icon
                  v-if="item.status === 'accepted'"
                  color="green"
                >
                  mdi-checkbox-marked-circle
                </v-icon>
                <v-icon
                  v-else-if="item.status === 'rejected'"
                  color="red"
                >
                  mdi-close-circle
                </v-icon>
                <v-icon
                  v-else-if="item.status === 'waiting'"
                  color="grey"
                >
                  mdi-clock-time-five
                </v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: "_task_id",
  middleware: ['auth'],
  async fetch({ store, route, error }){
    await store.dispatch('teacher/loadTask', { courseId: route.params.course_id, groupId: route.params.group_id, lessonId: route.params.lesson_id, taskId: route.params.task_id, error, store })
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    title() {
      return this.$store.getters['teacher/task'].taskName
    },
    body() {
      return this.$store.getters['teacher/task'].body
    },
    solutions() {
      return this.$store.getters['teacher/task'].studentsSolutions.map((item) => {
        return {
          ...item,
          link: `/teacher_panel/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}/lessons/${this.$route.params.lesson_id}/tasks/${this.$route.params.task_id}/solutions/${item.id}`
        }
      })
    }
  }
}
</script>
