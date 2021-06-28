const {Router} = require('express')
const config = require('config')
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
const router = Router()
const path = require('path')
const fs = require('fs')
const getFileMimeType = require('../../services/getFileMimeType')

// /api/v1/teacher/courses/:courseId/groups/:groupId
router.get(
  '/courses/:courseId/groups/:groupId',
  [
    auth
  ],
  async (req, res) => {
    try {
      const group = await Group.findOne({_id: req.params.groupId, course: req.params.courseId, teacher: req.user._id})
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const lessons = await Lesson.find({course: group.course}, 'name').sort('-date').lean()
      res.json({
        groupName: group.name,
        lessons: lessons.map((item) => {
          return {
            id: item._id,
            name: item.name,
            isVisible: group.visibleLessons.includes(item._id)
          }
        })
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/rating
router.get(
  '/courses/:courseId/groups/:groupId/rating',
  [
    auth
  ],
  async (req, res) => {
    try {
      const group = await Group.findOne({_id: req.params.groupId, course: req.params.courseId, teacher: req.user._id}).lean()
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const students = await Student.find({course: req.params.courseId, group: req.params.groupId}).populate('user').sort('-rating').lean()
      res.json({
        groupName: group.name,
        students: students.map((item) => {
          return {
            id: item.user._id,
            fullName: item.user.fullName,
            rating: item.rating
          }
        })
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/waiting_tasks
router.get(
  '/courses/:courseId/groups/:groupId/waiting_tasks',
  [
    auth
  ],
  async (req, res) => {
    try {
      const group = await Group.findOne({_id: req.params.groupId, course: req.params.courseId, teacher: req.user._id}).lean()
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const solutions = await Solution.find({group: req.params.groupId, course: req.params.courseId, status: 'waiting'}).populate('task').populate('user').sort('statusDate').lean()
      res.json({
        groupName: group.name,
        solutions: solutions.map((item) => {
          return {
            id: item._id,
            lessonId: item.lesson,
            taskId: item.task._id,
            taskName: item.task.name,
            studentFullName: item.user.fullName
          }
        })
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId',
  [
    auth
  ],
  async (req, res) => {
    try {
      const group = await Group.findOne({_id: req.params.groupId, course: req.params.courseId, teacher: req.user._id})
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const lesson = await Lesson.findOne({_id: req.params.lessonId, course: req.params.courseId}).lean()
      if (!lesson)
        return res.status(404).json({
          message: 'Урок не найден'
        })
      const tasks = await Task.find({lesson: req.params.lessonId, course: req.params.courseId}, 'name').sort('date').lean()
      const materials = await Material.find({lesson: req.params.lessonId, course: req.params.courseId}, 'name').sort('date').lean()
      res.json({
        lessonName: lesson.name,
        tasks: tasks.map((item) => {
          return {
            id: item._id,
            name: item.name
          }
        }),
        materials: materials.map((item) => {
          return {
            id: item._id,
            name: item.name
          }
        }),
        isVisible: group.visibleLessons.includes(lesson._id)
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/set_visibility
router.patch(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/set_visibility',
  [
    auth,
    check('visible', 'Поле visible должно быть булевым значением').exists().isBoolean()
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
      const {visible} = req.body
      const group = await Group.findOne({_id: req.params.groupId, course: req.params.courseId, teacher: req.user._id})
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const lesson = await Lesson.findOne({_id: req.params.lessonId, course: req.params.courseId})
      if (!lesson)
        return res.status(404).json({
          message: 'Урок не найден'
        })
      if (visible) {
        if (group.visibleLessons.includes(req.params.lessonId)) {
          return res.status(400).json({
            message: 'Урок уже видим'
          })
        } else {
          await group.visibleLessons.push(req.params.lessonId)
        }
      } else {
        if (!group.visibleLessons.includes(req.params.lessonId)) {
          return res.status(400).json({
            message: 'Урок уже невидим'
          })
        } else {
          await group.visibleLessons.remove(req.params.lessonId)
        }
      }
      await group.save()
      res.json({ message: 'Видимость урока обновлена' })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/progress
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/progress',
  [
    auth
  ],
  async (req, res) => {
    try {
      const group = await Group.findOne({_id: req.params.groupId, course: req.params.courseId, teacher: req.user._id}).lean()
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const lesson = await Lesson.findOne({_id: req.params.lessonId, course: req.params.courseId})
      if (!lesson)
        return res.status(404).json({
          message: 'Урок не найден'
        })
      const students = await Student.find({group: req.params.groupId, course: req.params.courseId}).populate('user').lean()
      const tasks = await Task.find({lesson: req.params.lessonId, course: req.params.courseId}, 'user').lean()
      const solutions = await Solution.find({lesson: req.params.lessonId, course: req.params.courseId, group: req.params.groupId, status: 'accepted'}, 'user').lean()
      res.json({
        lessonName: lesson.name,
        students: students.map((item) => {
          return {
            id: item.user._id,
            fullName: item.user.fullName,
            tasksAccepted: solutions.filter((item_) => String(item.user._id) === String(item_.user)).length
          }
        }).sort((a, b) => b.tasksAccepted - a.tasksAccepted),
        tasksTotal: tasks.length
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId',
  [
    auth
  ],
  async (req, res) => {
    try {
      const group = await Group.findOne({_id: req.params.groupId, course: req.params.courseId, teacher: req.user._id}).lean()
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const task = await Task.findOne({_id: req.params.taskId, lesson: req.params.lessonId, course: req.params.courseId}).lean()
      if(!task) {
        return res.status(404).json({
          message: 'Задача не найдена'
        })
      }
      const studentsSolutions = await Solution.find({task: req.params.taskId, group: req.params.groupId, lesson: req.params.lessonId, course: req.params.courseId}).populate('user').sort('user.fullName')
      res.json({
        taskName: task.name,
        body: task.body,
        studentsSolutions: studentsSolutions.map((item) => {
          return {
            id: item._id,
            studentFullName: item.user.fullName,
            status: item.status
          }
        })
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/materials/:materialId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/materials/:materialId',
  [
    auth
  ],
  async (req, res) => {
    try {
      const group = await Group.findOne({_id: req.params.groupId, course: req.params.courseId, teacher: req.user._id}).lean()
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const material = await Material.findOne({_id: req.params.materialId, lesson: req.params.lessonId, course: req.params.courseId}).lean()
      if(!material) {
        return res.status(404).json({
          message: 'Материал не найден'
        })
      }
      res.json({
        materialName: material.name,
        body: material.body
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId',
  [
    auth
  ],
  async (req, res) => {
    try {
      const group = await Group.findOne({_id: req.params.groupId, course: req.params.courseId, teacher: req.user._id}).lean()
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const solution = await Solution.findOne({_id: req.params.solutionId, lesson: req.params.lessonId, course: req.params.courseId, group: req.params.groupId, task: req.params.taskId})
      if (!solution) {
        return res.status(404).json({
          message: 'Решение не найдено'
        })
      }
      const subSolution = await SubSolution.findOne({solution: req.params.solutionId}).sort('-date')
      const mimeType = await getFileMimeType(path.extname(subSolution.file))
      const body = await fs.readFileSync('.' + subSolution.file, 'utf8');
      res.json({
        status: solution.status,
        statusDate: solution.statusDate,
        lastSubSolution: {
          id: subSolution._id,
          date: subSolution.date,
          file: {
            path: config.get('baseUrl') + subSolution.file,
            mimeType: mimeType ? mimeType : null,
            body: mimeType ? body : null
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
    auth
  ],
  async (req, res) => {
    try {
      const group = await Group.findOne({_id: req.params.groupId, course: req.params.courseId, teacher: req.user._id}).lean()
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const verdicts = await Verdict.find({lesson: req.params.lessonId, course: req.params.courseId, group: req.params.groupId, task: req.params.taskId, solution: req.params.solutionId}).sort('-date')
      const subSolutions = await SubSolution.find({lesson: req.params.lessonId, course: req.params.courseId, group: req.params.groupId, task: req.params.taskId, solution: req.params.solutionId}).sort('-date')
      res.json( {
        answers: [
          ...verdicts.map((item) => {
            return {
              id: item._id,
              name: item.name,
              date: item.date,
              type: 'verdict',
            }
          }),
          ...subSolutions.map((item) => {
            return {
              id: item._id,
              date: item.date,
              type: 'solution'
            }
          })
        ].sort(function (a, b) {
          if (a.date < b.date) {
            return 1;
          }
          if (a.date > b.date) {
            return -1;
          }
          return 0;
        })
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/verdicts/:verdictId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/verdicts/:verdictId',
  [
    auth
  ],
  async (req, res) => {
    try {
      const group = await Group.findOne({_id: req.params.groupId, course: req.params.courseId, teacher: req.user._id}).lean()
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const verdict = await Verdict.findOne({_id: req.params.verdictId, lesson: req.params.lessonId, course: req.params.courseId, group: req.params.groupId, task: req.params.taskId, solution: req.params.solutionId})
      if (!verdict)
        return res.status(404).json({
          message: 'Вердикт не найден'
        })
      res.json({
        name: verdict.name,
        comment: verdict.comment
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/teacher/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/solutions/:subSolutionId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/solutions/:subSolutionId',
  [
    auth
  ],
  async (req, res) => {
    try {
      const group = await Group.findOne({_id: req.params.groupId, course: req.params.courseId, teacher: req.user._id}).lean()
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const subSolution = await SubSolution.findOne({_id: req.params.subSolutionId, lesson: req.params.lessonId, course: req.params.courseId, group: req.params.groupId, task: req.params.taskId, solution: req.params.solutionId}).sort('-date')
      if(!subSolution) {
        return res.status(404).json({
          message: 'Решение не найдено'
        })
      }
      const mimeType = await getFileMimeType(path.extname(subSolution.file))
      const body = await fs.readFileSync('.' + subSolution.file, 'utf8');
      res.json({
        date: subSolution.date,
        file: {
          path: config.get('baseUrl') + subSolution.file,
          mimeType: mimeType ? mimeType : null,
          body: mimeType ? body : null
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
    auth,
    check('name', 'Название для вердикта должно быть заполнено').exists().isLength({max: 100}),
    check('comment', 'Комментарий для вердикта должен быть заполнен и иметь длину максимум 1000').exists().isLength({max: 1000}),
    check('status', 'Статус вердикта должен равняться либо accepted, либо rejected').exists().isIn(['accepted', 'rejected'])
  ],
  async (req, res, next) => {
    try {
      function decimalAdjust(type, value, exp) {
        // Если степень не определена, либо равна нулю...
        if (typeof exp === 'undefined' || +exp === 0) {
          return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // Если значение не является числом, либо степень не является целым числом...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
          return NaN;
        }
        // Сдвиг разрядов
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Обратный сдвиг
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
      }
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке отправить вердикт'
        })
      }
      const {name, comment, status} = req.body
      const group = await Group.findOne({_id: req.params.groupId, course: req.params.courseId, teacher: req.user._id}).lean()
      if (!group)
        return res.status(404).json({
          message: 'Группа не найдена'
        })
      const solution = await Solution.findOne({_id: req.params.solutionId, task: req.params.taskId, lesson: req.params.lessonId, group: req.params.groupId, course: req.params.courseId})
      if (!solution)
        return res.status(404).json({
          message: 'Решение не найдено'
        })
      const student = await Student.findOne({group: solution.group, user: solution.user})
      const lesson = await Lesson.findOne({_id: req.params.lessonId, course: req.params.courseId}, 'rating')
      const tasks = await Task.find({lesson: req.params.lessonId, course: req.params.courseId}, '_id')
      const ratingChange = decimalAdjust('round', Number(lesson.rating) / Number(tasks.length), -2)
      if (['waiting', 'rejected'].includes(String(solution.status)) && status === 'accepted' && !!tasks) {
        student.rating += ratingChange
      } else if (String(solution.status) === 'accepted' && status === 'rejected' && !!tasks) {
        student.rating -= ratingChange
      }
      solution.status = status
      solution.statusDate = Date.now()
      const verdict = new Verdict({name, comment, date: Date.now(), group: req.params.groupId, course: req.params.courseId, lesson: req.params.lessonId, task: req.params.taskId, solution: req.params.solutionId})
      await solution.save()
      await student.save()
      await verdict.save()
      res.json({
        message: 'Вердикт отправлен'
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' + e })
    }
  })

module.exports = router
