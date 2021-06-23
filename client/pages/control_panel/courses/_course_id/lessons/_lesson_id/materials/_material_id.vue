<template>
  <div class="wrapper">
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
    <v-btn
      class="mt-6"
      :to="`/control_panel/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}`"
    >
      <v-icon>mdi-chevron-left</v-icon>
      <div class="pr-2 pl-1">К уроку</div>
    </v-btn>
    <p class="text-h4 mt-6 mb-6">
      {{ title }}
    </p>
    <v-form v-model="form.valid">
      <v-text-field
        label="Название"
        v-model="form.title"
        :rules="form.titleRules"
        :counter="100"
        color="white"
      ></v-text-field>
    </v-form>
    <no-ssr>
      <client-only>
        <codemirror
          v-model="form.body"
          :options="cmOptions"
        />
      </client-only>
    </no-ssr>
    <div
      v-html="form.body"
      class="overflow-x-auto overflow-y-auto mt-6 mb-6"
    ></div>
    <v-btn
      block
      color="green darken-2"
      :disabled="!form.valid || !form.body"
      @click="updateMaterial()"
    >
      Обновить материал
    </v-btn>
    <v-btn
      block
      color="red darken-2"
      class="mt-6"
      @click="deleteMaterial()"
    >
      Удалить материал
    </v-btn>
  </div>
</template>

<script>

export default {
  name: "_material_id",
  async fetch({store, route, error}) {
    await store.dispatch('control/loadMaterial', {courseId: route.params.course_id, lessonId: route.params.lesson_id, materialId: route.params.material_id, error})
  },
  data() {
    return {
      dialog: {
        isOpened: false,
        title: '',
        text: ''
      },
      form: {
        valid: false,
        title: '',
        titleRules: [
          v => !!v || 'Название необходимо',
          v => v.length <= 100 || 'Название должно быть короче 100',
        ],
        body: ''
      },
      cmOptions: {
        tabSize: 4,
        mode: 'text/html',
        theme: 'darcula',
        lineNumbers: true,
        line: true
      }
    }
  },
  computed: {
    title() {
      if ((!!this.$store.getters['control/material'].materialName && !this.form.title) || this.$store.getters['control/material'].materialName !== this.form.title) {
        this.form.title = this.$store.getters['control/material'].materialName
      }
      if ((!!this.$store.getters['control/material'].body && !this.form.body) || this.$store.getters['control/material'].body !== this.form.body) {
        this.form.body = String(this.$store.getters['control/material'].body)
      }
      return this.$store.getters['control/material'].materialName
    }
  },
  methods: {
    async updateMaterial() {
      await this.$axios.patch(
        `control/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}/materials/${this.$route.params.material_id}`,
        {
          name: this.form.title,
          body: this.form.body
        }
      ).then(() => {
        this.$nuxt.refresh()
      }).catch((err) => {
        this.dialog.title = 'Ошибка'
        this.dialog.text = err.response.data.message
        this.dialog.isOpened = true
      })
    },
    async deleteMaterial() {
      await this.$axios.delete(
        `control/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}/materials/${this.$route.params.material_id}`
      ).then(() => {
        this.$router.push(`/control_panel/courses/${this.$route.params.course_id}/lessons/${this.$route.params.lesson_id}`)
      }).catch((err) => {
        this.dialog.title = 'Ошибка'
        this.dialog.text = err.response.data.message
        this.dialog.isOpened = true
      })
    }
  }
}
</script>
