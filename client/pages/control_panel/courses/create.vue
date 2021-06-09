<template>
  <div class="wrapper">
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
    <h2 class="text-h4 mb-6">
      Создание курса
    </h2>
    <v-form>
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
      @click="() => {}"
    >
      Создать курс
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
        ]
      },
    }
  }
}
</script>

<style scoped>

</style>
