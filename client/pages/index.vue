<template>
  <div>
    <div>
      <h2 class="text-h4 mb-6">
        Курсы
      </h2>
      <v-row dense>
        <v-col
          v-for="item in courses"
          :key="item.name"
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
    <div>
      <v-divider class="mt-6 pt-6"></v-divider>
      <h2 class="text-h4 mb-6">
        Ваши группы
      </h2>
      <v-row dense>
        <v-col
          v-for="item in groups"
          :key="item.name"
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
    <div>
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
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      courses: [
        {
          name: 'Курс программирование на языке Python',
          link: '/courses/1/groups/1'
        },
        {
          name: 'Курс разработка веб интерфейсов и веб-приложений',
          link: '/courses/2/groups/1'
        }
      ],
      groups: [
        {
          name: 'Курс программирование на языке Python, Группа 1',
          link: '/teacher_panel/courses/1/groups/1'
        },
        {
          name: 'Курс программирование на языке Python, Группа 2',
          link: '/teacher_panel/courses/1/groups/2'
        },
        {
          name: 'Курс разработка веб интерфейсов и веб-приложений, Группа 1',
          link: '/teacher_panel/courses/2/groups/1'
        },
        {
          name: 'Курс разработка веб интерфейсов и веб-приложений, Группа 2',
          link: '/teacher_panel/courses/2/groups/2'
        }
      ]
    }
  }
}
</script>
