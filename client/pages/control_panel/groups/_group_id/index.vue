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
      {{ title }}
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
    <v-btn
      block
      color="green darken-2"
      class="mt-2"
      :disabled="!form.valid"
      @click="updateGroup()"
    >
      Обновить группу
    </v-btn>
    <v-divider></v-divider>
    <div class="text-h4 mt-5">Участники группы</div>
    <div class="text-h5 mt-5">Преподаватель: {{ teacher.fullName }} - {{ teacher.login }}</div>
    <div class="d-flex mt-2">
      <v-btn
        class="mr-4"
        :to="`/control_panel/groups/${this.$route.params.group_id}/update_teacher`"
      >
        Заменить преподавателя
      </v-btn>
      <v-btn
        class="mr-4"
        :to="`/control_panel/groups/${this.$route.params.group_id}/add_student`"
      >
        Добавить студентов
      </v-btn>
    </div>
    <div class="text-h5 mt-5">Студенты</div>
    <v-row
      class="mt-2 mb-6"
      dense
    >
      <v-col
        v-for="item in students"
        :key="item.id"
        :cols="12"
        height="300px"
        class="mb-3"
      >
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <div class="text-h6">
                {{ item.login }}
              </div>
              <div class="text-caption">
                {{ item.fullName }}
              </div>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                class="red darken-2"
                @click="removeStudent(item.id)"
              >
                Убрать студента из группы
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "_group_id",
  async fetch({store, route, error}) {
    await store.dispatch('control/loadGroup', {groupId: route.params.group_id, error})
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
        title: 'Группа 1',
        titleRules: [
          v => !!v || 'Название необходимо',
          v => v.length <= 100 || 'Название должно быть короче 100',
        ]
      }
    }
  },
  computed: {
    title() {
      if ((!!this.$store.getters['control/group'].groupName && !this.form.title) || this.$store.getters['control/group'].groupName !== this.form.title) {
        this.form.title = this.$store.getters['control/group'].groupName
      }
      return this.$store.getters['control/group'].groupName
    },
    teacher() {
      return this.$store.getters['control/group'].teacher
    },
    students() {
      return this.$store.getters['control/group'].students
    }
  },
  methods: {
    async updateGroup() {
      await this.$axios.$patch(
        `control/groups/${this.$route.params.group_id}`,
        {
          name: this.form.title
        }
      ).then(() => {
        this.$nuxt.refresh()
      }).catch((err) => {
        this.dialog.title = 'Ошибка'
        this.dialog.text = err.response.data.message
        this.dialog.isOpened = true
      })
    },
    async removeStudent(studentId) {
      await this.$axios.$delete(
        `control/groups/${this.$route.params.group_id}/students/${studentId}`,
        {
          name: this.form.title
        }
      ).then(() => {
        this.$nuxt.refresh()
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
