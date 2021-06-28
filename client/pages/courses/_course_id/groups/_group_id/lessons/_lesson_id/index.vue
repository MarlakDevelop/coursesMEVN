<template>
  <div>
    <v-btn
      class="mt-6"
      :to="`/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}`"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К курсу
      </div>
    </v-btn>
    <p class="text-h4 mt-4">
      {{ title }}
    </p>
    <v-progress-linear
      :value="tasksAccepted / tasksTotal * 100"
      color="green"
      class="linear-progress-bar--small"
    ></v-progress-linear>
    <div class="mb-6">
      <b class="green--text text--accent-4">{{ tasksAccepted }}</b> / {{ tasksTotal }} задач зачтено
    </div>
    <v-divider></v-divider>
    <v-row>
      <v-col
        :cols="($vuetify.breakpoint.sm || $vuetify.breakpoint.xs) ? 12 : 9"
      >
        <p class="text-h4 mt-6 mb-3">
          Задачи
        </p>
        <p v-if="tasks.length === 0">
          Здесь пока нет задач
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
                  <div v-if="!!item.solution">
                    <v-icon
                      v-if="item.solution.status === 'accepted'"
                      color="green"
                    >
                      mdi-checkbox-marked-circle
                    </v-icon>
                    <v-icon
                      v-else-if="item.solution.status === 'rejected'"
                      color="red"
                    >
                      mdi-close-circle
                    </v-icon>
                    <v-icon
                      v-else-if="item.solution.status === 'waiting'"
                      color="grey"
                    >
                      mdi-clock-time-five
                    </v-icon>
                  </div>
                  <v-icon
                    v-else
                    color="grey darken-3"
                  >
                    mdi-record-circle
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <div class="text-h6">
                    {{ item.name }}
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
      </v-col>
      <v-col
        :cols="($vuetify.breakpoint.sm || $vuetify.breakpoint.xs) ? 12 : 3"
      >
        <p class="text-h5 mt-6 mb-3">
          Материалы
        </p>
        <v-list
          :style="{ backgroundColor: 'transparent' }"
        >
          <p v-if="materials.length === 0">
            Здесь пока нет материалов
          </p>
          <v-list-item
            v-for="item in materials"
            :to="item.link"
            class="mb-3"
          >
            <v-list-item-action class="ml-0 mr-2 pl-0">
              <v-icon>
                mdi-clipboard-text-outline
              </v-icon>
            </v-list-item-action>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "index",
  middleware: ['auth'],
  async fetch({ store, route, error }){
    await store.dispatch('student/loadLesson', {
      courseId: route.params.course_id,
      groupId: route.params.group_id,
      lessonId: route.params.lesson_id,
      error, store
    })
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    title() {
      return this.$store.getters['student/lesson'].lessonName
    },
    tasksAccepted() {
      return this.$store.getters['student/lesson'].tasksAccepted
    },
    tasksTotal() {
      return this.$store.getters['student/lesson'].tasksTotal
    },
    tasks() {
      return this.$store.getters['student/lesson'].tasks.map((elem) => {
        return {
          ...elem,
          link: !!elem.solution
            ? `/courses/${this.$route?.params.course_id}/groups/${this.$route?.params.group_id}/lessons/${this.$route?.params.lesson_id}/tasks/${elem.id}/solutions/${elem.solution.id}`
            : `/courses/${this.$route?.params.course_id}/groups/${this.$route?.params.group_id}/lessons/${this.$route?.params.lesson_id}/tasks/${elem.id}`
        }
      })
    },
    materials() {
      return this.$store.getters['student/lesson'].materials.map((elem) => {
        return {
          ...elem,
          link: `/courses/${this.$route?.params.course_id}/groups/${this.$route?.params.group_id}/lessons/${this.$route?.params.lesson_id}/materials/${elem.id}`
        }
      })
    },
  }
}
</script>

<style>

</style>
