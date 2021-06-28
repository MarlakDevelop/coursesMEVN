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
      Пользователь {{ login }} - {{ fullName }}
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
      @click="updateUser()"
    >
      Обновить данные пользователя
    </v-btn>
    <v-btn
      block
      color="red darken-2"
      class="mt-10"
      @click="deleteUser()"
    >
      Удалить пользователя
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "index",
  middleware: ['auth'],
  async fetch({ store, route, error }){
    await store.dispatch('control/loadUser', { userId: route.params.user_id, error, store })
  },
  data() {
    return {
      dialog: {
        isOpened: false,
        title: '',
        text: ''
      },
      form: {
        needUpdate: true,
        valid: false,
        login: '',
        loginRules: [
          v => v.length <= 32 || 'Логин должен быть короче 32',
        ],
        loginNeedUpdate: true,
        password: '',
        passwordRules: [
          v => v.length <= 32 || 'Пароль должен быть короче 32',
        ],
        fullName: '',
        fullNameRules: [
          v => v.length <= 100 || 'Полное имя должно быть короче 100',
        ],
        fullNameNeedUpdate: true,
      }
    }
  },
  head() {
    return {
      title: this.login,
    }
  },
  computed: {
    login() {
      if (!!this.$store.getters['control/user'].login && !this.form.login && this.form.loginNeedUpdate) {
        this.form.login = Object.assign(this.$store.getters['control/user'].login)
        this.form.loginNeedUpdate = false
      }
      return this.$store.getters['control/user'].login
    },
    fullName() {
      if (!!this.$store.getters['control/user'].fullName && !this.form.fullName && this.form.fullNameNeedUpdate) {
        this.form.fullName = Object.assign(this.$store.getters['control/user'].fullName)
        this.form.fullNameNeedUpdate = false
      }
      return this.$store.getters['control/user'].fullName
    }
  },
  methods: {
    async updateUser() {
      await this.$axios.patch(
        `control/users/${this.$route.params.user_id}`,
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
        this.$nuxt.refresh()
      }).catch((err) => {
        this.dialog.title = 'Ошибка'
        this.dialog.text = err.response.data.message
        this.dialog.isOpened = true
      })
    },
    async deleteUser() {
      await this.$axios.$delete(
        `control/users/${this.$route.params.user_id}`,
        {
          headers: {
            'Authorization': `Bearer ${this.$store.getters['token']}`
          }
        }
      ).then(() => {
        this.$router.push('/control_panel/users')
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
