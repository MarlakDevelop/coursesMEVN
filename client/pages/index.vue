<template>
  <div>
    <div v-if="courses.length === 0 && groups.length === 0 && !isController">
      <h1 class="mt-10 text-center">Для вас здесь пока что ничего нет</h1>
    </div>
    <div v-if="courses.length !== 0">
      <h2 class="text-h4 mb-6">
        Курсы
      </h2>
      <v-row dense>
        <v-col
          v-for="item in courses"
          :key="item.id"
          :cols="($vuetify.breakpoint.sm || $vuetify.breakpoint.xs) ? 12 : ($vuetify.breakpoint.md ? 6 : 4)"
          height="300px"
          class="mb-3"
        >
          <v-card
            class="card-outter"
            height="200px"
          >
            <v-card-text>
              <p class="text-h6 text--primary">
                {{ item.name }}
              </p>
            </v-card-text>
            <v-card-actions class="card-actions">
              <v-btn
                :to="item.link"
              >
                Перейти к курсу <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-if="groups.length !== 0">
      <v-divider class="mt-6 pt-6"></v-divider>
      <h2 class="text-h4 mb-6">
        Ваши группы
      </h2>
      <v-row dense>
        <v-col
          v-for="item in groups"
          :key="item.id"
          :cols="($vuetify.breakpoint.sm || $vuetify.breakpoint.xs) ? 12 : ($vuetify.breakpoint.md ? 6 : 4)"
          height="300px"
          class="mb-3"
        >
          <v-card
            class="card-outter"
            height="200px"
          >
            <v-card-text>
              <p class="text-h6 text--primary">
                {{ item.name }}
              </p>
            </v-card-text>
            <v-card-actions class="card-actions">
              <v-btn
                :to="item.link"
              >
                Перейти к группе <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-if="isController">
      <v-divider class="mt-6 pt-6"></v-divider>
      <h2 class="text-h4 mb-6">
        Панель контроля
      </h2>
      <div class="d-flex">
        <v-btn
          :to="'/control_panel/users'"
          class="mr-4 mb-4"
        >
          Просмотреть пользователей
        </v-btn>
        <v-btn
          :to="'/control_panel/courses'"
          class="mr-4 mb-4"
        >
          Просмотреть курсы
        </v-btn>
        <v-btn
          :to="'/control_panel/groups'"
          class="mr-4 mb-4"
        >
          Просмотреть группы
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  middleware: ['auth'],
  components: {
    Logo,
    VuetifyLogo
  },
  async fetch({store}) {
    await store.dispatch('main/loadCoursesGroupsAndIsController', {store})
  },
  head() {
    return {
      title: 'Главная',
    }
  },
  computed: {
    courses() {
      return this.$store.getters['main/studyingCourses'].map((elem) => {
        return {
          ...elem,
          link: `/courses/${elem.id}/groups/${elem.groupId}`
        }
      })
    },
    groups() {
      return this.$store.getters['main/teachingGroups'].map((elem) => {
        return {
          ...elem,
          link: `/teacher_panel/courses/${elem.courseId}/groups/${elem.id}`
        }
      })
    },
    isController() {
      return this.$store.getters['main/isController']
    }
  }
}
</script>
