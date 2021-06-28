<template>
  <div class="wrapper">
    <v-btn
      class="mt-6"
      :to="`/teacher_panel/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}`"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К группе
      </div>
    </v-btn>
    <p class="text-h4 mt-6 pt-6">
      {{ groupName }}
    </p>
    <p class="text-h5 mt-6 mb-3">
      Задачи, ожидающие проверки
    </p>
    <v-row dense>
      <v-col
        v-for="item in tasks"
        :key="item.id"
        :cols="12"
        class="mb-1 mt-1"
      >
        <v-card>
          <v-list-item>
            <v-list-item-action class="mr-3">
              <v-icon
                color="grey"
              >
                mdi-clock-time-five
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <div class="text-h6">
                {{ item.taskName }}
              </div>
              <div class="text-caption">
                {{ item.studentFullName }}
              </div>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                :to="item.link"
              >
                Перейти к задаче <v-icon>mdi-arrow-right</v-icon>
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
  name: "waiting_tasks",
  middleware: ['auth'],
  async fetch({ store, route, error }){
    await store.dispatch('teacher/loadGroupWaitingTasks', { courseId: route.params.course_id, groupId: route.params.group_id, error, store })
  },
  head() {
    return {
      title: this.groupName,
    }
  },
  computed: {
    groupName() {
      return this.$store.getters['teacher/group'].groupName
    },
    tasks() {
      return this.$store.getters['teacher/group'].waitingTasks.map((item) => {
        return {
          ...item,
          link: `/teacher_panel/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}/lessons/${item.lessonId}/tasks/${item.taskId}/solutions/${item.id}`
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
