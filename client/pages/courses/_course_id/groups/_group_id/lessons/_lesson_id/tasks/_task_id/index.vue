<template>
  <div class="wrapper">
    <v-btn
      class="mt-6"
      :to="'/courses/1/groups/1/lessons/1'"
    >
      <v-icon>mdi-chevron-left</v-icon>
      <div class="pr-2 pl-1">К уроку</div>
    </v-btn>
    <p class="text-h4 mt-6 mb-6">
      Задача 1
    </p>
    <v-row>
      <v-col
        :cols="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 12 : 9"
      >
        <div
          v-html="body"
          class="overflow-x-auto overflow-y-auto"
        ></div>
      </v-col>
      <v-col
        :cols="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 12 : 3"
      >
        <v-toolbar
          dark
        >
          <v-spacer></v-spacer>
          <v-btn>
            Отправить решение <v-icon>mdi-upload</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-col>
    </v-row>
    <div
      class="d-flex mt-10"
      v-if="!($vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm)"
    >
      <v-btn>
        <v-icon>mdi-arrow-left</v-icon> Предыдущая
      </v-btn>
      <v-spacer></v-spacer>
      <div class="d-flex justify-center">
        <v-btn
          v-for="item in tasks"
          class="mt-1 mr-1"
          :to="item.link"
          icon
        >
          <v-icon
            v-if="item.status === 'accepted'"
            color="green"
          >
            mdi-checkbox-marked-circle
          </v-icon>
          <v-icon
            v-else-if="item.status === 'rejected'"
            color="red"
          >
            mdi-close-circle
          </v-icon>
          <v-icon
            v-else-if="item.status === 'waiting'"
            color="grey"
          >
            mdi-clock-time-five
          </v-icon>
          <v-icon
            v-else
            color="grey darken-3"
          >
            mdi-record-circle
          </v-icon>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn>
        Следующая <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>

export default {
  name: "_task_id",
  data() {
    return {
      body: '<div class="problem-statement">\n<div class="legend"><span style="">\n<p>Реализуйте класс <span style="font-weight:bold;">Date</span>, экземпляры которого при инициализации принимают месяц и день. </p></span><p>При вычитании дат (d1 - d2) должно возвращаться число дней между d1 и d2. </p>\n<p>Число дней должно быть: равно нулю, если d1 и d2 — одна и та же дата, быть больше нуля, если d1 позже d2, быть меньше нуля,\nесли d1 раньше d2.<br> Считайте, что все даты указаны в пределах одного и того же не вискосного года (в феврале 28 дней).</p></di<h3>Пример 1</h<table class="sample-tests"><thea<tr><th>Ввод</th><th>Вывод</t</t</thead><tbod<tr><td><pre>from solution impojan5 = Datjan1 = Datprint(jan5 print(jan1 print(jan1 print(jan5 </pre></td><td</pre></t</t</tbod</tabl<h3>Пример 2</h<table class="sample-tests"><thea<tr><th>Ввод</th><th>Вывод</t</t</thead><tbod<tr><td><pre>from solution impomar5 = Datjan1 = Datprint(mar5 print(jan1 print(jan1 print(mar5 from solution impomar5 = Datjan1 = Datprint(mar5 print(jan1 print(jan1 print(mar5 from solution impomar5 = Datjan1 = Datprint(mar5 print(jan1 print(jan1 print(mar5</pre></td><td></pre></t</t</tbod</ta</div>',
      tasks: [
        {
          link: '/courses/1/groups/1/lessons/1/tasks/1/solutions/1',
          status: 'accepted'
        },
        {
          link: '/courses/1/groups/1/lessons/1/tasks/2/solutions/2',
          status: 'accepted'
        },
        {
          link: '/courses/1/groups/1/lessons/1/tasks/3/solutions/3',
          status: 'accepted'
        },
        {
          link: '/courses/1/groups/1/lessons/1/tasks/4/solutions/4',
          status: 'accepted'
        },
        {
          link: '/courses/1/groups/1/lessons/1/tasks/5/solutions/5',
          status: 'rejected'
        },
        {
          link: '/courses/1/groups/1/lessons/1/tasks/6/solutions/6',
          status: 'waiting'
        },
        {
          link: '/courses/1/groups/1/lessons/1/tasks/7'
        },
      ]
    }
  }
}
</script>
