<template>
  <div>
    <p class="text-h4 mt-6 pt-6">
      {{ groupName }}
    </p>
    <div class="d-flex pb-4 pt-4 flex-wrap">
      <v-btn
        class="mb-4 mt-4 mr-4"
        :to="`/teacher_panel/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}/rating`"
      >
        Рейтинг учащихся
      </v-btn>
      <v-btn
        class="mb-4 mt-4 mr-4"
        :to="`/teacher_panel/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}/waiting_tasks`"
      >
        Ожидающие проверки задачи
      </v-btn>
    </div>
    <v-divider></v-divider>
    <p class="text-h4 mt-6 mb-3">
      Уроки
    </p>
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
              <div :class="item.isVisible ? 'text-h6' : 'text-h6 grey--text darken-4'">
                {{ item.name }}
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
  middleware: ['auth'],
  async fetch({ store, route, error }){
    await store.dispatch('teacher/loadGroup', { courseId: route.params.course_id, groupId: route.params.group_id, error, store })
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
    lessons() {
      return this.$store.getters['teacher/group'].lessons.map((elem) => {
        return {
          ...elem,
          link: `/teacher_panel/courses/${this.$route?.params.course_id}/groups/${this.$route?.params.group_id}/lessons/${elem.id}`
        }
      })
    }
  }
}
</script>
