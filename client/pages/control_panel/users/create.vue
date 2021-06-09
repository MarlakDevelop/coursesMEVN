<template>
  <div class="wrapper">
    <v-btn
      class="mt-6 mb-6"
      :to="'/control_panel/users'"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К пользователям
      </div>
    </v-btn>
    <h2 class="text-h4 mb-6">
      Создание пользователя
    </h2>
    <v-form v-model="form.valid">
      <v-text-field
        label="Логин"
        color="white"
        v-model="form.login"
        :rules="form.loginRules"
        :counter="32"
      ></v-text-field>
      <v-text-field
        label="Пароль"
        color="white"
        v-model="form.password"
        :rules="form.passwordRules"
        :counter="32"
      ></v-text-field>
      <v-text-field
        label="Полное имя"
        color="white"
        v-model="form.fullName"
        :rules="form.fullNameRules"
        :counter="100"
      ></v-text-field>
    </v-form>
    <v-btn
      block
      color="green darken-2"
      class="mt-2"
      @click="() => {}"
    >
      Зарегистрировать пользователя
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
        login: '',
        loginRules: [
          v => !!v || 'Логин необходим',
          v => v.length <= 32 || 'Логин должен быть короче 32',
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Пароль необходим',
          v => v.length <= 32 || 'Пароль должен быть короче 32',
        ],
        fullName: '',
        fullNameRules: [
          v => !!v || 'Полное имя необходимо',
          v => v.length <= 100 || 'Полное имя должно быть короче 100',
        ]
      },
    }
  }
}
</script>

<style scoped>

</style>
