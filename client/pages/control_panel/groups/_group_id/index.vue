<template>
  <div class="wrapper">
    <v-btn
      class="mt-6 mb-6"
      :to="'/control_panel/groups'"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К группам
      </div>
    </v-btn>
    <h2 class="text-h4 mb-6">
      Группа 1
    </h2>
    <v-form v-model="form.valid">
      <v-text-field
        label="Название группы"
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
      Обновить группу
    </v-btn>
    <v-divider></v-divider>
    <div class="text-h4 mt-5">Участники группы</div>
    <div class="text-h5 mt-5">Преподаватель: {{ teacher.fullName }} - {{ teacher.login }}</div>
    <div class="d-flex mt-2">
      <v-btn
        class="mr-4"
        :to="'/control_panel/groups/1/update_teacher'"
      >
        Заменить преподавателя
      </v-btn>
      <v-btn
        class="mr-4"
        :to="'/control_panel/groups/1/add_student'"
      >
        Добавить студентов
      </v-btn>
    </div>
    <div class="text-h5 mt-5">Студенты</div>
    <v-row
      class="mt-2 mb-6"
      dense
    >
      <v-col
        v-for="item in students"
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
                class="red darken-2"
                @click="() => {}"
              >
                Убрать студента из группы
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
  name: "_group_id",
  data() {
    return {
      teacher: {
        login: 'user',
        fullName: 'Гурин Аркадий'
      },
      students: [
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
        },
        {
          login: 'user',
          fullName: 'Гурин Аркадий'
        },
      ],
      form: {
        valid: false,
        title: 'Группа 1',
        titleRules: [
          v => !!v || 'Название необходимо',
          v => v.length <= 100 || 'Название должно быть короче 100',
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
