const {Router} = require('express')
const config = require('config')
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth.middleware')
const router = Router()

// /api/v1/main
router.get(
  '/',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json({
        studyingCourses: [
          {
            groupId: 1,
            id: 1,
            name: 'Курс по питону'
          },
          {
            groupId: 2,
            id: 2,
            name: 'Курс по WEB'
          },
        ],
        teachingGroups: [
          {
            id: 1,
            courseId: 1,
            name: 'Курс по питону - Уавиак-МЦК'
          },
          {
            id: 2,
            courseId: 2,
            name: 'Курс по WEB - Уавиак-МЦК'
          },
        ],
        isController: true
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/main/profile
router.get(
  '/profile',
  [
    // auth
  ],
  async (req, res) => {
    try {
      // courses = await Course.find({'_id': [req.current_user.students.student_courses.course.select('id')]})
      // groups = req.current_user.groups
      // is_controller = req.current_user.is_controller
      res.json({
        fullName: 'Аркадий Гурин Дмитриевич',
        courses: [
          {
            id: 1,
            name: 'Курс по питону - Уавиак МЦК',
            rating: 42.32
          },
          {
            id: 2,
            name: 'Курс по веб - Уавиак МЦК',
            rating: 32.32
          }
        ]
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router

