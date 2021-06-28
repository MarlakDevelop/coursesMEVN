<template>
  <div class="wrapper">
    <v-btn
      class="mt-6"
      :to="`/teacher_panel/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}`"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К группе
      </div>
    </v-btn>
    <p class="text-h4 mt-6 pt-6">
      {{ groupName }}
    </p>
    <v-divider></v-divider>
    <p class="text-h5 mt-6 mb-3">
      Рейтинг учащихся
    </p>
    <v-row>
      <v-col
        v-for="item in students"
        :key="item.id"
        :cols="12"
      >
        <v-card>
          <v-list-item>
            <div class="text-h6">
              {{ item.fullName }}
            </div>
            <v-spacer></v-spacer>
            <div class="text-body">
              Рейтинг: {{ item.rating }}
            </div>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "rating",
  middleware: ['auth'],
  async fetch({ store, route, error }){
    await store.dispatch('teacher/loadGroupRating', { courseId: route.params.course_id, groupId: route.params.group_id, error, store })
  },
  head() {
    return {
      title: this.groupName,
    }
  },
  computed: {
    groupName() {
      return this.$store.getters['teacher/group'].groupName
    },
    students() {
      return this.$store.getters['teacher/group'].students
    }
  }
}
</script>

<style scoped>

</style>
