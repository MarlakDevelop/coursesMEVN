<template>
  <div class="wrapper">
    <v-btn
      class="mt-6 mb-6"
      :to="'/control_panel/courses/1/lessons/1'"
    >
      <v-icon>
        mdi-chevron-left
      </v-icon>
      <div class="pr-2 pl-1">
        К уроку
      </div>
    </v-btn>
    <div class="text-h4 mb-6 mt-6">
      Создание материала
    </div>
    <v-form :valid="form.valid">
      <v-text-field
        label="Название"
        v-model="form.title"
        :rules="form.titleRules"
        color="white"
      >

      </v-text-field>
    </v-form>
    <div class="text-h5">Тело задачи</div>
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
      class="green darken-2"
    >
      Создать материал
    </v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        valid: false,
        title: '',
        titleRules: [
          v => !!v || 'Название необходимо',
          v => v.length <= 100 || 'Название должно быть короче 100',
        ],
        body: ''
      },
      cmOptions: {
        tabSize: 4,
        mode: 'text/html',
        theme: 'darcula',
        lineNumbers: true,
        line: true
      },
    };
  }
};
</script>

<style></style>
