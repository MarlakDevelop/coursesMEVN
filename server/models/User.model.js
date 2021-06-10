const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  fullName: {type: String, required: true},
  is_controller: {type: Boolean, required: true},
  students: [{type: Types.ObjectId, ref: 'Student'}],
  groups: [{type: Types.ObjectId, ref: 'Group'}],
})

module.exports = model('User', schema)
