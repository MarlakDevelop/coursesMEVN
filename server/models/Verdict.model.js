const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  comment: {type: String},
  date: {type: Date, default: Date.now},
  group: {type: Types.ObjectId, required: true, ref: 'Group'},
  course: {type: Types.ObjectId, required: true, ref: 'Course'},
  lesson: {type: Types.ObjectId, required: true, ref: 'Lesson'},
  task: {type: Types.ObjectId, required: true, ref: 'Task'},
  solution: {type: Types.ObjectId, required: true, ref: 'Solution'}
})

module.exports = model('Verdict', schema)
