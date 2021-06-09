<template>
  <div class="wrapper">
    <v-btn
      class="mt-6"
      :to="'/teacher_panel/courses/1/groups/1'"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К группе
      </div>
    </v-btn>
    <p class="text-h4 mt-6 mb-3">
      Задачи, ожидающие проверки
    </p>
    <v-row dense>
      <v-col
        v-for="item in tasks"
        :key="item.name"
        :cols="12"
        class="mb-1 mt-1"
      >
        <v-card>
          <v-list-item>
            <v-list-item-action class="mr-3">
              <v-icon
                color="grey"
              >
                mdi-clock-time-five
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <div class="text-h6">
                {{ item.name }}
              </div>
              <div class="text-caption">
                {{ item.author.fullName }}
              </div>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                :to="item.link"
              >
                Перейти к задаче <v-icon>mdi-arrow-right</v-icon>
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
  name: "waiting_tasks",
  data() {
    return {
      tasks: [
        {
          name: 'Задача 1',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/tasks/1/solutions/1',
          author: {
            fullName: 'Гурин Аркадий'
          }
        },
        {
          name: 'Задача 2',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/tasks/2/solutions/2',
          author: {
            fullName: 'Гурин Аркадий'
          }
        },
        {
          name: 'Задача 3',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/tasks/3/solutions/3',
          author: {
            fullName: 'Гурин Аркадий'
          }
        },
        {
          name: 'Задача 4',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/tasks/4/solutions/4',
          author: {
            fullName: 'Гурин Аркадий'
          }
        },
        {
          name: 'Задача 5',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/tasks/5/solutions/5',
          author: {
            fullName: 'Гурин Аркадий'
          }
        },
        {
          name: 'Задача 6',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/tasks/6/solutions/6',
          author: {
            fullName: 'Гурин Аркадий'
          }
        },
        {
          name: 'Задача 7',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/tasks/7',
          author: {
            fullName: 'Гурин Аркадий'
          }
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
