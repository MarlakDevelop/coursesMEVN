<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404" class="mt-10 mb-2 text-h3 text-center">
      {{ pageNotFound }}
    </h1>
    <h1 v-else-if="error.statusCode === 403" class="mt-10 mb-2 text-h3 text-center">
      {{ permissionDenied }}
    </h1>
    <h1 v-else class="mt-10 mb-2 text-h3 text-center">
      {{ otherError }}
    </h1>
    <NuxtLink to="/" class="mt-2 mb-5 text-h5 white--text text-center">
      На главную
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Данные не найдены',
      permissionDenied: 'Недостаточно прав',
      otherError: 'Возникла неопределённая ошибка'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
