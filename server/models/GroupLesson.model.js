const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  is_visible: {type: Boolean, default: false},
  lesson: {type: Types.ObjectId, required: true, ref: 'Lesson'},
  group: {type: Types.ObjectId, required: true, ref: 'Group'}
})

module.exports = model('GroupLesson', schema)
