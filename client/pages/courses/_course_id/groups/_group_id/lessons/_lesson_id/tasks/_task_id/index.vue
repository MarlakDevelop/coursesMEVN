<template>
  <div class="wrapper">
    <v-btn
      class="mt-6"
      :to="`/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}/lessons/${this.$route.params.lesson_id}`"
    >
      <v-icon>mdi-chevron-left</v-icon>
      <div class="pr-2 pl-1">К уроку</div>
    </v-btn>
    <p class="text-h4 mt-6 mb-6">
      {{ title }}
    </p>
    <v-row>
      <v-col
        :cols="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 12 : 9"
      >
        <div
          v-html="body"
          class="overflow-x-auto overflow-y-auto"
        ></div>
      </v-col>
      <v-col
        :cols="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 12 : 3"
      >
        <v-toolbar
          dark
        >
          <v-spacer></v-spacer>
          <input type="file" id="files" ref="files" class="d-none" v-on:change="handleFileUpload()" accept=".zip,.rar,.py,.php,.js,.ts,.pas,.cpp,.vue,.jsx,.html,.css,.sass,.scss,.cs,.java,.txt,.tsx,.c"/>
          <v-btn
            @click="uploadSolution()"
          >
            Отправить решение <v-icon>mdi-upload</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-col>
    </v-row>
    <div
      class="d-flex mt-10"
      v-if="!($vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm)"
    >
      <v-spacer></v-spacer>
      <div class="d-flex justify-center">
        <v-btn
          v-for="item in tasks"
          class="mt-1 mr-1"
          :to="item.link"
          icon
        >
          <div v-if="!!item.solution">
            <v-icon
              v-if="item.solution.status === 'accepted'"
              color="green"
            >
              mdi-checkbox-marked-circle
            </v-icon>
            <v-icon
              v-else-if="item.solution.status === 'rejected'"
              color="red"
            >
              mdi-close-circle
            </v-icon>
            <v-icon
              v-else-if="item.solution.status === 'waiting'"
              color="grey"
            >
              mdi-clock-time-five
            </v-icon>
          </div>
          <v-icon
            v-else
            color="grey darken-3"
          >
            mdi-record-circle
          </v-icon>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
    </div>
  </div>
</template>

<script>

export default {
  name: "_task_id",
  middleware: ['auth'],
  async fetch({ store, route, error }){
    await store.dispatch('student/loadTask', {
      courseId: route.params.course_id,
      groupId: route.params.group_id,
      lessonId: route.params.lesson_id,
      taskId: route.params.task_id,
      error, store
    })
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    title() {
      return this.$store.getters['student/task'].taskName
    },
    body() {
      return this.$store.getters['student/task'].body
    },
    tasks() {
      return this.$store.getters['student/task'].tasks.map((elem) => {
        return {
          ...elem,
          link: !!elem.solution
            ? `/courses/${this.$route?.params.course_id}/groups/${this.$route?.params.group_id}/lessons/${this.$route?.params.lesson_id}/tasks/${elem.id}/solutions/${elem.solution.id}`
            : `/courses/${this.$route?.params.course_id}/groups/${this.$route?.params.group_id}/lessons/${this.$route?.params.lesson_id}/tasks/${elem.id}`
        }
      })
    }
  },
  methods: {
    uploadSolution() {
      this.$refs.files.click();
    },
    async handleFileUpload() {
      try {
        const file = this.$refs.files.files[0]
        if (!file) {
          return
        }
        const formData = new FormData()
        formData.append('file', file)
        await this.$axios.$post(
          `student/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}/lessons/${this.$route.params.lesson_id}/tasks/${this.$route.params.task_id}/solutions/send_solution`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${this.$store.getters['token']}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((res) => {
          this.$router.push(`/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}/lessons/${this.$route.params.lesson_id}/tasks/${this.$route.params.task_id}/solutions/${res.solutionId}`)
        }).catch((err) => {
          this.dialog.title = 'Ошибка'
          this.dialog.text = err.response.data.message
          this.dialog.isOpened = true
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
