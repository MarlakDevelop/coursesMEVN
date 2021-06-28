<template>
  <div>
    <v-dialog
      v-model="dialog.isOpened"
      width="500"
      dark
    >
      <v-card>
        <v-card-title class="text-h5 grey darken-4">
          {{ dialog.title }}
        </v-card-title>

        <v-card-text class="pt-6">
          {{ dialog.text }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            text
            @click="dialog.isOpened = false"
          >
            Ок
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
      class="mt-6 mb-6"
      :to="`/control_panel/courses/${this.$route.params.course_id}`"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К курсу
      </div>
    </v-btn>
    <p class="text-h4 mt-6 pt-6">
      {{ title }}
    </p>
    <v-divider></v-divider>
    <v-form v-model="form.valid" class="mt-6">
      <v-text-field
        color="white"
        v-model="form.title"
        :label="'Название урока'"
        :counter="100"
        :rules="form.titleRules"
      ></v-text-field>
      <v-text-field
        color="white"
        v-model="form.rating"
        :label="'Рейтинг'"
        :counter="100"
        :rules="form.ratingRules"
      ></v-text-field>
    </v-form>
    <v-btn
      block
      color="green darken-2"
      class="mt-2"
      :disabled="!form.valid"
      @click="updateLesson()"
    >
      Обновить урок
    </v-btn>
    <v-btn
      block
      color="red darken-2"
      class="mt-6"
      @click="deleteLesson()"
    >
      Удалить урок
    </v-btn>
    <v-divider></v-divider>
    <p class="text-h4 mt-8 mb-3">
      Задачи
    </p>
    <v-btn
      class="mb-10 mt-4"
      :to="`/control_panel/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}/tasks/create`"
    >
      Создание задачи
    </v-btn>
    <v-row dense>
      <v-col
        v-for="item in tasks"
        :key="item.id"
        :cols="12"
        class="mb-3 mt-3"
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
    <p class="text-h4 mt-8 mb-3">
      Материалы
    </p>
    <v-btn
      class="mb-10 mt-4"
      :to="`/control_panel/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}/materials/create`"
    >
      Создание материала
    </v-btn>
    <v-row dense>
      <v-col
        v-for="item in materials"
        :key="item.id"
        :cols="12"
        class="mb-3 mt-3"
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
                Перейти к материалу <v-icon>mdi-arrow-right</v-icon>
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
    await store.dispatch('control/loadLesson', { courseId: route.params.course_id, lessonId: route.params.lesson_id, error, store })
  },
  data() {
    return {
      dialog: {
        isOpened: false,
        title: '',
        text: ''
      },
      form: {
        valid: false,
        title: '',
        titleNeedUpdate: true,
        titleRules: [
          v => !!v || 'Название необходимо',
          v => v.length <= 100 || 'Название должно быть короче 100',
        ],
        rating: '',
        ratingNeedUpdate: true,
        ratingRules: [
          v => !!v || 'Рейтинг необходим',
          v => /^\d*\.?\d*$/.test(v) || 'Рейтинг должен быть целочисленным или дробным числом',
        ]
      }
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    title() {
      if (!!this.$store.getters['control/lesson'].lessonName && !this.form.title && this.form.titleNeedUpdate) {
        this.form.title = Object.assign(this.$store.getters['control/lesson'].lessonName)
        this.form.titleNeedUpdate = false
      }
      if (!!this.$store.getters['control/lesson'].rating && !this.form.rating && this.form.ratingNeedUpdate) {
        this.form.rating = Object.assign(this.$store.getters['control/lesson'].rating)
        this.form.ratingNeedUpdate = false
      }
      return this.$store.getters['control/lesson'].lessonName
    },
    tasks() {
      return this.$store.getters['control/tasks'].map((item) => {
        return {
          ...item,
          link: `/control_panel/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}/tasks/${item.id}`
        }
      })
    },
    materials() {
      return this.$store.getters['control/materials'].map((item) => {
        return {
          ...item,
          link: `/control_panel/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}/materials/${item.id}`
        }
      })
    }
  },
  methods: {
    async updateLesson() {
      await this.$axios.patch(
        `control/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}`,
        {
          name: this.form.title,
          rating: Number(this.form.rating)
        },
        {
          headers: {
            'Authorization': `Bearer ${this.$store.getters['token']}`
          }
        }
      ).then(() => {
        this.$nuxt.refresh()
      }).catch((err) => {
        this.dialog.title = 'Ошибка'
        this.dialog.text = err.response.data.message
        this.dialog.isOpened = true
      })
    },
    async deleteLesson() {
      await this.$axios.$delete(
        `control/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}`,
        {
          headers: {
            'Authorization': `Bearer ${this.$store.getters['token']}`
          }
        }
      ).then(() => {
        this.$router.push(`/control_panel/courses/${this.$route.params.course_id}`)
      }).catch((err) => {
        this.dialog.title = 'Ошибка'
        this.dialog.text = err.response.data.message
        this.dialog.isOpened = true
      })
    }
  }
}
</script>
