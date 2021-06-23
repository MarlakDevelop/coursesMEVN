const {Router} = require('express')
const config = require('config')
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth.middleware')
const router = Router()

// /api/v1/teacher/courses/:courseId/groups/:groupId
router.get(
  '/courses/:courseId/groups/:groupId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json({
        groupName: 'Курс по питону - Уавиак-МЦК',
        lessons: [
          {
            id: 15,
            name: 'Урок 15',
            isVisible: false
          },
          {
            id: 14,
            name: 'Урок 14',
            isVisible: false
          },
          {
            id: 13,
            name: 'Урок 13',
            isVisible: false
          },
          {
            id: 12,
            name: 'Урок 12',
            isVisible: false
          },
          {
            id: 11,
            name: 'Урок 11',
            isVisible: false
          },
          {
            id: 10,
            name: 'Урок 10',
            isVisible: true
          },
          {
            id: 9,
            name: 'Урок 9',
            isVisible: true
          },
          {
            id: 8,
            name: 'Урок 8',
            isVisible: true
          },
          {
            id: 7,
            name: 'Урок 7',
            isVisible: true
          },
          {
            id: 6,
            name: 'Урок 6',
            isVisible: true
          },
          {
            id: 5,
            name: 'Урок 5',
            isVisible: true
          },
          {
            id: 4,
            name: 'Урок 4',
            isVisible: true
          },
          {
            id: 3,
            name: 'Урок 3',
            isVisible: true
          },
          {
            id: 2,
            name: 'Урок 2',
            isVisible: true
          },
          {
            id: 1,
            name: 'Урок 1',
            isVisible: true
          }
        ]
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/rating
router.get(
  '/courses/:courseId/groups/:groupId/rating',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json({
        groupName: 'Курс по питону - Уавиак-МЦК',
        students: [
          {
            id: 6,
            fullName: 'Гурин Аркадий',
            rating: 42.32
          },
          {
            id: 5,
            fullName: 'Гурин Аркадий',
            rating: 37.32
          },
          {
            id: 1,
            fullName: 'Гурин Аркадий',
            rating: 32.32
          },
          {
            id: 2,
            fullName: 'Гурин Аркадий',
            rating: 27.32
          },
          {
            id: 3,
            fullName: 'Гурин Аркадий',
            rating: 22.32
          },
          {
            id: 4,
            fullName: 'Гурин Аркадий',
            rating: 17.32
          },
        ]
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/waiting_tasks
router.get(
  '/courses/:courseId/groups/:groupId/waiting_tasks',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json({
        groupName: 'Курс по питону - Уавиак-МЦК',
        solutions: [
          {
            id: 6,
            lessonId: 1,
            taskId: 1,
            taskName: 'Задача 6',
            studentFullName: 'Гурин Аркадий'
          },
          {
            id: 5,
            lessonId: 1,
            taskId: 1,
            taskName: 'Задача 5',
            studentFullName: 'Гурин Аркадий'
          },
          {
            id: 4,
            lessonId: 1,
            taskId: 1,
            taskName: 'Задача 4',
            studentFullName: 'Гурин Аркадий'
          },
          {
            id: 3,
            lessonId: 1,
            taskId: 1,
            taskName: 'Задача 3',
            studentFullName: 'Гурин Аркадий'
          },
          {
            id: 2,
            lessonId: 1,
            taskId: 1,
            taskName: 'Задача 2',
            studentFullName: 'Гурин Аркадий'
          },
          {
            id: 1,
            lessonId: 1,
            taskId: 1,
            taskName: 'Задача 1',
            studentFullName: 'Гурин Аркадий'
          }
        ]
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json({
        lessonName: 'Урок 1',
        tasks: [
          {
            id: 1,
            name: 'Задача 1'
          },
          {
            id: 2,
            name: 'Задача 2'
          },
          {
            id: 3,
            name: 'Задача 3'
          },
          {
            id: 4,
            name: 'Задача 4'
          },
          {
            id: 5,
            name: 'Задача 5'
          },
          {
            id: 6,
            name: 'Задача 6'
          },
          {
            id: 7,
            name: 'Задача 7'
          }
        ],
        materials: [
          {
            id: 1,
            name: 'Учебник 1'
          },
          {
            id: 2,
            name: 'Учебник 2'
          },
          {
            id: 3,
            name: 'Учебник 3'
          }
        ],
        isVisible: false
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/set_visibility
router.patch(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/set_visibility',
  [
    check('visible', 'Поле visible должно быть булевым значением').exists().isBoolean()
    // auth
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке обновить урок'
        })
      }
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json({ message: 'Видимость урока обновлена' })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/progress
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/progress',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json({
        lessonName: 'Курс по питону - Уавиак-МЦК',
        students: [
          {
            id: 6,
            fullName: 'Аркадий Гурин',
            tasksAccepted: 7
          },
          {
            id: 5,
            fullName: 'Аркадий Гурин',
            tasksAccepted: 6
          },
          {
            id: 1,
            fullName: 'Аркадий Гурин',
            tasksAccepted: 4
          },
          {
            id: 2,
            fullName: 'Аркадий Гурин',
            tasksAccepted: 3
          },
          {
            id: 3,
            fullName: 'Аркадий Гурин',
            tasksAccepted: 1
          },
          {
            id: 4,
            fullName: 'Аркадий Гурин',
            tasksAccepted: 0
          }
        ],
        tasksTotal: 7
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        taskName: 'Задача 1',
        body: '<div class="problem-statement">\n' +
          '   <h2></h2>\n' +
          '   <div class="legend"><span style="">\n' +
          '         <p>Числа Трибоначчи — это последовательность целых чисел, которая определяется так: \n' +
          '            </p><ul>\n' +
          '               <li>первое, второе и третье числа Трибоначчи равны единице; </li>\n' +
          '               <li>каждое следующее число Трибоначчи равно сумме трёх предыдущих. </li>\n' +
          '            </ul>В общем, почти как числа Фибоначчи. \n' +
          '         <p></p></span><p>Напишите программу, которая вычисляет числа Трибоначчи.</p>\n' +
          '   </div>\n' +
          '   <h2>Формат ввода</h2>\n' +
          '   <div class="input-specification"><span style="">\n' +
          '         <p>Вводится одно натуральное число <span class="tex-math-text">N</span> (N &lt;= 75).\n' +
          '         </p></span></div>\n' +
          '   <h2>Формат вывода</h2>\n' +
          '   <div class="output-specification"><span style="">\n' +
          '         <p>Выводятся первые <span class="tex-math-text">N</span> чисел Трибоначчи.\n' +
          '         </p></span></div>\n' +
          '   <h2>Пример</h2>\n' +
          '   <table class="sample-tests">\n' +
          '      <thead>\n' +
          '         <tr>\n' +
          '            <th>Ввод</th>\n' +
          '            <th>Вывод</th>\n' +
          '         </tr>\n' +
          '      </thead>\n' +
          '      <tbody>\n' +
          '         <tr>\n' +
          '            <td><pre>6</pre></td>\n' +
          '            <td><pre>1 1 1 3 5 9</pre></td>\n' +
          '         </tr>\n' +
          '      </tbody>\n' +
          '   </table>\n' +
          '</div>',
        studentsSolutions: [
          {
            id: 1,
            studentFullName: 'Аркадий Гурин',
            status: 'waiting'
          },
          {
            id: 2,
            studentFullName: 'Аркадий Гурин',
            status: 'waiting'
          },
          {
            id: 3,
            studentFullName: 'Аркадий Гурин',
            status: 'accepted'
          },
          {
            id: 4,
            studentFullName: 'Аркадий Гурин',
            status: 'rejected'
          },
        ]
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/materials/:materialId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/materials/:materialId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        materialName: 'Задача 1',
        body: '<div class="problem-statement">\n' +
          '   <h2></h2>\n' +
          '   <div class="legend"><span style="">\n' +
          '         <p>Числа Трибоначчи — это последовательность целых чисел, которая определяется так: \n' +
          '            </p><ul>\n' +
          '               <li>первое, второе и третье числа Трибоначчи равны единице; </li>\n' +
          '               <li>каждое следующее число Трибоначчи равно сумме трёх предыдущих. </li>\n' +
          '            </ul>В общем, почти как числа Фибоначчи. \n' +
          '         <p></p></span><p>Напишите программу, которая вычисляет числа Трибоначчи.</p>\n' +
          '   </div>\n' +
          '   <h2>Формат ввода</h2>\n' +
          '   <div class="input-specification"><span style="">\n' +
          '         <p>Вводится одно натуральное число <span class="tex-math-text">N</span> (N &lt;= 75).\n' +
          '         </p></span></div>\n' +
          '   <h2>Формат вывода</h2>\n' +
          '   <div class="output-specification"><span style="">\n' +
          '         <p>Выводятся первые <span class="tex-math-text">N</span> чисел Трибоначчи.\n' +
          '         </p></span></div>\n' +
          '   <h2>Пример</h2>\n' +
          '   <table class="sample-tests">\n' +
          '      <thead>\n' +
          '         <tr>\n' +
          '            <th>Ввод</th>\n' +
          '            <th>Вывод</th>\n' +
          '         </tr>\n' +
          '      </thead>\n' +
          '      <tbody>\n' +
          '         <tr>\n' +
          '            <td><pre>6</pre></td>\n' +
          '            <td><pre>1 1 1 3 5 9</pre></td>\n' +
          '         </tr>\n' +
          '      </tbody>\n' +
          '   </table>\n' +
          '</div>'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        status: 'accepted',
        statusDate: Date.now(),
        lastSubSolution: {
          id: 421322,
          date: Date.now(),
          file: {
            path: 'https://yastatic.net/s3/lyceum/content/images/first-year/lesson-2/fy-2-1.png',
            mimeType: 'text/x-python',
            body: 'from discord.ext import commands\n' +
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
              'bot.run(TOKEN)'
          }
        }
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/history
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/history',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json( {
        answers: [
          {
            id: 421322,
            name: 'Доработать',
            date: Date.now(),
            type: 'verdict',
          },
          {
            id: 421322,
            date: Date.now(),
            type: 'solution'
          },
          {
            id: 421322,
            date: Date.now(),
            type: 'solution'
          },
          {
            id: 421322,
            date: Date.now(),
            type: 'solution'
          },
          {
            id: 421322,
            name: 'Доработать',
            date: Date.now(),
            type: 'verdict',
          },
          {
            id: 421322,
            name: 'Доработать',
            date: Date.now(),
            type: 'verdict',
          },
          {
            id: 421322,
            name: 'Доработать',
            date: Date.now(),
            type: 'verdict',
          }
        ]
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/verdicts/:verdictId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/verdicts/:verdictId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        name: 'Доработать',
        comment: 'Доработать loremsa dfas f;as kf ka;sl;k fl;kdjl;as fj;kasdk;j gjkdsa lg saj;tg j;ldsajl fbj ajs.d p fdsa,jf;dsiv-isar.k;v;xjrlweqrgufds;a.mg;aisdl.hsdalg m;a helo worle привет я аркадий сегодня мне исполняется 16 лет но я нке уверен в себе и своих силах',
        status: 'rejected'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/solutions/:subSolutionId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/solutions/:subSolutionId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        date: Date.now(),
        file: {
          path: 'https://yastatic.net/s3/lyceum/content/images/first-year/lesson-2/fy-2-1.png',
          mimeType: 'text/x-python',
          body: 'from discord.ext import commands\n' +
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
            'bot.run(TOKEN)'
        }
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/send_verdict
router.post(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/send_verdict',
  [
    check('name', 'Название для вердикта должно быть заполнено').exists().isLength({max: 100}),
    check('comment', 'Комментарий для вердикта должен быть заполнен и иметь длину максимум 1000').exists().isLength({max: 1000}),
    check('status', 'Статус вердикта должен равняться либо accepted, либо rejected').exists().isIn(['accepted', 'rejected']),
    // auth,
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке отправить вердикт'
        })
      }

      res.json({
        message: 'Вердикт отправлен'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' + e })
    }
  })

module.exports = router
