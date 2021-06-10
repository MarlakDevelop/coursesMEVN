const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../../models/User.model')
const auth = require('../../middleware/auth.middleware')
const control = require('../../middleware/control.middleware')
const router = Router()


// /api/v1/auth/login
router.post(
  '/login',
  [
    check('login', 'Введите логин').exists(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при входе в систему'
        })
      }

      const {login, password} = req.body

      const user = await User.findOne({ login })

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('secret'),
        { expiresIn: '30d' }
      )

      res.json({ token, userId: user.id })

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/v1/auth/check_auth
router.get(
  '/check_auth',
  [
    auth
  ],
  async (req, res) => {
    res.status(200).json({ message: 'Вы авторизованы' })
  })

router.get(
  '/check_control',
  [
    auth,
    control
  ],
  async (req, res) => {
    res.status(200).json({ message: 'Вы контроллер' })
  })

module.exports = router
