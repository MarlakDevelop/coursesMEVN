const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../../models/User.model')
const Student = require('../../models/Student.model')
const Course = require('../../models/Course.model')
const Lesson = require('../../models/Lesson.model')
const Task = require('../../models/Task.model')
const Material = require('../../models/Material.model')
const Group = require('../../models/Group.model')
const Solution = require('../../models/Solution.model')
const SubSolution = require('../../models/SubSolution.model')
const Verdict = require('../../models/Verdict.model')
const auth = require('../../middleware/auth.middleware')
const control = require('../../middleware/control.middleware')
const router = Router()

// /api/v1/control/controllers
router.post(
  '/controllers',
  [
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
    check(
      'secret',
      'Секретный ключ должен быть указан'
    ).exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке создать контроллера'
        })
      }
      const {secret, login, password, fullName} = req.body
      if (secret !== config.get('secret'))
        return res.status(403).json({message: 'Отказано в доступе, ключ неверен'})
      const candidate = await User.findOne({ login })
      if (candidate)
        return res.status(400).json({ message: 'Такой пользователь уже существует' })
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ login, password: hashedPassword, fullName, isController: true, passwordChanged: Date.now() })
      await user.save()
      res.json({
        message: 'Контроллер создан успешно',
        id: user._id
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/users
router.get(
  '/users',
  [
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const users = await User.find({}, 'login fullName').sort('login').lean()
      res.json(users.map((item) => {
        return {
          ...item,
          id: item._id
        }
      }))
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/users
router.post(
  '/users',
  [
    auth,
    control,
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
      const {login, password, fullName} = req.body
      const candidate = await User.findOne({ login })
      if (candidate)
        return res.status(400).json({ message: 'Такой пользователь уже существует' })
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ login, password: hashedPassword, fullName, passwordChanged: Date.now() })
      await user.save()
      res.json({
        message: 'Пользователь создан успешно',
        id: user._id
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/users/:userId
router.get(
  '/users/:userId',
  [
    auth,
    control
  ],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId, 'login fullName').lean()
      if (!user)
        return res.status(404).json({message: 'Пользователь не найден'})
      res.json(user)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/users/:userId
router.patch(
  '/users/:userId',
  [
    auth,
    control,
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
      const {login, password, fullName} = req.body
      const candidate = await User.findOne({login})
      let fields = {}
      if (!!login && !candidate)
        fields.login = login
      if (!!fullName)
        fields.fullName = fullName
      if (!!password) {
        fields.password = await bcrypt.hash(password, 12)
        fields.passwordChanged = Date.now()
      }
      // Да, да. Я король if-else
      const result = await User.findByIdAndUpdate(req.params.userId, fields)
      if (!result)
        return res.status(404).json({message: 'Пользователь не найден'})
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
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const result = await User.findByIdAndDelete(req.params.userId)
      if (!result)
        return res.status(404).json({message: 'Пользователь не найден'})
      await Student.deleteMany({user: req.params.userId})
      await Solution.deleteMany({user: req.params.userId})
      await SubSolution.deleteMany({user: req.params.userId})
      await Verdict.deleteMany({user: req.params.userId})
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
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const courses = await Course.find({}, 'name').sort('name').lean()
      res.json(courses.map((item) => {
        return {
          ...item,
          id: item._id
        }
      }))
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses
router.post(
  '/courses',
  [
    auth,
    control,
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
      const {name} = req.body
      const candidate = await Course.findOne({ name })
      if (candidate)
        return res.status(400).json({ message: 'Такой курс уже существует' })
      const course = new Course({ name })
      await course.save()
      res.json({
        message: 'Курс создан успешно',
        id: course._id
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId
router.get(
  '/courses/:courseId',
  [
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.courseId, 'name').lean()
      if (!course)
        return res.status(404).json({message: 'Курс не найден'})
      const lessons = await Lesson.find({course: req.params.courseId}, 'name').sort('-date').lean()
      res.json({
        courseName: course.name,
        lessons: lessons.map((item) => {
          return {
            ...item,
            id: item._id
          }
        })
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId
router.patch(
  '/courses/:courseId',
  [
    auth,
    control,
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
      const {name} = req.body
      const candidate = await Course.findOne({name})
      let fields = {}
      if (!!name && !candidate)
        fields.name = name
      const result = await Course.findByIdAndUpdate(req.params.courseId, fields)
      if (!result)
        return res.status(404).json({message: 'Курс не найден'})
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
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const result = await Course.findByIdAndDelete(req.params.courseId)
      if (!result)
        return res.status(404).json({message: 'Курс не найден'})
      await Lesson.deleteMany({course: req.params.courseId})
      await Task.deleteMany({course: req.params.courseId})
      await Material.deleteMany({course: req.params.courseId})
      await Group.deleteMany({course: req.params.courseId})
      await Student.deleteMany({course: req.params.courseId})
      await Solution.deleteMany({course: req.params.courseId})
      await SubSolution.deleteMany({course: req.params.courseId})
      await Verdict.deleteMany({course: req.params.courseId})
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
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const lessons = await Lesson.find({course: req.params.courseId}, 'name').sort('-date').lean()
      res.json(lessons.map((item) => {
        return {
          ...item,
          id: item._id
        }
      }))
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons
router.post(
  '/courses/:courseId/lessons',
  [
    auth,
    control,
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
      const course = await Course.findById(req.params.courseId)
      if (!course)
        return res.status(404).json({
          message: 'Курс не найден'
        })
      const {name, rating} = req.body
      const lesson = new Lesson({ name, rating, date: Date.now(), course: req.params.courseId })
      await lesson.save()
      res.json({
        message: 'Урок создан успешно',
        id: lesson._id
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId
router.get(
  '/courses/:courseId/lessons/:lessonId',
  [
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const lesson = await Lesson.findOne({_id: req.params.lessonId, course: req.params.courseId}).lean()
      if (!lesson)
        return res.status(404).json({message: 'Урок не найден'})
      const tasks = await Task.find({course: req.params.courseId, lesson: req.params.lessonId}, 'name').sort('date').lean()
      const materials = await Material.find({course: req.params.courseId, lesson: req.params.lessonId}, 'name').sort('date').lean()
      res.json({
        lessonName: lesson.name,
        rating: lesson.rating,
        tasks: tasks.map((item) => {
          return {
            ...item,
            id: item._id
          }
        }),
        materials: materials.map((item) => {
          return {
            ...item,
            id: item._id
          }
        })
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId
router.patch(
  '/courses/:courseId/lessons/:lessonId',
  [
    auth,
    control,
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
      const {name, rating} = req.body
      let fields = {}
      if (!!name)
        fields.name = name
      if (!!rating)
        fields.rating = rating
      const result = await Lesson.findOneAndUpdate({_id: req.params.lessonId, course: req.params.courseId}, fields)
      if (!result)
        return res.status(404).json({message: 'Урок не найден'})
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
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const result = await Lesson.findOneAndDelete({_id: req.params.lessonId, course: req.params.courseId})
      if (!result)
        return res.status(404).json({message: 'Урок не найден'})
      await Task.deleteMany({lesson: req.params.lessonId})
      await Material.deleteMany({lesson: req.params.lessonId})
      await Solution.deleteMany({lesson: req.params.lessonId})
      await SubSolution.deleteMany({lesson: req.params.lessonId})
      await Verdict.deleteMany({lesson: req.params.lessonId})
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
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const tasks = await Task.find({course: req.params.courseId, lesson: req.params.lessonId}, 'name').sort('date').lean()
      res.json(tasks.map((item) => {
        return {
          ...item,
          id: item._id
        }
      }))
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/tasks
router.post(
  '/courses/:courseId/lessons/:lessonId/tasks',
  [
    auth,
    control,
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
      const lesson = await Lesson.findOne({_id: req.params.lessonId, course: req.params.courseId})
      if (!lesson)
        return res.status(404).json({
          message: 'Урок не найден'
        })
      const {name, body} = req.body
      const task = new Task({name, body, course: req.params.courseId, lesson: req.params.lessonId, date: Date.now()})
      await task.save()
      res.json({
        message: 'Задача создана успешно',
        id: task._id
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/tasks/:taskId
router.get(
  '/courses/:courseId/lessons/:lessonId/tasks/:taskId',
  [
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const task = await Task.findOne({_id: req.params.taskId, course: req.params.courseId, lesson: req.params.lessonId}).lean()
      if (!task)
        return res.status(404).json({
          message: 'Задача не найдена'
        })
      res.json({
        taskName: task.name,
        body: task.body
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/tasks/:taskId
router.patch(
  '/courses/:courseId/lessons/:lessonId/tasks/:taskId',
  [
    auth,
    control,
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
      const {name, body} = req.body
      let fields = {}
      if (!!name)
        fields.name = name
      if (!!body)
        fields.body = body
      const result = await Task.findOneAndUpdate({_id: req.params.taskId, course: req.params.courseId, lesson: req.params.lessonId}, fields)
      if (!result)
        return res.status(404).json({message: 'Задача не найдена'})
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
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const result = await Task.findOneAndDelete({_id: req.params.taskId, course: req.params.courseId, lesson: req.params.lessonId})
      if (!result)
        return res.status(404).json({message: 'Задача не найдена'})
      await Solution.deleteMany({task: req.params.taskId})
      await SubSolution.deleteMany({task: req.params.taskId})
      await Verdict.deleteMany({task: req.params.taskId})
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
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const materials = await Material.find({course: req.params.courseId, lesson: req.params.lessonId}, 'name').sort('date').lean()
      res.json(materials.map((item) => {
        return {
          ...item,
          id: item._id
        }
      }))
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/materials
router.post(
  '/courses/:courseId/lessons/:lessonId/materials',
  [
    auth,
    control,
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
      const lesson = await Lesson.findOne({_id: req.params.lessonId, course: req.params.courseId})
      if (!lesson)
        return res.status(404).json({
          message: 'Урок не найден'
        })
      const {name, body} = req.body
      const material = new Material({name, body, course: req.params.courseId, lesson: req.params.lessonId, date: Date.now()})
      await material.save()
      res.json({
        message: 'Материал создан успешно',
        id: material._id
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/materials/:materialId
router.get(
  '/courses/:courseId/lessons/:lessonId/materials/:materialId',
  [
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const material = await Material.findOne({_id: req.params.materialId, course: req.params.courseId, lesson: req.params.lessonId}).lean()
      if (!material)
        return res.status(404).json({
          message: 'Задача не найдена'
        })
      res.json({
        materialName: material.name,
        body: material.body
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/courses/:courseId/lessons/:lessonId/materials/:materialId
router.patch(
  '/courses/:courseId/lessons/:lessonId/materials/:materialId',
  [
    auth,
    control,
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
      const {name, body} = req.body
      let fields = {}
      if (!!name)
        fields.name = name
      if (!!body)
        fields.body = body
      const result = await Material.findOneAndUpdate({_id: req.params.materialId, course: req.params.courseId, lesson: req.params.lessonId}, fields)
      if (!result)
        return res.status(404).json({message: 'Материал не найден'})
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
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const result = await Material.findOneAndDelete({_id: req.params.materialId, course: req.params.courseId, lesson: req.params.lessonId})
      if (!result)
        return res.status(404).json({message: 'Материал не найден'})
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
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const groups = await Group.find().lean()
      res.json(groups.map((item) => {
        return {
          ...item,
          id: item._id
        }
      }))
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups
router.post(
  '/groups',
  [
    auth,
    control,
    check('name', 'Название группы должно быть указано и иметь длину максимум 100').exists().isLength({ max: 100 }),
    check('courseId', 'Айди курса должно быть указано').exists()
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
      const {name, courseId} = req.body
      const group = new Group({name, course: courseId})
      await group.save()
      res.json({
        message: 'Группа успешно создана',
        id: group._id
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups/:groupId
router.get(
  '/groups/:groupId',
  [
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const group = await Group.findById(req.params.groupId).populate('teacher').lean()
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const students = await Student.find({group: req.params.groupId}).populate('user').lean()
      res.json({
        groupName: group.name,
        teacher: {
          login: group.teacher ? group.teacher.login : '',
          fullName: group.teacher ? group.teacher.fullName : ''
        },
        students: students.map((item) => {
          return {
            id: item.user._id,
            login: item.user.login,
            fullName: item.user.fullName,
          }
        }).sort((a, b) => {
          if (a.login > b.login) {
            return 1;
          }
          if (a.login < b.login) {
            return -1;
          }
          return 0;
        })
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups/:groupId
router.patch(
  '/groups/:groupId',
  [
    auth,
    control,
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
      const {name} = req.body
      let fields = {}
      const candidate = await Group.findOne({name})
      if (!!name && !candidate)
        fields.name = name
      const result = await Group.findByIdAndUpdate(req.params.groupId, fields)
      if (!result)
        return res.status(404).json({message: 'Группа не найдена'})
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
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const result = await Group.findByIdAndDelete(req.params.groupId)
      if (!result)
        return res.status(404).json({message: 'Группа не найдена'})
      await Student.deleteMany({group: req.params.groupId})
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
    auth,
    control,
    check('userId', 'Айди юзера должно быть указано').exists()
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
      const group = await Group.findById(req.params.groupId)
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const {userId} = req.body
      const user = await User.findById(userId)
      if (!user)
        return res.status(404).json({
          message: 'Пользователь не найден'
        })
      group.teacher = userId
      await group.save()
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
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const students = await Student.find({group: req.params.groupId}).populate('user').lean()
      res.json(students.map((item) => {
        return {
          id: item.user._id,
          login: item.user.login,
          fullName: item.user.fullName,
        }
      }).sort((a, b) => {
        if (a.login > b.login) {
          return 1;
        }
        if (a.login < b.login) {
          return -1;
        }
        return 0;
      }))
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups/:groupId/students
router.post(
  '/groups/:groupId/students',
  [
    auth,
    control,
    check('userId', 'Айди юзера должно быть указано').exists()
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
      const {userId} = req.body
      const user = await User.findById(userId)
      if (!user)
        return res.status(404).json({
          message: 'Пользователь не найден'
        })
      const group = await Group.findById(req.params.groupId).lean()
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const student = new Student({user: userId, group: req.params.groupId, course: group.course, rating: 0})
      await student.save()
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
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const result = await Student.findOneAndDelete({group: req.params.groupId, user: req.params.userId}).lean()
      if (!result)
        return res.status(404).json({
          message: 'Студент или группа не найдена'
        })
      await Solution.deleteMany({group: result.group, user: result.user})
      await SubSolution.deleteMany({group: result.group, user: result.user})
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
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const students = await Student.find({group: req.params.groupId}).populate('user').lean()
      const idsExclude = students.map((item) => {
        return item.user._id
      })
      const users = await User.find({_id: {$nin: idsExclude}}, 'login fullName').lean()
      res.json(users.map((item) => {
        return {
          ...item,
          id: item._id
        }
      }))
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/control/groups/:groupId/users_exclude_teacher
router.get(
  '/groups/:groupId/users_exclude_teacher',
  [
    auth,
    control,
  ],
  async (req, res) => {
    try {
      const group = await Group.findById(req.params.groupId).lean()
      const idExclude = group.teacher
      const users = await User.find({_id: {$ne: idExclude}}, 'login fullName').lean()
      res.json(users.map((item) => {
        return {
          ...item,
          id: item._id
        }
      }))
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
