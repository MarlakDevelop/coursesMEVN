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
      class="pr-10 pl-10"
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
        class="mt-6 mr-4"
        :to="`/teacher_panel/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}/lessons/${this.$route.params.lesson_id}`"
      >
        <v-icon>mdi-chevron-left</v-icon>
        <div class="pr-2 pl-1">К уроку</div>
      </v-btn>
      <v-btn
        class="mt-6 mr-4"
        :to="`/teacher_panel/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}/lessons/${this.$route.params.lesson_id}/tasks/${this.$route.params.task_id}`"
      >
        <v-icon>mdi-chevron-left</v-icon>
        <div class="pr-2 pl-1">К задаче</div>
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
                <div class="text-caption">{{ subSolution.date }}</div>
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
                <div class="text-caption">{{ subSolution.date }}</div>
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
                <div class="text-caption">{{ subSolution.date }}</div>
              </v-toolbar-title>
            </v-toolbar>
            <client-only v-if="code">
              <codemirror
                v-model="code"
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
                  href="#"
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
            <v-card
              dark
              class="pl-4 pr-4 pt-4 pb-4 text-h5"
            >
              Вердикт
              <v-form v-model="verdictForm.isValid">
                <v-text-field
                  v-model="verdictForm.title"
                  :rules="verdictForm.titleRules"
                  :counter="100"
                  required
                  label="Название"
                  color="white"
                ></v-text-field>
                <v-text-field
                  v-model="verdictForm.comment"
                  :rules="verdictForm.commentRules"
                  :counter="1000"
                  required
                  label="Комментарий"
                  color="white"
                ></v-text-field>
              </v-form>
              <v-btn
                @click="sendVerdict('accepted')"
                block
                :disabled="!verdictForm.isValid"
                class="mt-6"
                color="green darken-2"
              >
                Зачесть
              </v-btn>
              <v-btn
                @click="sendVerdict('rejected')"
                block
                :disabled="!verdictForm.isValid"
                class="mt-6"
                color="red darken-2"
              >
                На доработку
              </v-btn>
            </v-card>
            <v-card
              :height="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 400 : 440"
              class="overflow-y-auto"
            >
              <div
                class="pl-4 pr-4 pt-4 pb-4"
              >
                <div
                  class="d-flex mb-4 mt-4 text-right"
                  v-for="item in history"
                  v-if="item.type === 'solution'"
                >
                  <v-spacer></v-spacer>
                  <div
                    class="width-90"
                  >
                    <v-chip
                      link
                      label
                      @click="openSubSolution(item.id)"
                    >
                      <div class="text-truncate">
                        ID {{ item.id }}
                      </div>
                    </v-chip>
                    <div class="text-caption">
                      {{ item.date }}
                    </div>
                  </div>
                </div>
                <div
                  class="d-flex mb-4 mt-4 text-left"
                  v-else
                >
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
                  <v-spacer></v-spacer>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>

export default {
  name: "_task_id",
  async fetch({ store, route, error }){
    await store.dispatch('teacher/loadTask', { courseId: route.params.course_id, groupId: route.params.group_id, lessonId: route.params.lesson_id, taskId: route.params.task_id, error })
    await store.dispatch('teacher/loadSolution', { courseId: route.params.course_id, groupId: route.params.group_id, lessonId: route.params.lesson_id, taskId: route.params.task_id, solutionId: route.params.solution_id, error })
    await store.dispatch('teacher/loadSolutionHistory', { courseId: route.params.course_id, groupId: route.params.group_id, lessonId: route.params.lesson_id, taskId: route.params.task_id, solutionId: route.params.solution_id, error })
  },
  data() {
    return {
      dialog: {
        isOpened: false,
        title: '',
        text: ''
      },
      taskIsVisible: false,
      verdictIsVisible: false,
      verdictForm: {
        isValid: false,
        title: '',
        titleRules: [
          v => !!v || 'Название необходимо',
          v => v.length <= 100 || 'Название должно быть короче 100',
        ],
        comment: '',
        commentRules: [
          v => !!v || 'Комментарий необходим',
          v => v.length <= 1000 || 'Название должно быть короче 1000',
        ],
      }
    }
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror
    },
    cmOptions() {
      return {
        tabSize: 4,
        mode: this.$store.getters['teacher/solution'].subSolution.file.mimeType,
        theme: 'darcula',
        lineNumbers: true,
        line: true,
        readOnly: true
        // more CodeMirror options...
      }
    },
    verdict() {
      return this.$store.getters['teacher/solution'].verdict
    },
    title() {
      return this.$store.getters['teacher/task'].taskName
    },
    body() {
      return this.$store.getters['teacher/task'].body
    },
    filePath() {
      return !!this.$store.getters['teacher/solution'].subSolution.file.body ? null : this.$store.getters['teacher/solution'].subSolution.file.path
    },
    code() {
      return this.$store.getters['teacher/solution'].subSolution.file.body
    },
    status() {
      return {
        type: this.$store.getters['teacher/solution'].status,
        date: (new Date(this.$store.getters['teacher/solution'].statusDate)).toLocaleString("ru-RU", { minute: '2-digit', hour: '2-digit', month: 'short', day: 'numeric' })
      }
    },
    subSolution() {
      return {
        id: this.$store.getters['teacher/solution'].subSolution.id,
        date: (new Date(this.$store.getters['teacher/solution'].subSolution.date)).toLocaleString("ru-RU", { minute: '2-digit', hour: '2-digit', month: 'short', day: 'numeric' })
      }
    },
    history() {

      return this.$store.getters['teacher/solution'].history.map((elem) => {
        return {
          ...elem,
          date: (new Date(elem.date)).toLocaleString("ru-RU", { minute: '2-digit', hour: '2-digit', month: 'short', day: 'numeric' })
        }
      })
    }
  },
  methods: {
    async openSubSolution(id) {
      await this.$store.dispatch('teacher/loadSubSolution', {
        courseId: this.$route.params.course_id,
        groupId: this.$route.params.group_id,
        lessonId: this.$route.params.lesson_id,
        taskId: this.$route.params.task_id,
        solutionId: this.$route.params.solution_id,
        subSolutionId: id,
        error: this.$nuxt.error
      })
    },
    async openVerdict(id) {
      await this.$store.dispatch('teacher/loadVerdict', {
        courseId: this.$route.params.course_id,
        groupId: this.$route.params.group_id,
        lessonId: this.$route.params.lesson_id,
        taskId: this.$route.params.task_id,
        solutionId: this.$route.params.solution_id,
        verdictId: id,
        error: this.$nuxt.error
      })
      this.verdictIsVisible = true
    },
    async sendVerdict(status) {
      await this.$axios.post(
        `/teacher/courses/${this.$route.params.course_id}/groups/${this.$route.params.group_id}/lessons/${this.$route.params.lesson_id}/tasks/${this.$route.params.task_id}/solutions/${this.$route.params.solution_id}/send_verdict`,
        {
          name: this.verdictForm.title,
          comment: this.verdictForm.comment,
          status,
        }
      ).then(() => {
        this.$nuxt.refresh()
        this.dialog.title = 'Успех'
        this.dialog.text = 'Вердикт был отправлен'
        this.dialog.isOpened = true
        this.verdictForm.title = ''
        this.verdictForm.comment = ''
      }).catch((err) => {
        this.dialog.title = 'Ошибка'
        this.dialog.text = err.response.data.message
        this.dialog.isOpened = true
      })
    }
  }
}
</script>
