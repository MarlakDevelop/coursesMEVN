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
    <p class="text-h4 mt-6 pt-6">
      Урок 1
    </p>
    <v-divider></v-divider>
    <p class="text-h5 mt-6 mb-3">
      Рейтинг учащихся
    </p>
    <v-row>
      <v-col
        v-for="item in students"
        :key="item.name"
        :cols="12"
      >
        <v-card>
          <v-list-item>
            <div class="text-h6">
              {{ item.fullName }}
            </div>
            <v-spacer></v-spacer>
            <div class="text-body">
              Рейтинг: {{ item.rating }}
            </div>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "rating",
  data() {
    return {
      students: [
        {
          fullName: 'Гурин Аркадий',
          rating: 6.42
        },
        {
          fullName: 'Гурин Аркадий',
          rating: 4.2
        },
        {
          fullName: 'Гурин Аркадий',
          rating: 3.21
        },
        {
          fullName: 'Гурин Аркадий',
          rating: 1.2
        },
        {
          fullName: 'Гурин Аркадий',
          rating: 0.1
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
