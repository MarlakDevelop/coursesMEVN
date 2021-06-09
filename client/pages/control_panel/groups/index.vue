<template>
  <div class="wrapper">
    <h2 class="text-h3 mb-6">
      Панель групп
    </h2>
    <v-divider></v-divider>
    <v-btn
      class="mb-6 mt-6"
      :to="'/control_panel/groups/create'"
    >
      Создание группы
    </v-btn>
    <h2 class="text-h4 mt-6ы">
      Поиск групп
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
        v-for="item in groups.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))"
        :key="item.name"
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
                :to="item.link"
              >
                Перейти к группе <v-icon>mdi-arrow-right</v-icon>
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
  name: "index",
  data() {
    return {
      search: '',
      groups: [
        {
          name: 'Группа 1',
          link: '/control_panel/groups/1'
        },
        {
          name: 'Группа 2',
          link: '/control_panel/groups/2'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
