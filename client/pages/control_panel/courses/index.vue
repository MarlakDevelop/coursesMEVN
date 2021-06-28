<template>
  <div class="wrapper">
    <h2 class="text-h3 mt-6 mb-6">
      Панель курсов
    </h2>
    <v-divider></v-divider>
    <v-btn
      class="mb-6 mt-6"
      :to="'/control_panel/courses/create'"
    >
      Создание курса
    </v-btn>
    <h2 class="text-h4 mt-6">
      Поиск курсов
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
        v-for="item in courses.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))"
        :key="item.id"
        :cols="12"
        height="300px"
        class="mb-3"
      >
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <div class="text-h6">
                {{ item.name }}
              </div>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                :to="item.link"
              >
                Перейти к курсу <v-icon>mdi-arrow-right</v-icon>
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
  async fetch({ store, error }) {
    await store.dispatch('control/loadCourses', {error, store})
  },
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
      search: ''
    }
  },
  head() {
    return {
      title: 'Курсы',
    }
  },
  computed: {
    courses() {
      return this.$store.getters['control/courses'].map((item) => {
        return {
          ...item,
          link: `/control_panel/courses/${item.id}`
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
