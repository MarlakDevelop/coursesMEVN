<template>
  <div>
    <v-dialog
      v-model="dialog.isOpened"
      width="500"
      dark
    >
      <v-card>
        <v-card-title class="text-h5 grey darken-4">
          {{ dialog.title }}
        </v-card-title>

        <v-card-text class="pt-6">
          {{ dialog.text }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            text
            @click="dialog.isOpened = false"
          >
            Ок
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-navigation-drawer
      v-model="taskIsVisible"
      fixed
      temporary
      right
      :width="800"
      class="pr-2 pl-10"
    >
      <v-btn
        class="mt-6"
        @click="taskIsVisible = false"
      >
        <v-icon>mdi-chevron-left</v-icon>
        <div class="pr-2 pl-1">К решению</div>
      </v-btn>
      <p class="text-h4 mt-6 mb-6">
        {{ title }}
      </p>
      <div
        v-html="body"
        class="overflow-x-auto overflow-y-auto"
      ></div>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="verdictIsVisible"
      fixed
      temporary
      right
      :width="800"
      class="pr-10 pl-10"
    >
      <v-btn
        class="mt-6"
        @click="verdictIsVisible = false"
      >
        <v-icon>mdi-chevron-left</v-icon>
        <div class="pr-2 pl-1">К решению</div>
      </v-btn>
      <p class="text-h5 mt-6 mb-1">
        Вердикт:
      </p>
      <v-card
        dark
        class="pt-4 pl-4 pr-4 pb-4 mt-1 mb-4"
      >
        {{ verdict.name }}
      </v-card>
      <p class="text-h5 mt-6 mb-1">
        Комментарий:
      </p>
      <v-card
        dark
        class="pt-4 pl-4 pr-4 pb-4 mt-1 mb-4"
      >
        {{ verdict.comment }}
      </v-card>
    </v-navigation-drawer>
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
      <v-btn
        class="mb-6"
        @click="taskIsVisible = true"
      >
        Условие
      </v-btn>
      <v-card class="overflow-hidden">
        <v-row>
          <v-col
            :cols="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 12 : 9"
            :class="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 'pb-0' : 'pr-0'"
          >
            <v-toolbar
              v-if="status.type === 'accepted'"
              color="green darken-3"
              dark
            >
              <v-toolbar-title>
                <div>ID {{ subSolution.id }}</div>
                <div class="text-caption">{{ subSolution.date }}</div>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-title>
                <div>Зачтено</div>
                <div class="text-caption">{{ status.date }}</div>
              </v-toolbar-title>
            </v-toolbar>
            <v-toolbar
              v-else-if="status.type === 'rejected'"
              color="red darken-3"
              dark
            >
              <v-toolbar-title>
                <div>ID {{ subSolution.id }}</div>
                <div class="text-caption">{{ subSolution.date }}</div>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-title>
                <div>Доработать</div>
                <div class="text-caption">{{ status.date }}</div>
              </v-toolbar-title>
            </v-toolbar>
            <v-toolbar
              v-else-if="status.type === 'waiting'"
              color="grey darken-3"
              dark
            >
              <v-toolbar-title>
                <div>ID {{ subSolution.id }}</div>
                <div class="text-caption">{{ subSolution.date }}</div>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-title>
                <div>Ожидание <v-icon>mdi-clock</v-icon></div>
                <div class="text-caption">{{ status.date }}</div>
              </v-toolbar-title>
            </v-toolbar>
            <client-only v-if="code">
              <codemirror
                :value="code"
                :options="cmOptions"
              />
            </client-only>
            <div
              v-else
              class="d-flex text-center mt-10"
            >
              <v-spacer></v-spacer>
              <div>
                <div>
                  Не удалось отобразить решение
                </div>
                <a
                  class="grey--text text-body d-block"
                  target="_blank"
                  :href="filePath"
                >
                  Скачать решение
                </a>
              </div>
              <v-spacer></v-spacer>
            </div>
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 12 : 3"
            :class="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 'pt-0' : 'pl-0'"
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
            <v-card
              :height="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 400 : 700"
              class="overflow-y-auto"
            >
              <div
                class="pl-4 pr-4 pt-4 pb-4"
              >
                <div
                  class="d-flex mb-4 mt-4 text-left"
                  v-for="item in history"
                  v-if="item.type === 'solution'"
                >
                  <div
                    class="width-90"
                  >
                    <v-chip
                      link
                      label
                      @click="openSubSolution(item.id)"
                      :disabled="String(item.id) === String(subSolution.id)"
                    >
                      <div class="text-truncate">
                        ID {{ item.id }}
                      </div>
                    </v-chip>
                    <div class="text-caption">
                      {{ item.date }}
                    </div>
                  </div>
                  <v-spacer></v-spacer>
                </div>
                <div
                  class="d-flex mb-4 mt-4 text-right"
                  v-else-if="item.type === 'verdict'"
                >
                  <v-spacer></v-spacer>
                  <div
                    class="width-90"
                  >
                    <v-chip
                      link
                      label
                      @click="openVerdict(item.id)"
                    >
                      <div class="text-truncate">
                        {{ item.name }}
                      </div>
                    </v-chip>
                    <div class="text-caption">
                      {{ item.date }}
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
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
  </div>
</template>

<script>

export default {
  name: "_solution_id",
  middleware: ['auth'],
  async fetch({ store, route, error }){
    await store.dispatch('student/loadTaskAndSolution', {
      courseId: route.params.course_id,
      groupId: route.params.group_id,
      lessonId: route.params.lesson_id,
      taskId: route.params.task_id,
      solutionId: route.params.solution_id,
      error, store
    })
  },
  data() {
    return {
      dialog: {
        isOpened: false,
        title: '',
        text: ''
      },
      taskIsVisible: false,
      verdictIsVisible: false
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror
    },
    cmOptions() {
      return {
        tabSize: 4,
        mode: this.$store.getters['student/task'].solution.subSolution.file.mimeType,
        theme: 'darcula',
        lineNumbers: true,
        line: true,
        readOnly: true
        // more CodeMirror options...
      }
    },
    verdict() {
      return this.$store.getters['student/task'].solution.verdict
    },
    title() {
      return this.$store.getters['student/task'].taskName
    },
    body() {
      return this.$store.getters['student/task'].body
    },
    filePath() {
      return !!this.$store.getters['student/task'].solution.subSolution.file.body ? null : this.$store.getters['student/task'].solution.subSolution.file.path
    },
    code() {
      return this.$store.getters['student/task'].solution.subSolution.file.body
    },
    status() {
      return {
        type: this.$store.getters['student/task'].solution.status,
        date: (new Date(this.$store.getters['student/task'].solution.statusDate)).toLocaleString("ru-RU", { minute: '2-digit', hour: '2-digit', month: 'short', day: 'numeric' })
      }
    },
    subSolution() {
      return {
        id: this.$store.getters['student/task'].solution.subSolution.id,
        date: (new Date(this.$store.getters['student/task'].solution.subSolution.date)).toLocaleString("ru-RU", { minute: '2-digit', hour: '2-digit', month: 'short', day: 'numeric' })
      }
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
    },
    history() {
      return this.$store.getters['student/task'].solution.history.map((elem) => {
        return {
          ...elem,
          date: (new Date(elem.date)).toLocaleString("ru-RU", { minute: '2-digit', hour: '2-digit', month: 'short', day: 'numeric' })
        }
      })
    }
  },
  methods: {
    async openSubSolution(id) {
      await this.$store.dispatch('student/loadSubSolution', {
        courseId: this.$route.params.course_id,
        groupId: this.$route.params.group_id,
        lessonId: this.$route.params.lesson_id,
        taskId: this.$route.params.task_id,
        solutionId: this.$route.params.solution_id,
        subSolutionId: id,
        error: this.$nuxt.error, store: this.$store
      })
    },
    async openVerdict(id) {
      if (String(this.verdict.id) !== String(id))
        await this.$store.dispatch('student/loadVerdict', {
          courseId: this.$route.params.course_id,
          groupId: this.$route.params.group_id,
          lessonId: this.$route.params.lesson_id,
          taskId: this.$route.params.task_id,
          solutionId: this.$route.params.solution_id,
          verdictId: id,
          error: this.$nuxt.error, store: this.$store
        })
      this.verdictIsVisible = true
    },
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
        ).then(() => {
          this.$nuxt.refresh()
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
