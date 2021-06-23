<template>
  <div class="mt-10 wrapper">
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
    <div class="text-h4">Авторизация</div>
    <v-form v-model="form.valid">
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
      :disabled="!form.valid"
      @click="signIn()"
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
      dialog: {
        isOpened: false,
        title: '',
        text: ''
      },
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
  },
  methods: {
    async signIn() {
      await this.$axios.$post(
        'auth/login',
        {
          login: this.form.login,
          password: this.form.password
        }
      ).then((res) => {
        this.$store.dispatch('login', { token: res.token })
        this.$router.push('/')
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
