const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  course: {type: Types.ObjectId, required: true, ref: 'Course'},
  lesson: {type: Types.ObjectId, required: true, ref: 'Lesson'},
  body: {type: String},
  date: {type: Date, default: Date.now}
})

module.exports = model('Material', schema)
