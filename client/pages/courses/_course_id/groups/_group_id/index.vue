<template>
  <div>
    <p class="text-h4 mt-6 pt-6">
      Курс программирование на языке Python
    </p>
    <p class="text-h6">
      Преподаватель: Аркадий Гурин Дмитриевич
    </p>
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
              <div class="mb-2 text-h6">
                {{ item.name }}
              </div>
              <v-progress-linear
                v-model="item.tasks_solved / item.tasks_total * 100"
                color="green"
              ></v-progress-linear>
              <div class="text-caption">
                <b class="green--text text--accent-4">{{ item.tasks_solved }}</b> / {{ item.tasks_total }} задач зачтено
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
          name: 'Урок 5',
          tasks_total: 14,
          tasks_solved: 6,
          link: '/courses/1/groups/1/lessons/5'
        },
        {
          name: 'Урок 4',
          tasks_total: 12,
          tasks_solved: 12,
          link: '/courses/1/groups/1/lessons/4'
        },
        {
          name: 'Урок 3',
          tasks_total: 19,
          tasks_solved: 3,
          link: '/courses/1/groups/1/lessons/3'
        },
        {
          name: 'Урок 2',
          tasks_total: 9,
          tasks_solved: 7,
          link: '/courses/1/groups/1/lessons/2'
        },
        {
          name: 'Урок 1',
          tasks_total: 7,
          tasks_solved: 4,
          link: '/courses/1/groups/1/lessons/1'
        }
      ]
    }
  }
}
</script>
