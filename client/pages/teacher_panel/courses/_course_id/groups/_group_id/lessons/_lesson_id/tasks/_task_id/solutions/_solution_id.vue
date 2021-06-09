<template>
  <div>
    <v-navigation-drawer
      v-model="task.isVisible"
      fixed
      temporary
      right
      :width="800"
      class="pr-10 pl-10"
    >
      <v-btn
        class="mt-6"
        @click="task.isVisible = false"
      >
        <v-icon>mdi-chevron-left</v-icon>
        <div class="pr-2 pl-1">К решению</div>
      </v-btn>
      <p class="text-h4 mt-6 mb-6">
        {{ task.title }}
      </p>
      <div
        v-html="task.body"
        class="overflow-x-auto overflow-y-auto"
      ></div>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="verdict.isVisible"
      fixed
      temporary
      right
      :width="800"
      class="pr-10 pl-10"
    >
      <v-btn
        class="mt-6"
        @click="verdict.isVisible = false"
      >
        <v-icon>mdi-chevron-left</v-icon>
        <div class="pr-2 pl-1">К решению</div>
      </v-btn>
      <p class="text-h5 mt-6 mb-1">
        Вердикт:
      </p>
      <v-card
        dark
        class="pt-4 pl-4 pr-4 pb-4 mt-1 mb-4"
      >
        {{ verdict.title }}
      </v-card>
      <p class="text-h5 mt-6 mb-1">
        Комментарий:
      </p>
      <v-card
        dark
        class="pt-4 pl-4 pr-4 pb-4 mt-1 mb-4"
      >
        {{ verdict.comment }}
      </v-card>
    </v-navigation-drawer>
    <div class="wrapper">
      <v-btn
        class="mt-6 mr-4"
        :to="'/teacher_panel/courses/1/groups/1/lessons/1'"
      >
        <v-icon>mdi-chevron-left</v-icon>
        <div class="pr-2 pl-1">К уроку</div>
      </v-btn>
      <v-btn
        class="mt-6 mr-4"
        :to="'/teacher_panel/courses/1/groups/1/lessons/1/tasks/1/'"
      >
        <v-icon>mdi-chevron-left</v-icon>
        <div class="pr-2 pl-1">К задаче</div>
      </v-btn>
      <p class="text-h4 mt-6 mb-6">
        {{ task.title }}
      </p>
      <v-btn
        class="mb-6"
        @click="task.isVisible = true"
      >
        Условие
      </v-btn>
      <v-card class="overflow-hidden">
        <v-row>
          <v-col
            :cols="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 12 : 9"
            :class="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 'pb-0' : 'pr-0'"
          >
            <v-toolbar
              v-if="status === 'accepted'"
              color="green darken-3"
              dark
            >
              <v-toolbar-title>
                <div>ID 213213</div>
                <div class="text-caption">21 апр, 20:56</div>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-title>
                <div>Зачтено</div>
                <div class="text-caption">21 апр, 20:59</div>
              </v-toolbar-title>
            </v-toolbar>
            <v-toolbar
              v-else-if="status === 'rejected'"
              color="red darken-3"
              dark
            >
              <v-toolbar-title>
                <div>ID 213213</div>
                <div class="text-caption">21 апр, 20:56</div>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-title>
                <div>Доработать</div>
                <div class="text-caption">21 апр, 20:59</div>
              </v-toolbar-title>
            </v-toolbar>
            <v-toolbar
              v-else-if="status === 'waiting'"
              color="grey darken-3"
              dark
            >
              <v-toolbar-title>
                <div>ID 213213</div>
                <div class="text-caption">21 апр, 20:56</div>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-title>
                <div>Ожидание <v-icon>mdi-clock</v-icon></div>
              </v-toolbar-title>
            </v-toolbar>
            <client-only v-if="code">
              <codemirror
                v-model="code"
                :options="cmOptions"
              />
            </client-only>
            <div
              v-else
              class="d-flex text-center mt-10"
            >
              <v-spacer></v-spacer>
              <div>
                <div>
                  Не удалось отобразить решение
                </div>
                <a
                  class="grey--text text-body d-block"
                  href="#"
                >
                  Скачать решение
                </a>
              </div>
              <v-spacer></v-spacer>
            </div>
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 12 : 3"
            :class="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 'pt-0' : 'pl-0'"
          >
            <v-card
              dark
              class="pl-4 pr-4 pt-4 pb-4 text-h5"
            >
              Вердикт
              <v-form @submit="() => {}">
                <v-text-field
                  v-model="verdictForm.title"
                  :rules="verdictForm.titleRules"
                  :counter="100"
                  required
                  label="Название"
                  color="white"
                ></v-text-field>
                <v-text-field
                  v-model="verdictForm.comment"
                  :rules="verdictForm.commentRules"
                  :counter="1000"
                  required
                  label="Комментарий"
                  color="white"
                ></v-text-field>
              </v-form>
              <v-btn
                type="submit"
                block
                class="mt-6"
                color="green darken-2"
              >
                Зачесть
              </v-btn>
              <v-btn
                type="submit"
                block
                class="mt-6"
                color="red darken-2"
              >
                На доработку
              </v-btn>
            </v-card>
            <v-card
              :height="$vuetify.breakpoint.md || $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 400 : 440"
              class="overflow-y-auto"
            >
              <div
                class="pl-4 pr-4 pt-4 pb-4"
              >
                <div
                  class="d-flex mb-4 mt-4 text-right"
                  v-for="item in history"
                  v-if="item.type === 'solution'"
                >
                  <v-spacer></v-spacer>
                  <div
                    class="width-90"
                  >
                    <v-chip
                      link
                      label
                    >
                      <div class="text-truncate">
                        {{ item.title }}
                      </div>
                    </v-chip>
                    <div class="text-caption">
                      {{ item.date }}
                    </div>
                  </div>
                </div>
                <div
                  class="d-flex mb-4 mt-4 text-left"
                  v-else
                >
                  <div
                    class="width-90"
                  >
                    <v-chip
                      link
                      label
                      @click="verdict.isVisible = true"
                    >
                      <div class="text-truncate">
                        {{ item.title }}
                      </div>
                    </v-chip>
                    <div class="text-caption">
                      {{ item.date }}
                    </div>
                  </div>
                  <v-spacer></v-spacer>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>

export default {
  name: "_task_id",
  data() {
    return {
      code: 'from discord.ext import commands\n' +
        'import pymorphy2\n' +
        '\n' +
        '\n' +
        'morph = pymorphy2.MorphAnalyzer()\n' +
        '\n' +
        '\n' +
        'class RandomThings(commands.Cog):\n' +
        '    def __init__(self, bot):\n' +
        '        self.bot = bot\n' +
        '\n' +
        '    @commands.command(name=\'help_bot\')\n' +
        '    async def help_bot(self, ctx):\n' +
        '        await ctx.send(\'Commands:\\n"#!numerals" for agreement with numerals\\n"#!alive" for define alive or not alive\\n"#!noun" for noun case (nomn, gent, datv, accs, ablt, loct) and number state (sing, plur)\\n"#!inf" for infinitive state\\n"#!morph" for full morphological analysis\')\n' +
        '\n' +
        '    @commands.command(name=\'numerals\')\n' +
        '    async def numerals(self, ctx, string, number):\n' +
        '        res = morph.parse(string)[0]\n' +
        '        word = res.make_agree_with_number(int(number)).word\n' +
        '        await ctx.send(f\'{number} {word}\')\n' +
        '\n' +
        '    @commands.command(name=\'alive\')\n' +
        '    async def alive(self, ctx, string):\n' +
        '        res = morph.parse(string)[0]\n' +
        '        await ctx.send(f\'{res.word} {"живой" if res.tag.animacy == "anim" else "не живой"}\')\n' +
        '\n' +
        '    @commands.command(name=\'noun\')\n' +
        '    async def noun(self, ctx, string, case, num):\n' +
        '        res = morph.parse(string)[0]\n' +
        '        result = res.inflect({case, num})\n' +
        '        await ctx.send(result.word)\n' +
        '\n' +
        '    @commands.command(name=\'inf\')\n' +
        '    async def inf(self, ctx, string):\n' +
        '        res = morph.parse(string)[0].normal_form\n' +
        '        await ctx.send(res)\n' +
        '\n' +
        '    @commands.command(name=\'morph\')\n' +
        '    async def morph(self, ctx, string):\n' +
        '        res = morph.parse(string)[0]\n' +
        '        await ctx.send(res)\n' +
        '\n' +
        '\n' +
        'bot = commands.Bot(command_prefix=\'#!\')\n' +
        'bot.add_cog(RandomThings(bot))\n' +
        'bot.run(TOKEN)',
      verdictForm: {
        isValid: false,
        title: '',
        titleRules: [
          v => !!v || 'Название необходимо',
          v => v.length <= 100 || 'Название должно быть короче 100',
        ],
        comment: '',
        commentRules: [
          v => !!v || 'Комментарий необходим',
          v => v.length <= 1000 || 'Название должно быть короче 1000',
        ],
      },
      status: 'rejected',
      cmOptions: {
        tabSize: 4,
        mode: 'python',
        theme: 'darcula',
        lineNumbers: true,
        line: true,
        readOnly: 'nocursor'
        // more CodeMirror options...
      },
      task: {
        isVisible: false,
        title: 'Задача 1',
        body: '<div class="problem-statement">\n<div class="legend"><span style="">\n<p>Реализуйте класс <span style="font-weight:bold;">Date</span>, экземпляры которого при инициализации принимают месяц и день. </p></span><p>При вычитании дат (d1 - d2) должно возвращаться число дней между d1 и d2. </p>\n<p>Число дней должно быть: равно нулю, если d1 и d2 — одна и та же дата, быть больше нуля, если d1 позже d2, быть меньше нуля,\nесли d1 раньше d2.<br> Считайте, что все даты указаны в пределах одного и того же не вискосного года (в феврале 28 дней).</p></di<h3>Пример 1</h<table class="sample-tests"><thea<tr><th>Ввод</th><th>Вывод</t</t</thead><tbod<tr><td><pre>from solution impojan5 = Datjan1 = Datprint(jan5 print(jan1 print(jan1 print(jan5 </pre></td><td</pre></t</t</tbod</tabl<h3>Пример 2</h<table class="sample-tests"><thea<tr><th>Ввод</th><th>Вывод</t</t</thead><tbod<tr><td><pre>from solution impomar5 = Datjan1 = Datprint(mar5 print(jan1 print(jan1 print(mar5 </pre></td><td></pre></t</t</tbod</ta</div>'
      },
      verdict: {
        isVisible: false,
        title: 'Доработать Доработать Доработать Доработать Доработать Доработать Доработать Доработать',
        comment: 'Я крутой Я крутой Я крутой'
      },
      history: [
        {
          title: 'Зачтено',
          type: 'verdict',
          date: '23 апр 20:00'
        },
        {
          title: 'ID 102213',
          type: 'solution',
          date: '23 апр 20:00'
        },
        {
          title: 'Доработать Доработать Доработать Доработать Доработать Доработать Доработать Доработать',
          type: 'verdict',
          date: '23 апр 20:00'
        },
        {
          title: 'ID 102214',
          type: 'solution',
          date: '23 апр 20:00'
        },
        {
          title: 'Доработать',
          type: 'verdict',
          date: '23 апр 20:00'
        },
        {
          title: 'ID 102215',
          type: 'solution',
          date: '23 апр 20:00'
        },
        {
          title: 'Доработать',
          type: 'verdict',
          date: '23 апр 20:00'
        },
        {
          title: 'ID 102216',
          type: 'solution',
          date: '23 апр 20:00'
        },
        {
          title: 'Доработать',
          type: 'verdict',
          date: '23 апр 20:00'
        },
        {
          title: 'ID 102217',
          type: 'solution',
          date: '23 апр 20:00'
        },
        {
          title: 'Доработать',
          type: 'verdict',
          date: '23 апр 20:00'
        },
        {
          title: 'ID 102213',
          type: 'solution',
          date: '23 апр 20:00'
        },
        {
          title: 'Доработать',
          type: 'verdict',
          date: '23 апр 20:00'
        },
        {
          title: 'ID 102214',
          type: 'solution',
          date: '23 апр 20:00'
        },
        {
          title: 'Доработать',
          type: 'verdict',
          date: '23 апр 20:00'
        },
        {
          title: 'ID 102215',
          type: 'solution',
          date: '23 апр 20:00'
        },
        {
          title: 'Доработать',
          type: 'verdict',
          date: '23 апр 20:00'
        },
        {
          title: 'ID 102216',
          type: 'solution',
          date: '23 апр 20:00'
        },
        {
          title: 'Доработать',
          type: 'verdict',
          date: '23 апр 20:00'
        },
        {
          title: 'ID 102217',
          type: 'solution',
          date: '23 апр 20:00'
        },
        {
          title: 'Доработать',
          type: 'verdict',
          date: '23 апр 20:00'
        },
        {
          title: 'ID 102213',
          type: 'solution',
          date: '23 апр 20:00'
        }
      ]
    }
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror
    }
  }
}
</script>
