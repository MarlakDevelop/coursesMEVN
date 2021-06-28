<template>
  <div class="wrapper">
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
      class="mt-6"
      :to="`/control_panel/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}`"
    >
      <v-icon>mdi-chevron-left</v-icon>
      <div class="pr-2 pl-1">К уроку</div>
    </v-btn>
    <p class="text-h4 mt-6 mb-6">
      {{ title }}
    </p>
    <v-form v-model="form.valid">
      <v-text-field
        label="Название"
        v-model="form.title"
        :rules="form.titleRules"
        :counter="100"
        color="white"
      ></v-text-field>
    </v-form>
    <no-ssr>
      <client-only>
        <codemirror
          v-model="form.body"
          :options="cmOptions"
        />
      </client-only>
    </no-ssr>
    <no-ssr>
      <div
        v-html="form.body"
        class="overflow-x-auto overflow-y-auto mt-6 mb-6"
      ></div>
    </no-ssr>
    <v-btn
      block
      color="green darken-2"
      :disabled="!form.valid || !form.body"
      @click="updateTask()"
    >
      Обновить задачу
    </v-btn>
    <v-btn
      block
      color="red darken-2"
      class="mt-6"
      @click="deleteTask()"
    >
      Удалить задачу
    </v-btn>
  </div>
</template>

<script>

export default {
  name: "_task_id",
  middleware: ['auth'],
  async fetch({store, route, error}) {
    await store.dispatch('control/loadTask', {courseId: route.params.course_id, lessonId: route.params.lesson_id, taskId: route.params.task_id, error, store})
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
        bodyNeedUpdate: true,
        body: ''
      },
      cmOptions: {
        tabSize: 4,
        mode: 'text/html',
        theme: 'darcula',
        lineNumbers: true,
        line: true
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
      if (!!this.$store.getters['control/task'].taskName && !this.form.title && this.form.titleNeedUpdate) {
        this.form.title = Object.assign(this.$store.getters['control/task'].taskName)
        this.form.titleNeedUpdate = false
      }
      if (!!this.$store.getters['control/task'].body && !this.form.body && this.form.bodyNeedUpdate) {
        this.form.body = Object.assign(this.$store.getters['control/task'].body)
        this.form.bodyNeedUpdate = false
      }
      return this.$store.getters['control/task'].taskName
    }
  },
  methods: {
    async updateTask() {
      await this.$axios.patch(
        `control/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}/tasks/${this.$route.params.task_id}`,
        {
          name: this.form.title,
          body: this.form.body
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
    async deleteTask() {
      await this.$axios.delete(
        `control/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}/tasks/${this.$route.params.task_id}`,
        {
          headers: {
            'Authorization': `Bearer ${this.$store.getters['token']}`
          }
        }
      ).then(() => {
        this.$router.push(`/control_panel/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}`)
      }).catch((err) => {
        this.dialog.title = 'Ошибка'
        this.dialog.text = err.response.data.message
        this.dialog.isOpened = true
      })
    }
  }
}
</script>
