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
      :to="`/control_panel/groups/${this.$route.params.group_id}`"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К группе
      </div>
    </v-btn>
    <h2 class="text-h4 mt-6">
      Поиск пользователей
    </h2>
    <v-text-field
      hide-details
      append-icon="mdi-magnify"
      color="white"
      v-model="search"
      single-line
    ></v-text-field>
    <v-row
      class="mt-6 mb-6"
      dense
    >
      <v-col
        v-for="item in users.filter(item => item.fullName.toLowerCase().includes(search.toLowerCase()) || item.login.toLowerCase().includes(search.toLowerCase()))"
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
                @click="setTeacher(item.id)"
              >
                Заменить на него
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
  name: "update_teacher",
  middleware: ['auth'],
  async fetch({store, route, error}) {
    await store.dispatch('control/loadUsersExcludeTeacher', {groupId: route.params.group_id, error, store})
  },
  data() {
    return {
      dialog: {
        isOpened: false,
        title: '',
        text: ''
      },
      search: ''
    }
  },
  head() {
    return {
      title: 'Обновить учителя',
    }
  },
  computed: {
    users() {
      return this.$store.getters['control/users']
    }
  },
  methods: {
    async setTeacher(userId) {
      await this.$axios.$post(
        `/control/groups/${this.$route.params.group_id}/set_teacher`,
        {
          userId
        },
        {
          headers: {
            'Authorization': `Bearer ${this.$store.getters['token']}`
          }
        }
      ).then(() => {
        this.$router.push(`/control_panel/groups/${this.$route.params.group_id}`)
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
