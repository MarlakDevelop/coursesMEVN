<template>
  <v-app dark>
    <v-app-bar app>
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
            Аркадий Гурин
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
      <a href="#" class="white--text" target="_blank">Буду рад пожертвованиям</a>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Курсы от Анонима'
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
