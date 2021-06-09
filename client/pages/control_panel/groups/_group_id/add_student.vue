<template>
  <div class="wrapper">
    <v-btn
      class="mt-6 mb-6"
      :to="'/control_panel/groups/1'"
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
        :key="item.fullName"
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
                class="green darken-2"
              >
                Добавить
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
  name: "add_student",
  data() {
    return {
      search: '',
      users: [
        {
          login: 'user',
          fullName: 'Гурин Аркадий'
        },
        {
          login: 'user',
          fullName: 'Гурин Аркадий'
        },
        {
          login: 'user',
          fullName: 'Гурин Аркадий'
        },
        {
          login: 'user',
          fullName: 'Гурин Аркадий'
        },
        {
          login: 'user',
          fullName: 'Гурин Аркадий'
        },
        {
          login: 'user',
          fullName: 'Гурин Аркадий'
        },
        {
          login: 'user',
          fullName: 'Гурин Аркадий'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
