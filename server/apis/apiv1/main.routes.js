const {Router} = require('express')
const config = require('config')
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth.middleware')
const User = require('../../models/User.model')
const Student = require('../../models/Student.model')
const Course = require('../../models/Course.model')
const Lesson = require('../../models/Lesson.model')
const Task = require('../../models/Task.model')
const Material = require('../../models/Material.model')
const Group = require('../../models/Group.model')
const router = Router()

// /api/v1/main
router.get(
  '/',
  [
    auth
  ],
  async (req, res) => {
    try {
      const courses = await Student.find({user: req.user.id}).populate('course').sort('course.name').lean()
      const groups = await Group.find({teacher: req.user.id}).populate('course').sort('name').lean()
      res.json({
        studyingCourses: courses.map((item) => {
          return {
            groupId: item.group,
            id: item.course._id,
            name: item.course.name
          }
        }),
        teachingGroups: groups.map((item) => {
          return {
            id: item._id,
            courseId: item.course._id,
            name: item.name
          }
        }),
        isController: req.user.isController
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/main/profile
router.get(
  '/profile',
  [
    auth
  ],
  async (req, res) => {
    try {
      const courses = await Student.find({user: req.user.id}).populate('course').sort('course.name').lean()
      res.json({
        fullName: req.user.fullName,
        courses: courses.map((item) => {
          return {
            id: item.course._id,
            name: item.course.name,
            rating: item.rating
          }
        })
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router

