module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS')
    return next()
  try {
    if (req.user.isController)
      return next()
    res.status(403).json({ message: 'Нет прав' })
  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' })
  }
}
