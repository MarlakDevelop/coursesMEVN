module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    if (req.current_user.is_controller) {
      return next()
    }
    res.status(401).json({ message: 'Нет прав на работу по данному маршруту' })
  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' })
  }
}
