<template>
  <div class="wrapper">
    <v-btn
      class="mt-6"
      :to="'/teacher_panel/courses/1/groups/1/lessons/1'"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К уроку
      </div>
    </v-btn>
    <p class="text-h4 mt-6 pt-6">
      Урок 1
    </p>
    <v-divider></v-divider>
    <p class="text-h5 mt-6 mb-3">
      Прогресс учащихся
    </p>
    <v-row>
      <v-col
        v-for="item in students"
        :key="item.name"
        :cols="12"
      >
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <div class="mb-2 text-h6">
                {{ item.fullName }}
              </div>
              <v-progress-linear
                v-model="item.tasks_solved / tasks_total * 100"
                color="green"
              ></v-progress-linear>
              <div class="text-caption">
                <b class="green--text text--accent-4">{{ item.tasks_solved }}</b> / {{ tasks_total }} задач зачтено
              </div>
            </v-list-item-content>
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
      tasks_total: 7,
      students: [
        {
          fullName: 'Гурин Аркадий',
          tasks_solved: 7,
        },
        {
          fullName: 'Гурин Аркадий',
          tasks_solved: 6,
        },
        {
          fullName: 'Гурин Аркадий',
          tasks_solved: 4,
        },
        {
          fullName: 'Гурин Аркадий',
          tasks_solved: 2,
        },
        {
          fullName: 'Гурин Аркадий',
          tasks_solved: 0,
        }
      ]
    }
  }
}
</script>
