<template>
  <div class="wrapper">
    <v-btn
      class="mt-6"
      :to="`/teacher_panel/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}/lessons/${this.$route.params.lesson_id}`"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К уроку
      </div>
    </v-btn>
    <div class="mt-10 mb-6 text-h3">{{ title }}</div>
    <div v-html="body"></div>
  </div>
</template>

<script>
export default {
  name: "_material_id",
  async fetch({ store, route, error }){
    await store.dispatch('teacher/loadMaterial', { courseId: route.params.course_id, groupId: route.params.group_id, lessonId: route.params.lesson_id, materialId: route.params.material_id, error })
  },
  computed: {
    title() {
      return this.$store.getters['teacher/material'].materialName
    },
    body() {
      return this.$store.getters['teacher/material'].body
    }
  }
}
</script>

<style scoped>

</style>
