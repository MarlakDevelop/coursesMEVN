const {Router} = require('express')
const config = require('config')
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
const UUID = require('uuid')
const path = require('path')
const util = require('util')
const fs = require('fs')
const getFileMimeType = require('../../services/getFileMimeType')

// /api/v1/student/courses/:courseId/groups/:groupId
router.get(
  '/courses/:courseId/groups/:groupId',
  [
    auth
  ],
  async (req, res) => {
    try {
      const student = await Student.findOne({course: req.params.courseId, group: req.params.groupId, user: req.user._id}).populate('course').populate('group').lean()
      if (!student)
        return res.status(404).json({
          message: 'Курс не найден'
        })
      const teacher = await User.findById(student.group.teacher).lean()
      const lessons = await Lesson.find({_id: {$in: student.group.visibleLessons}, course: req.params.courseId}, 'name').sort('-date')
      const lessonsIds = lessons.map((item) => item._id)
      const tasks = await Task.find({lesson: {$in: lessonsIds}, course: req.params.courseId}, 'lesson')
      const solutions = await Solution.find({lesson: {$in: lessonsIds}, course: req.params.courseId, status: 'accepted', user: req.user._id, group: req.params.groupId}, 'lesson')
      res.json({
        courseName: student.course.name,
        teacherFullName: teacher ? teacher.fullName : '',
        lessons: lessons.map((item) => {
          return {
            id: item._id,
            name: item.name,
            tasksAccepted: solutions.filter((item_) => String(item_.lesson) === String(item._id)).length,
            tasksTotal: tasks.filter((item_) => String(item_.lesson) === String(item._id)).length
          }
        })
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId',
  [
    auth
  ],
  async (req, res) => {
    try {
      const student = await Student.findOne({course: req.params.courseId, group: req.params.groupId, user: req.user._id}).populate('course').populate('group')
      if (!student)
        return res.status(404).json({
          message: 'Курс не найден'
        })
      if (!student.group.visibleLessons.includes(req.params.lessonId))
        return res.status(404).json({
          message: 'Урок не найден'
        })
      const lesson = await Lesson.findOne({_id: req.params.lessonId, course: req.params.courseId}, 'name')
      if(!lesson) {
        return res.status(404).json({
          message: 'Урок не найден'
        })
      }
      const tasks = await Task.find({lesson: req.params.lessonId, course: req.params.courseId}, 'name').sort('date')
      const materials = await Material.find({lesson: req.params.lessonId, course: req.params.courseId}, 'name').sort('date')
      const solutions = await Solution.find({lesson: req.params.lessonId, course: req.params.courseId, user: req.user._id, group: req.params.groupId}, 'status task')
      const tasksWithSolutions = solutions.map((item) => String(item.task))
      res.json({
        lessonName: lesson.name,
        tasksAccepted: solutions.filter((item) => item.status === 'accepted').length,
        tasksTotal: tasks.length,
        tasks: tasks.map((item) => {
          if (tasksWithSolutions.includes(String(item._id))){
            return {
              id: item._id,
              name: item.name,
              solution: {
                id: solutions.filter((item_) => String(item_.task) === String(item._id))[0]._id,
                status: solutions.filter((item_) => String(item_.task) === String(item._id))[0].status
              }
            }
          } else {
            return {
              id: item._id,
              name: item.name
            }
          }
        }),
        materials: materials.map((item) => {
          return {
            id: item._id,
            name: item.name
          }
        })
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId',
  [
    auth
  ],
  async (req, res) => {
    try {
      const student = await Student.findOne({course: req.params.courseId, group: req.params.groupId, user: req.user._id}).populate('course').populate('group')
      if (!student)
        return res.status(404).json({
          message: 'Курс не найден'
        })
      if (!student.group.visibleLessons.includes(req.params.lessonId))
        return res.status(404).json({
          message: 'Урок не найден'
        })
      const task = await Task.findOne({_id: req.params.taskId, lesson: req.params.lessonId, course: req.params.courseId}).lean()
      if(!task) {
        return res.status(404).json({
          message: 'Задача не найдена'
        })
      }
      const tasks = await Task.find({lesson: req.params.lessonId, course: req.params.courseId}, '_id').sort('date')
      const solutions = await Solution.find({lesson: req.params.lessonId, course: req.params.courseId, user: req.user._id, group: req.params.groupId}, 'status task')
      const tasksWithSolutions = solutions.map((item) => String(item.task))
      res.json({
        taskName: task.name,
        body: task.body,
        tasks: tasks.map((item) => {
          if (tasksWithSolutions.includes(String(item._id))){
            return {
              id: item._id,
              solution: {
                id: solutions.filter((item_) => String(item_.task) === String(item._id))[0]._id,
                status: solutions.filter((item_) => String(item_.task) === String(item._id))[0].status
              }
            }
          } else {
            return {
              id: item._id
            }
          }
        })
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId/materials/:materialId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/materials/:materialId',
  [
    auth
  ],
  async (req, res) => {
    try {
      const student = await Student.findOne({course: req.params.courseId, group: req.params.groupId, user: req.user._id}).populate('course').populate('group')
      if (!student)
        return res.status(404).json({
          message: 'Курс не найден'
        })
      if (!student.group.visibleLessons.includes(req.params.lessonId))
        return res.status(404).json({
          message: 'Урок не найден'
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

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId',
  [
    auth
  ],
  async (req, res) => {
    try {
      const student = await Student.findOne({course: req.params.courseId, group: req.params.groupId, user: req.user._id}).populate('course').populate('group')
      if (!student)
        return res.status(404).json({
          message: 'Курс не найден'
        })
      if (!student.group.visibleLessons.includes(req.params.lessonId))
        return res.status(404).json({
          message: 'Урок не найден'
        })
      const solution = await Solution.findOne({_id: req.params.solutionId, lesson: req.params.lessonId, course: req.params.courseId, user: req.user._id, group: req.params.groupId, task: req.params.taskId})
      if(!solution) {
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
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' + e })
    }
  })

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/history
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/history',
  [
    auth
  ],
  async (req, res) => {
    try {
      const student = await Student.findOne({course: req.params.courseId, group: req.params.groupId, user: req.user._id}).populate('course').populate('group')
      if (!student)
        return res.status(404).json({
          message: 'Курс не найден'
        })
      if (!student.group.visibleLessons.includes(req.params.lessonId))
        return res.status(404).json({
          message: 'Урок не найден'
        })
      const verdicts = await Verdict.find({lesson: req.params.lessonId, course: req.params.courseId, group: req.params.groupId, task: req.params.taskId, solution: req.params.solutionId}).sort('-date')
      const subSolutions = await SubSolution.find({lesson: req.params.lessonId, course: req.params.courseId, user: req.user._id, group: req.params.groupId, task: req.params.taskId, solution: req.params.solutionId}).sort('-date')
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

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/verdicts/:verdictId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/verdicts/:verdictId',
  [
    auth
  ],
  async (req, res) => {
    try {
      const student = await Student.findOne({course: req.params.courseId, group: req.params.groupId, user: req.user._id}).populate('course').populate('group')
      if (!student)
        return res.status(404).json({
          message: 'Курс не найден'
        })
      if (!student.group.visibleLessons.includes(req.params.lessonId))
        return res.status(404).json({
          message: 'Урок не найден'
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

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/solutions/:subSolutionId
router.get(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/:solutionId/solutions/:subSolutionId',
  [
    auth
  ],
  async (req, res) => {
    try {
      const student = await Student.findOne({course: req.params.courseId, group: req.params.groupId, user: req.user._id}).populate('course').populate('group')
      if (!student)
        return res.status(404).json({
          message: 'Курс не найден'
        })
      if (!student.group.visibleLessons.includes(req.params.lessonId))
        return res.status(404).json({
          message: 'Урок не найден'
        })
      const subSolution = await SubSolution.findOne({_id: req.params.subSolutionId, lesson: req.params.lessonId, course: req.params.courseId, user: req.user._id, group: req.params.groupId, task: req.params.taskId, solution: req.params.solutionId}).sort('-date')
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

// /api/v1/student/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/send_solution
router.post(
  '/courses/:courseId/groups/:groupId/lessons/:lessonId/tasks/:taskId/solutions/send_solution',
  [
    auth
  ],
  async (req, res, next) => {
    try {
      const student = await Student.findOne({course: req.params.courseId, group: req.params.groupId, user: req.user._id}).populate('course').populate('group')
      if (!student)
        return res.status(404).json({
          message: 'Курс не найден'
        })
      if (!student.group.visibleLessons.includes(req.params.lessonId))
        return res.status(404).json({
          message: 'Урок не найден'
        })
      const file = req.files.file
      const fileName = file.name
      const directoryName = `${UUID.v4()}-${Date.now().toString()}`
      const userLogin = req.user.login
      const size = file.data.length
      const fileExtension = path.extname(fileName)
      const filePath = `/solutions/${directoryName}/${userLogin}'s solution${fileExtension}`
      if (['.zip', '.rar', '.py', '.php', '.js', '.ts', '.pas', '.cpp', '.vue', '.jsx',
        '.html', '.css', '.sass', '.scss', '.cs', '.java', '.txt', '.c', '.tsx'].indexOf(fileExtension) === -1)
        return res.status(400).json(
          { message: 'Неподдерживаемое расширение файла. Поддерживаемыми являются: .zip, .rar, .py, .php, .js, .ts, .tsx, .pas, .cpp, .vue, .jsx, .html, .css, .sass, .scss, .cs, .c, .java, .txt' }
          )
      if (size > 1024 * 1024) {
        return res.status(400).json({ message: "Размер файла не должен превышать 1мб"})
      }
      await fs.promises.mkdir(`./public/solutions/${directoryName}`, { recursive: true })
      await util.promisify(file.mv)('./public' + filePath)
      let solution = await Solution.findOne({task: req.params.taskId, lesson: req.params.lessonId, course: req.params.courseId, user: req.user._id, group: req.params.groupId})
      if (!solution)
        solution = new Solution({task: req.params.taskId, lesson: req.params.lessonId, course: req.params.courseId, user: req.user._id, group: req.params.groupId, status: 'waiting', statusDate: Date.now()})
      if (!(solution.status === 'accepted')) {
        solution.status = 'waiting'
        solution.statusDate = Date.now()
      }
      const subSolution = new SubSolution({task: req.params.taskId, lesson: req.params.lessonId, course: req.params.courseId, user: req.user._id, group: req.params.groupId, solution: solution._id, file: '/public' + filePath, date: Date.now()})
      await solution.save()
      await subSolution.save()
      res.json({
        taskId: req.params.taskId,
        solutionId: solution._id
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
