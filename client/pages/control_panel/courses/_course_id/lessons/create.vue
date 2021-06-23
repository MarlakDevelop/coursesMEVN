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
      :to="`/control_panel/courses/${this.$route.params.course_id}`"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К курсу
      </div>
    </v-btn>
    <p class="text-h4 pt-6">
      Создание урока
    </p>
    <v-form
      v-model="form.valid"
    >
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
      class="mt-4 mb-6"
      color="green darken-2"
      :disabled="!form.valid"
      @click="createLesson()"
    >
      Создать урок
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "create",
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
        rating: '',
        ratingRules: [
          v => !!v || 'Рейтинг необходим',
          v => /^\d*\.?\d*$/.test(v) || 'Рейтинг должен быть целочисленным или дробным числом',
        ]
      }
    }
  },
  methods: {
    async createLesson() {
      await this.$axios.post(
        `control/courses/${this.$route.params.course_id}/lessons`,
        {
          name: this.form.title,
          rating: Number(this.form.rating)
        }
      ).then(() => {
        this.dialog.title = 'Успех'
        this.dialog.text = 'Урок успешно создан'
        this.dialog.isOpened = true
        this.form.title = ''
        this.form.rating = ''
      }).catch((err) => {
        this.dialog.title = 'Ошибка'
        this.dialog.text = err.response.data.message
        this.dialog.isOpened = true
      })
    }
  }
}
</script>

<style scoped>

</style>
