const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  course: {type: Types.ObjectId, required: true, ref: 'Course'},
  name: {type: String, required: true},
  rating: {type: Number, default: 0},
  date: {type: Date, default: Date.now}
})

module.exports = model('Lesson', schema)
