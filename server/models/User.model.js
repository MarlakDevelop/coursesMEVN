const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  fullName: {type: String, required: true},
  isController: {type: Boolean, default: false},
  passwordChanged: {type: Date, default: Date.now}
})

module.exports = model('User', schema)
