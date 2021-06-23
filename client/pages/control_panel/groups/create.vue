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
      class="mt-6 mb-6"
      :to="'/control_panel/groups'"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К группам
      </div>
    </v-btn>
    <h2 class="text-h4 mb-6">
      Создание группы
    </h2>
    <v-form v-model="form.valid">
      <v-text-field
        label="Название группы"
        color="white"
        v-model="form.title"
        :rules="form.titleRules"
        :counter="100"
      ></v-text-field>
    </v-form>
    <v-row
      class="mt-6 mb-6"
      dense
    >
      <v-col
        v-for="item in courses"
        :key="item.id"
        :cols="12"
        height="300px"
        class="mb-3"
      >
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <div :class="item.isClosed ? 'text-h6 grey--text darken-4' : 'text-h6'">
                {{ item.name }}
              </div>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                color="green darken-2"
                :disabled="form.courseId === item.id"
                @click="form.courseId = item.id"
              >
                Выбрать курс
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      block
      color="green darken-2"
      class="mt-2"
      :disabled="!form.valid || !form.courseId"
      @click="createGroup()"
    >
      Создать группу
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "create",
  async fetch({store, error}) {
    await store.dispatch('control/loadCourses', {error})
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
        courseId: null,
      }
    }
  },
  computed: {
    courses() {
      return this.$store.getters['control/courses']
    }
  },
  methods: {
    async createGroup() {
      await this.$axios.$post(
        `control/groups`,
        {
          name: this.form.title,
          courseId: this.form.courseId
        }
      ).then(() => {
        this.dialog.title = 'Успех'
        this.dialog.text = 'Курс успешно создан'
        this.dialog.isOpened = true
        this.form.title = ''
        this.form.courseId = null
      }).catch((err) => {
        this.dialog.title = 'Ошибка'
        this.dialog.text = err.response.data.message
        this.dialog.isOpened = true
      })
    }
  }
}
</script>

<style scoped>

</style>
