<template>
  <div>
    <v-btn
      class="mt-6 mb-6"
      :to="'/control_panel/courses'"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К курсам
      </div>
    </v-btn>
    <p class="text-h4 mt-6 pt-6">
      Курс программирование на языке Python.
    </p>
    <v-divider></v-divider>
    <v-form>
      <v-text-field
        label="Название курса"
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
      @click="() => {}"
    >
      Обновить курс
    </v-btn>
    <v-btn
      block
      color="red darken-2"
      class="mt-6"
      @click="() => {}"
    >
      Удалить курс
    </v-btn>
    <v-divider></v-divider>
    <p class="text-h4 mt-8 mb-3">
      Уроки
    </p>
    <v-btn
      class="mb-10 mt-4"
      :to="'/control_panel/courses/1/lessons/create'"
    >
      Создание урока
    </v-btn>
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
              <div class="text-h6">
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
      form: {
        valid: false,
        title: '',
        titleRules: [
          v => !!v || 'Название необходимо',
          v => v.length <= 100 || 'Название должно быть короче 100',
        ],
        rating: '',
        ratingRules: [
          v => !!v || 'Рейтинг необходим',
          v => /^\d*\.?\d*$/.test(v) || 'Рейтинг должен быть целочисленным или дробным числом',
        ]
      },
      lessons: [
        {
          name: 'Урок 7',
          link: '/control_panel/courses/1/lessons/7',
          isClosed: true
        },
        {
          name: 'Урок 6',
          link: '/control_panel/courses/1/lessons/6',
          isClosed: true
        },
        {
          name: 'Урок 5',
          link: '/control_panel/courses/1/lessons/5'
        },
        {
          name: 'Урок 4',
          link: '/control_panel/courses/1/lessons/4'
        },
        {
          name: 'Урок 3',
          link: '/control_panel/courses/1/lessons/3'
        },
        {
          name: 'Урок 2',
          link: '/control_panel/courses/1/lessons/2'
        },
        {
          name: 'Урок 1',
          link: '/control_panel/courses/1/lessons/1'
        }
      ]
    }
  }
}
</script>
