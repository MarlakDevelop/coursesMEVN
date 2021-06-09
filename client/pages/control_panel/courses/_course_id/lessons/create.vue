<template>
  <div class="wrapper">
    <v-btn
      class="mt-6 mb-6"
      :to="'/control_panel/courses/1'"
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
  }
}
</script>

<style scoped>

</style>
