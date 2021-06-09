<template>
  <div>
    <v-btn
      class="mt-6 mb-6"
      :to="'/control_panel/courses/1'"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К курсу
      </div>
    </v-btn>
    <p class="text-h4 mt-6 pt-6">
      Урок 1
    </p>
    <v-divider></v-divider>
    <v-form v-model="form.valid" class="mt-6">
      <v-text-field
        color="white"
        v-model="form.title"
        :label="'Название урока'"
        :counter="100"
        :rules="form.titleRules"
      ></v-text-field>
      <v-text-field
        color="white"
        v-model="form.rating"
        :label="'Рейтинг'"
        :counter="100"
        :rules="form.ratingRules"
      ></v-text-field>
    </v-form>
    <v-btn
      block
      color="green darken-2"
      class="mt-2"
      @click="() => {}"
    >
      Обновить урок
    </v-btn>
    <v-btn
      block
      color="red darken-2"
      class="mt-6"
      @click="() => {}"
    >
      Удалить урок
    </v-btn>
    <v-divider></v-divider>
    <p class="text-h4 mt-8 mb-3">
      Задачи
    </p>
    <v-btn
      class="mb-10 mt-4"
      :to="'/control_panel/courses/1/lessons/1/tasks/create'"
    >
      Создание задачи
    </v-btn>
    <v-row dense>
      <v-col
        v-for="item in tasks"
        :key="item.name"
        :cols="12"
        class="mb-3 mt-3"
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
    <p class="text-h4 mt-8 mb-3">
      Материалы
    </p>
    <v-btn
      class="mb-10 mt-4"
      :to="'/control_panel/courses/1/lessons/1/materials/create'"
    >
      Создание материала
    </v-btn>
    <v-row dense>
      <v-col
        v-for="item in materials"
        :key="item.name"
        :cols="12"
        class="mb-3 mt-3"
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
                Перейти к материалу <v-icon>mdi-arrow-right</v-icon>
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
      form: {
        valid: false,
        title: 'Урок 1',
        titleRules: [
          v => !!v || 'Название необходимо',
          v => v.length <= 100 || 'Название должно быть короче 100',
        ],
        rating: '2.00',
        ratingRules: [
          v => !!v || 'Рейтинг необходим',
          v => /^\d*\.?\d*$/.test(v) || 'Рейтинг должен быть целочисленным или дробным числом',
        ]
      },
      tasks: [
        {
          name: 'Задача 1',
          link: '/control_panel/courses/1/lessons/1/tasks/1'
        },
        {
          name: 'Задача 2',
          link: '/control_panel/courses/1/lessons/1/tasks/2'
        },
        {
          name: 'Задача 3',
          link: '/control_panel/courses/1/lessons/1/tasks/3'
        },
        {
          name: 'Задача 4',
          link: '/control_panel/courses/1/lessons/1/tasks/4'
        }
      ],
      materials: [
        {
          name: 'Учебник 1',
          link: '/control_panel/courses/1/lessons/1/materials/1'
        },
        {
          name: 'Учебник 2',
          link: '/control_panel/courses/1/lessons/1/materials/2'
        },
        {
          name: 'Учебник 3',
          link: '/control_panel/courses/1/lessons/1/materials/3'
        },
      ]
    }
  }
}
</script>
