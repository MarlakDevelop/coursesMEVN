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
        type="password"
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
      :disabled="!form.valid"
      @click="createUser()"
    >
      Зарегистрировать пользователя
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "create",
  middleware: ['auth'],
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
        ],
        fullName: '',
        fullNameRules: [
          v => !!v || 'Полное имя необходимо',
          v => v.length <= 100 || 'Полное имя должно быть короче 100',
        ]
      },
    }
  },
  head() {
    return {
      title: 'Создание пользователя',
    }
  },
  methods: {
    async createUser() {
      await this.$axios.post(
        `control/users`,
        {
          login: this.form.login,
          fullName: this.form.fullName,
          password: this.form.password
        },
        {
          headers: {
            'Authorization': `Bearer ${this.$store.getters['token']}`
          }
        }
      ).then(() => {
        this.dialog.title = 'Успех'
        this.dialog.text = 'Пользователь успешно создан'
        this.dialog.isOpened = true
        this.form.login = ''
        this.form.password = ''
        this.form.fullName = ''
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
