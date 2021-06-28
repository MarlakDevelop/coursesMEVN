const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  course: {type: Types.ObjectId, required: true, ref: 'Course'},
  lesson: {type: Types.ObjectId, required: true, ref: 'Lesson'},
  name: {type: String, required: true},
  body: {type: String},
  date: {type: Date, default: Date.now}
})

module.exports = model('Task', schema)
