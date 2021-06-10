const {Router} = require('express')
const config = require('config')
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth.middleware')
const router = Router()


// /api/v1/student
router.get(
  '/',
  [
    auth
  ],
  async (req, res) => {
    try {
      students = req.current_user.students
      groups = req.current_user.groups
      is_controller = req.current_user.is_controller
      res.json({
        courses: [],
        groups: [],
        is_controller: []
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
