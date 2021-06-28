<template>
  <div class="wrapper">
    <h2 class="text-h3 mb-6 mt-6">
      Панель пользователей
    </h2>
    <v-divider></v-divider>
    <v-btn
      class="mb-6 mt-6"
      :to="'/control_panel/users/create'"
    >
      Создание пользователя
    </v-btn>
    <h2 class="text-h4 mt-6">
      Поиск пользователей
    </h2>
    <v-text-field
      hide-details
      append-icon="mdi-magnify"
      color="white"
      v-model="search"
      single-line
    ></v-text-field>
    <v-row
      class="mt-6 mb-6"
      dense
    >
      <v-col
        v-for="item in users.filter(item => item.fullName.toLowerCase().includes(search.toLowerCase()) || item.login.toLowerCase().includes(search.toLowerCase()))"
        :key="item.id"
        :cols="12"
        height="300px"
        class="mb-3"
      >
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <div class="text-h6">
                {{ item.login }}
              </div>
              <div class="text-caption">
                {{ item.fullName }}
              </div>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                :to="item.link"
              >
                Перейти к пользователю <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "index",
  middleware: ['auth'],
  async fetch({ store, error }){
    await store.dispatch('control/loadUsers', { error, store })
  },
  head() {
    return {
      title: 'Пользователи',
    }
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    users() {
      return this.$store.getters['control/users'].map((item) => {
        return {
          ...item,
          link: `/control_panel/users/${item.id}`
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
