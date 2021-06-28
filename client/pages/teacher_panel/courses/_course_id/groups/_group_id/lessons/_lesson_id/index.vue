<template>
  <div>
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
    <p class="text-h4 mt-6 mb-0">
      {{ lessonName }}
    </p>
    <div class="d-flex mb-4 flex-wrap">
      <v-btn
        class="mb-4 mt-4 mr-4"
        color="red darken-2"
        v-if="isVisible"
        @click="changeVisibility()"
      >
        Закрыть Доступ
      </v-btn>
      <v-btn
        class="mb-4 mt-4 mr-4"
        color="green darken-2"
        v-else
        @click="changeVisibility()"
      >
        Открыть Доступ
      </v-btn>
      <v-btn
        class="mb-4 mt-4 mr-4"
        :to="`/teacher_panel/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}/lessons/${this.$route.params.lesson_id}/progress`"
      >
        Прогресс учащихся
      </v-btn>
    </div>
    <v-divider></v-divider>
    <v-row>
      <v-col
        :cols="($vuetify.breakpoint.sm || $vuetify.breakpoint.xs) ? 12 : 9"
      >
        <p class="text-h4 mt-6 mb-3">
          Задачи
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
    await store.dispatch('teacher/loadLesson', { courseId: route.params.course_id, groupId: route.params.group_id, lessonId: route.params.lesson_id, error, store })
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
    tasks() {
      return this.$store.getters['teacher/lesson'].tasks.map((elem) => {
        return {
          ...elem,
          link: `/teacher_panel/courses/${this.$route?.params.course_id}/groups/${this.$route?.params.group_id}/lessons/${this.$route?.params.lesson_id}/tasks/${elem.id}`
        }
      })
    },
    materials() {
      return this.$store.getters['teacher/lesson'].materials.map((elem) => {
        return {
          ...elem,
          link: `/teacher_panel/courses/${this.$route?.params.course_id}/groups/${this.$route?.params.group_id}/lessons/${this.$route?.params.lesson_id}/materials/${elem.id}`
        }
      })
    },
    isVisible() {
      return this.$store.getters['teacher/lesson'].isVisible
    },
  },
  methods: {
    async changeVisibility() {
      await this.$axios.$patch(
        `/teacher/courses/${this.$route?.params.course_id}/groups/${this.$route?.params.group_id}/lessons/${this.$route?.params.lesson_id}/set_visibility`,
        {
          visible: !this.isVisible
        },
        {
          headers: {
            'Authorization': `Bearer ${this.$store.getters['token']}`
          }
        }
      ).then(() => {
        this.$store.dispatch('teacher/changeLessonVisibility')
      }).catch()
    }
  }
}
</script>

<style scoped>

</style>
