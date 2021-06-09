<template>
  <div>
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
    <p class="text-h4 mt-6 mb-0">
      Урок 1
    </p>
    <div class="d-flex mb-4 flex-wrap">
      <v-btn
        class="mb-4 mt-4 mr-4"
        color="red darken-2"
        v-if="isClosed"
        @click="isClosed = false"
      >
        Закрыть Доступ
      </v-btn>
      <v-btn
        class="mb-4 mt-4 mr-4"
        color="green darken-2"
        v-else
        @click="isClosed = true"
      >
        Открыть Доступ
      </v-btn>
      <v-btn
        class="mb-4 mt-4 mr-4"
        :to="'/teacher_panel/courses/1/groups/1/lessons/1/progress'"
      >
        Прогресс учащихся
      </v-btn>
    </div>
    <v-divider></v-divider>
    <v-row>
      <v-col
        :cols="($vuetify.breakpoint.sm || $vuetify.breakpoint.xs) ? 12 : 9"
      >
        <p class="text-h4 mt-6 mb-3">
          Задачи
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
                <v-list-item-content>
                  <div class="text-h6">
                    {{ item.name }}
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
      </v-col>
      <v-col
        :cols="($vuetify.breakpoint.sm || $vuetify.breakpoint.xs) ? 12 : 3"
      >
        <p class="text-h5 mt-6 mb-3">
          Материалы
        </p>
        <v-list
          :style="{ backgroundColor: 'transparent' }"
        >
          <v-list-item
            v-for="item in materials"
            :to="item.link"
            class="mb-3"
          >
            <v-list-item-action class="ml-0 mr-2 pl-0">
              <v-icon>
                mdi-clipboard-text-outline
              </v-icon>
            </v-list-item-action>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      isClosed: false,
      tasks: [
        {
          name: 'Задача 1',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/tasks/1',
          status: 'accepted'
        },
        {
          name: 'Задача 2',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/tasks/2',
          status: 'accepted'
        },
        {
          name: 'Задача 3',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/tasks/3',
          status: 'accepted'
        },
        {
          name: 'Задача 4',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/tasks/4',
          status: 'accepted'
        },
        {
          name: 'Задача 5',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/tasks/5',
          status: 'rejected'
        },
        {
          name: 'Задача 6',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/tasks/6',
          status: 'waiting'
        },
        {
          name: 'Задача 7',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/tasks/7'
        },
      ],
      materials: [
        {
          name: 'Учебник 1',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/materials/1'
        },
        {
          name: 'Учебник 2',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/materials/2'
        },
        {
          name: 'Учебник 3',
          link: '/teacher_panel/courses/1/groups/1/lessons/1/materials/3'
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
