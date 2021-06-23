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
      class="mt-6 mb-6"
      :to="`/control_panel/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}`"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К уроку
      </div>
    </v-btn>
    <div class="text-h4 mb-6 mt-6">
      Создание задачи
    </div>
    <v-form v-model="form.valid">
      <v-text-field
        label="Название"
        v-model="form.title"
        :rules="form.titleRules"
        :counter="100"
        color="white"
      >

      </v-text-field>
    </v-form>
    <div class="text-h5">Тело задачи</div>
    <no-ssr>
      <client-only>
        <codemirror
          v-model="form.body"
          :options="cmOptions"
        />
      </client-only>
    </no-ssr>
    <div
      v-html="form.body"
      class="overflow-x-auto overflow-y-auto mt-6 mb-6"
    ></div>
    <v-btn
      block
      class="green darken-2"
      :disabled="!form.valid || !form.body"
      @click="createTask()"
    >
      Создать задачу
    </v-btn>
  </div>
</template>
<script>
export default {
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
        ],
        body: ''
      },
      cmOptions: {
        tabSize: 4,
        mode: 'text/html',
        theme: 'darcula',
        lineNumbers: true,
        line: true
      },
    }
  },
  methods: {
    async createTask() {
      await this.$axios.post(
        `control/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}/tasks`,
        {
          name: this.form.title,
          body: this.form.body
        }
      ).then(() => {
        this.dialog.title = 'Успех'
        this.dialog.text = 'Задача успешно создана'
        this.dialog.isOpened = true
        this.form.title = ''
        this.form.body = ''
      }).catch((err) => {
        this.dialog.title = 'Ошибка'
        this.dialog.text = err.response.data.message
        this.dialog.isOpened = true
      })
    }
  }
};
</script>

<style></style>
