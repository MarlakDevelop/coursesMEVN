<template>
  <v-app dark>
    <v-app-bar app absolute>
      <v-toolbar
        flat
      >
        <v-toolbar-title>
          <NuxtLink
            :to="'/'"
            class="text-decoration-none white--text text--accent-4 text-h5"
          >
            {{ title }}
          </NuxtLink>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>
          <NuxtLink
            :to="'/profile'"
            class="text-decoration-none white--text text--accent-4"
          >
            {{ fullName }}
          </NuxtLink>
        </v-toolbar-title>
      </v-toolbar>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>
    <v-footer class="mt-10 justify-center">
      <a href="https://w.qiwi.com/payment/form/99?c...er=100&extra%5B%27account%27%5D=+79033208523&extra%5B%27comment%27%5D=%D0%B2%D0%B0%D1%88%D0%B5%20%D0%B8%D0%BC%D1%8F" class="white--text" target="_blank">Буду рад пожертвованиям</a>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Курсы от Анонима'
    }
  },
  computed: {
    fullName() {
      return this.$store.getters['fullName']
    }
  }
}
</script>

<style>

.wrapper {
  max-width: 1100px;
  margin: 0 auto;
}

.CodeMirror {
  height: 700px !important;
}

.card-outter {
  padding-bottom: 50px;
}

.card-actions {
  position: absolute;
  bottom: 0;
  right: 0;
}

.width-90 {
  max-width: 90%;
}

::-webkit-scrollbar {
  width: 6px;
  background: transparent;
}

::-webkit-scrollbar:horizontal {
  height: 6px;
  width: auto;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: grey;
}

</style>
