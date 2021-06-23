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
      :to="'/control_panel/courses'"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К курсам
      </div>
    </v-btn>
    <p class="text-h4 mt-6 pt-6">
      {{ title }}
    </p>
    <v-divider></v-divider>
    <v-form v-model="form.valid">
      <v-text-field
        label="Название курса"
        color="white"
        v-model="form.title"
        :rules="form.titleRules"
        :counter="100"
      ></v-text-field>
    </v-form>
    <v-btn
      block
      color="green darken-2"
      class="mt-2"
      :disabled="!form.valid"
      @click="updateCourse()"
    >
      Обновить курс
    </v-btn>
    <v-btn
      block
      color="red darken-2"
      class="mt-6"
      @click="deleteCourse()"
    >
      Удалить курс
    </v-btn>
    <v-divider></v-divider>
    <p class="text-h4 mt-8 mb-3">
      Уроки
    </p>
    <v-btn
      class="mb-10 mt-4"
      :to="`/control_panel/courses/${this.$route.params.course_id}/lessons/create`"
    >
      Создание урока
    </v-btn>
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
              <div class="text-h6">
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
  async fetch({ store, route, error }){
    await store.dispatch('control/loadCourse', { courseId: route.params.course_id, error })
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
        titleRules: [
          v => !!v || 'Название необходимо',
          v => v.length <= 100 || 'Название должно быть короче 100',
        ]
      }
    }
  },
  computed: {
    title() {
      if ((!!this.$store.getters['control/course'].courseName && !this.form.title) || this.$store.getters['control/course'].courseName !== this.form.title) {
        this.form.title = this.$store.getters['control/course'].courseName
      }
      return this.$store.getters['control/course'].courseName
    },
    lessons() {
      return this.$store.getters['control/lessons'].map((item) => {
        return {
          ...item,
          link: `/control_panel/courses/${this.$route.params.course_id}/lessons/${item.id}`
        }
      })
    }
  },
  methods: {
    async updateCourse() {
      await this.$axios.patch(
        `control/courses/${this.$route.params.course_id}`,
        {
          name: this.form.title
        }
      ).then(() => {
        this.$nuxt.refresh()
      }).catch((err) => {
        this.dialog.title = 'Ошибка'
        this.dialog.text = err.response.data.message
        this.dialog.isOpened = true
      })
    },
    async deleteCourse() {
      await this.$axios.$delete(
        `control/courses/${this.$route.params.course_id}`
      ).then(() => {
        this.$router.push('/control_panel/courses')
      }).catch((err) => {
        this.dialog.title = 'Ошибка'
        this.dialog.text = err.response.data.message
        this.dialog.isOpened = true
      })
    }
  }
}
</script>
