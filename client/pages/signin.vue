<template>
  <div class="mt-10 wrapper">
    <div class="text-h4">Авторизация</div>
    <v-form>
      <v-text-field
        :label="'Логин'"
        color="white"
        v-model="form.login"
        :rules="form.loginRules"
        :counter="32"
      ></v-text-field>
      <v-text-field
        type="password"
        :label="'Пароль'"
        color="white"
        v-model="form.password"
        :rules="form.passwordRules"
        :counter="32"
      ></v-text-field>
    </v-form>
    <v-btn
      block
      class="mt-4"
    >
      Авторизоваться
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "signin",
  layout: 'auth',
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
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
