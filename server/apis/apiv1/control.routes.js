const {Router} = require('express')
const config = require('config')
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth.middleware')
const router = Router()

// /api/v1/control/users
router.get(
  '/users',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json([
        {
          id: 7,
          fullName: 'Аркадий Гурин',
          login: 'user'
        },
        {
          id: 6,
          fullName: 'Аркадий Гурин',
          login: 'user'
        },
        {
          id: 5,
          fullName: 'Аркадий Гурин',
          login: 'user'
        },
        {
          id: 4,
          fullName: 'Аркадий Гурин',
          login: 'user'
        },
        {
          id: 3,
          fullName: 'Аркадий Гурин',
          login: 'user'
        },
        {
          id: 2,
          fullName: 'Аркадий Гурин',
          login: 'user'
        },
        {
          id: 1,
          fullName: 'Аркадий Гурин',
          login: 'user'
        }
      ])
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/users
router.post(
  '/users',
  [
    // auth
    check(
      'login',
      'Поле логина должно быть заполнено и иметь длину максимум 32'
    ).exists().isLength({ max: 32 }),
    check(
      'password',
      'Поле пароля должно быть заполнено и иметь длину максимум 32'
    ).exists().isLength({ max: 32 }),
    check(
      'fullName',
      'Поле имени должно быть заполнено и иметь длину максимум 100'
    ).exists().isLength({ max: 100 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке создать пользователя'
        })
      }
      res.json({
        message: 'Пользователь создан успешно'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/users/:userId
router.get(
  '/users/:userId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json({
        login: 'user',
        fullName: 'Аркадий Гурин'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/users/:userId
router.patch(
  '/users/:userId',
  [
    // auth
    check(
      'login',
      'Поле логина должно иметь длину максимум 32'
    ).isLength({ max: 32 }),
    check(
      'password',
      'Поле пароля должно иметь длину максимум 32'
    ).isLength({ max: 32 }),
    check(
      'fullName',
      'Поле имени должно иметь длину максимум 100'
    ).isLength({ max: 100 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке обновить пользователя'
        })
      }
      res.json({
        message: 'Пользователь успешно обновлён'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/users/:userId
router.delete(
  '/users/:userId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        message: 'Пользователь успешно удалён'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses
router.get(
  '/courses',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json([
        {
          id: 2,
          name: 'Курс по WEB'
        },
        {
          id: 1,
          name: 'Курс по питону'
        }
      ])
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses
router.post(
  '/courses',
  [
    // auth
    check(
      'name',
      'Поле названия должно быть заполнено и иметь длину максимум 100'
    ).exists().isLength({ max: 100 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке создать курс'
        })
      }
      res.json({
        message: 'Курс создан успешно'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId
router.get(
  '/courses/:courseId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json({
        courseName: 'Курс по питону',
        lessons: [
          {
            id: 7,
            name: 'Урок 7'
          },
          {
            id: 6,
            name: 'Урок 6'
          },
          {
            id: 5,
            name: 'Урок 5'
          },
          {
            id: 4,
            name: 'Урок 4'
          },
          {
            id: 3,
            name: 'Урок 3'
          },
          {
            id: 2,
            name: 'Урок 2'
          },
          {
            id: 1,
            name: 'Урок 1'
          }
        ]
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId
router.patch(
  '/courses/:courseId',
  [
    // auth
    check(
      'name',
      'Поле названия должно иметь длину максимум 100'
    ).isLength({ max: 100 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке обновить курс'
        })
      }
      res.json({
        message: 'Курс успешно обновлён'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId
router.delete(
  '/courses/:courseId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        message: 'Курс успешно удалён'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })


// /api/v1/control/courses/:courseId/lessons
router.get(
  '/courses/:courseId/lessons',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json({
        lessons: [
          {
            id: 7,
            name: 'Урок 7'
          },
          {
            id: 6,
            name: 'Урок 6'
          },
          {
            id: 5,
            name: 'Урок 5'
          },
          {
            id: 4,
            name: 'Урок 4'
          },
          {
            id: 3,
            name: 'Урок 3'
          },
          {
            id: 2,
            name: 'Урок 2'
          },
          {
            id: 1,
            name: 'Урок 1'
          }
        ]
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons
router.post(
  '/courses/:courseId/lessons',
  [
    // auth
    check(
      'name',
      'Поле названия должно быть заполнено и иметь длину максимум 100'
    ).exists().isLength({ max: 100 }),
    check(
      'rating',
      'Поле рейтинга должно быть заполнено и быть десятичным дробным числом'
    ).exists().isDecimal()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке создать урок'
        })
      }
      res.json({
        message: 'Урок создан успешно'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId
router.get(
  '/courses/:courseId/lessons/:lessonId',
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
        rating: 2.00,
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
            name: 'Материал 1'
          },
          {
            id: 2,
            name: 'Материал 2'
          },
          {
            id: 3,
            name: 'Материал 3'
          }
        ]
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId
router.patch(
  '/courses/:courseId/lessons/:lessonId',
  [
    // auth
    check(
      'name',
      'Поле названия должно иметь длину максимум 100'
    ).isLength({ max: 100 }),
    check(
      'rating',
      'Поле рейтинга должно быть десятичным дробным числом'
    ).isDecimal()
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
      res.json({
        message: 'Урок успешно обновлён'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId
router.delete(
  '/courses/:courseId/lessons/:lessonId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        message: 'Урок успешно удалён'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/tasks
router.get(
  '/courses/:courseId/lessons/:lessonId/tasks',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json([
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
      ])
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/tasks
router.post(
  '/courses/:courseId/lessons/:lessonId/tasks',
  [
    // auth
    check(
      'name',
      'Поле названия должно быть заполнено и иметь длину максимум 100'
    ).exists().isLength({ max: 100 }),
    check(
      'body',
      'Тело задачи должно быть заполнено'
    ).exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке создать задачу'
        })
      }
      res.json({
        message: 'Задача создана успешно'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/tasks/:taskId
router.get(
  '/courses/:courseId/lessons/:lessonId/tasks/:taskId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
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
          '</div>'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/tasks/:taskId
router.patch(
  '/courses/:courseId/lessons/:lessonId/tasks/:taskId',
  [
    // auth
    check(
      'name',
      'Поле названия должно иметь длину максимум 100'
    ).exists().isLength({ max: 100 }),
    check('body')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке обновить задачу'
        })
      }
      res.json({
        message: 'Задача успешно обновлена'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/tasks/:taskId
router.delete(
  '/courses/:courseId/lessons/:lessonId/tasks/:taskId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        message: 'Задача успешно удалена'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/materials
router.get(
  '/courses/:courseId/lessons/:lessonId/materials',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json([
        {
          id: 1,
          name: 'Материал 1'
        },
        {
          id: 2,
          name: 'Материал 2'
        },
        {
          id: 3,
          name: 'Материал 3'
        }
      ])
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/materials
router.post(
  '/courses/:courseId/lessons/:lessonId/materials',
  [
    // auth
    check(
      'name',
      'Поле названия должно быть заполнено и иметь длину максимум 100'
    ).exists().isLength({ max: 100 }),
    check(
      'body',
      'Тело материала должно быть заполнено'
    ).exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке создать материал'
        })
      }
      res.json({
        message: 'Материал создан успешно'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/materials/:materialId
router.get(
  '/courses/:courseId/lessons/:lessonId/materials/:materialId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json({
        materialName: 'Материал 1',
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

// /api/v1/control/courses/:courseId/lessons/:lessonId/materials/:materialId
router.patch(
  '/courses/:courseId/lessons/:lessonId/materials/:materialId',
  [
    // auth
    check(
      'name',
      'Поле названия должно иметь длину максимум 100'
    ).exists().isLength({ max: 100 }),
    check('body')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке обновить материал'
        })
      }
      res.json({
        message: 'Материал успешно обновлён'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/materials/:materialId
router.delete(
  '/courses/:courseId/lessons/:lessonId/materials/:materialId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        message: 'Материал успешно удалён'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups
router.get(
  '/groups',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json([
        {
          id: 1,
          name: 'Курс по питону - УАвиаК-МЦК'
        },
        {
          id: 2,
          name: 'Курс по WEB - УАвиаК-МЦК'
        }
      ])
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups
router.post(
  '/groups',
  [
    // auth,
    check('name', 'Название группы должно быть указано и иметь длину максимум 100').exists().isLength({ max: 100 }),
    check('courseId', 'Айди курса должно быть указано').exists().isNumeric()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке создать группу'
        })
      }

      res.json({
        message: 'Группа успешно создана'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups/:groupId
router.get(
  '/groups/:groupId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        groupName: 'Курс по питону - УАвиаК-МЦК',
        teacher: {
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        students: [
          {
            id: 1,
            login: 'user',
            fullName: 'Аркадий Гурин Дмитриевич'
          },
          {
            id: 2,
            login: 'user',
            fullName: 'Аркадий Гурин Дмитриевич'
          },
          {
            id: 3,
            login: 'user',
            fullName: 'Аркадий Гурин Дмитриевич'
          },
          {
            id: 4,
            login: 'user',
            fullName: 'Аркадий Гурин Дмитриевич'
          },
          {
            id: 5,
            login: 'user',
            fullName: 'Аркадий Гурин Дмитриевич'
          },
          {
            id: 6,
            login: 'user',
            fullName: 'Аркадий Гурин Дмитриевич'
          }
        ]
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups/:groupId
router.patch(
  '/groups/:groupId',
  [
    // auth,
    check('name', 'Название группы должно длину максимум 100').exists().isLength({ max: 100 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке обновить группу'
        })
      }

      res.json({
        message: 'Группа успешно обновлена'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups/:groupId
router.delete(
  '/groups/:groupId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        message: 'Группа успешно удалена'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups/:groupId/set_teacher
router.post(
  '/groups/:groupId/set_teacher',
  [
    // auth,
    check('userId', 'Айди юзера должно быть указано').exists().isNumeric()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке установить преподавателя для группы'
        })
      }

      res.json({
        message: 'Учитель для группы успешно установлен'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups/:groupId/students
router.get(
  '/groups/:groupId/students',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json([
        {
          id: 1,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 2,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 3,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 4,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 5,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 6,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        }
      ])
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups/:groupId/students
router.post(
  '/groups/:groupId/students',
  [
    // auth,
    check('userId', 'Айди юзера должно быть указано').exists().isNumeric()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке добавить студента в группу'
        })
      }

      res.json({
        message: 'Студент успешно добавлен в группу'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups/:groupId/students/:userId
router.delete(
  '/groups/:groupId/students/:userId',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json({
        message: 'Студент успешно удалён из группы'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups/:groupId/users_exclude_students
router.get(
  '/groups/:groupId/users_exclude_students',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json([
        {
          id: 1,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 2,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 3,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 4,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 5,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 6,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        }
      ])
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups/:groupId/users_exclude_teacher
router.get(
  '/groups/:groupId/users_exclude_teacher',
  [
    // auth
  ],
  async (req, res) => {
    try {
      res.json([
        {
          id: 1,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 2,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 3,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 4,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 5,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        },
        {
          id: 6,
          login: 'user',
          fullName: 'Аркадий Гурин Дмитриевич'
        }
      ])
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
