<template>
  <div class="wrapper">
    <v-btn
      class="mt-6"
      :to="'/control_panel/courses/1/lessons/1'"
    >
      <v-icon>mdi-chevron-left</v-icon>
      <div class="pr-2 pl-1">К уроку</div>
    </v-btn>
    <p class="text-h4 mt-6 mb-6">
      Материал 1
    </p>
    <v-form>
      <v-text-field
        label="Название"
        v-model="form.title"
        :rules="form.titleRules"
        :counter="100"
      ></v-text-field>
    </v-form>
    <no-ssr>
      <client-only>
        <codemirror
          v-model="form.body"
          :options="cmOptions"
        />
      </client-only>
    </no-ssr>
    <div
      v-html="form.body"
      class="overflow-x-auto overflow-y-auto mt-6 mb-6"
    ></div>
    <v-btn
      block
      color="green darken-2"
    >
      Обновить материал
    </v-btn>
    <v-btn
      block
      color="red darken-2"
      class="mt-6"
      @click="() => {}"
    >
      Удалить материал
    </v-btn>
  </div>
</template>

<script>

export default {
  name: "_material_id",
  data() {
    return {
      form: {
        valid: false,
        title: 'Учебник 1',
        titleRules: [
          v => !!v || 'Название необходимо',
          v => v.length <= 100 || 'Название должно быть короче 100',
        ],
        body: '<div class="problem-statement">\n<div class="legend"><span style="">\n<p>Реализуйте класс <span style="font-weight:bold;">Date</span>, экземпляры которого при инициализации принимают месяц и день. </p></span><p>При вычитании дат (d1 - d2) должно возвращаться число дней между d1 и d2. </p>\n<p>Число дней должно быть: равно нулю, если d1 и d2 — одна и та же дата, быть больше нуля, если d1 позже d2, быть меньше нуля,\nесли d1 раньше d2.<br> Считайте, что все даты указаны в пределах одного и того же не вискосного года (в феврале 28 дней).</p></di<h3>Пример 1</h<table class="sample-tests"><thea<tr><th>Ввод</th><th>Вывод</t</t</thead><tbod<tr><td><pre>from solution impojan5 = Datjan1 = Datprint(jan5 print(jan1 print(jan1 print(jan5 </pre></td><td</pre></t</t</tbod</tabl<h3>Пример 2</h<table class="sample-tests"><thea<tr><th>Ввод</th><th>Вывод</t</t</thead><tbod<tr><td><pre>from solution impomar5 = Datjan1 = Datprint(mar5 print(jan1 print(jan1 print(mar5 from solution impomar5 = Datjan1 = Datprint(mar5 print(jan1 print(jan1 print(mar5 from solution impomar5 = Datjan1 = Datprint(mar5 print(jan1 print(jan1 print(mar5</pre></td><td></pre></t</t</tbod</ta</div>',
      },
      cmOptions: {
        tabSize: 4,
        mode: 'text/html',
        theme: 'darcula',
        lineNumbers: true,
        line: true
      }
    }
  }
}
</script>
