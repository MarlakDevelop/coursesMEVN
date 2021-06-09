<template>
  <div>
    <p class="text-h4 mt-6 pt-6">
      Курс программирование на языке Python. Группа 1
    </p>
    <div class="d-flex pb-4 pt-4 flex-wrap">
      <v-btn
        class="mb-4 mt-4 mr-4"
        :to="'/teacher_panel/courses/1/groups/1/rating'"
      >
        Рейтинг учащихся
      </v-btn>
      <v-btn
        class="mb-4 mt-4 mr-4"
        :to="'/teacher_panel/courses/1/groups/1/waiting_tasks'"
      >
        Ожидающие проверки задачи
      </v-btn>
    </div>
    <v-divider></v-divider>
    <p class="text-h4 mt-6 mb-3">
      Уроки
    </p>
    <v-row dense>
      <v-col
        v-for="item in lessons"
        :key="item.name"
        :cols="12"
        class="mb-3 mt-3"
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
                Перейти к уроку <v-icon>mdi-arrow-right</v-icon>
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
      lessons: [
        {
          name: 'Урок 7',
          link: '/teacher_panel/courses/1/groups/1/lessons/7',
          isClosed: true
        },
        {
          name: 'Урок 6',
          link: '/teacher_panel/courses/1/groups/1/lessons/6',
          isClosed: true
        },
        {
          name: 'Урок 5',
          link: '/teacher_panel/courses/1/groups/1/lessons/5'
        },
        {
          name: 'Урок 4',
          link: '/teacher_panel/courses/1/groups/1/lessons/4'
        },
        {
          name: 'Урок 3',
          link: '/teacher_panel/courses/1/groups/1/lessons/3'
        },
        {
          name: 'Урок 2',
          link: '/teacher_panel/courses/1/groups/1/lessons/2'
        },
        {
          name: 'Урок 1',
          link: '/teacher_panel/courses/1/groups/1/lessons/1'
        }
      ]
    }
  }
}
</script>
