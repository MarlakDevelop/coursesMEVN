<template>
  <div>
    <v-btn
      block
      class="red darken-2"
      @click="logout()"
    >
      Выйти из аккаунта
    </v-btn>
    <h2 class="text-h4 mt-6 pt-6 mb-3">
      {{ fullName }}
    </h2>
    <v-divider></v-divider>
    <v-row dense>
      <v-col
        v-for="item in courses"
        :key="item.id"
        :cols="($vuetify.breakpoint.sm || $vuetify.breakpoint.xs) ? 12 : ($vuetify.breakpoint.md ? 6 : 4)"
        class="mb-3 mt-3"
      >
        <v-card
          class="card-outter"
          height="200px"
        >
          <v-card-text>
            <div class="text-h5 white--text text--accent-4">
              {{ item.name }}
            </div>
            <p
              class="text-h6 white--text text--accent-4 card-actions pr-5"
            >
              Рейтинг: {{ item.rating }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "profile",
  middleware: ['auth'],
  async fetch({store}) {
    await store.dispatch('main/loadProfile', {store})
  },
  head() {
    return {
      title: this.fullName,
    }
  },
  computed: {
    courses() {
      return this.$store.getters['main/ratedCourses']
    },
    fullName() {
      return this.$store.getters['main/profileFullName']
    }
  },
  methods: {
    logout() {
      const Cookie = process.client ? require('js-cookie') : undefined
      this.$store.dispatch('logout')
      Cookie.remove('token')
      this.$router.push('/signin')
    }
  }
}
</script>

<style scoped>

</style>
