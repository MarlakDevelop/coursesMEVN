const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User.model')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }

    const decoded = jwt.verify(token, config.get('secret'))
    const current_user = User.findById(decoded.userId)
    if (!current_user) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }
    req.current_user = current_user
    next()

  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' })
  }
}
