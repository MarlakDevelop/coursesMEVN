<template>
  <v-app dark>
    <Nuxt/>
  </v-app>
</template>

<script>
export default {
  name: 'auth'
}
</script>

<style>

.wrapper {
  max-width: 1100px;
  margin: 0 auto;
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
