const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  file: {type: String, required: true},
  date: {type: Date, default: Date.now},
  group: {type: Types.ObjectId, required: true, ref: 'Group'},
  user: {type: Types.ObjectId, required: true, ref: 'User'},
  course: {type: Types.ObjectId, required: true, ref: 'Course'},
  lesson: {type: Types.ObjectId, required: true, ref: 'Lesson'},
  task: {type: Types.ObjectId, required: true, ref: 'Task'},
  solution: {type: Types.ObjectId, required: true, ref: 'Solution'}
})

module.exports = model('SubSolution', schema)
