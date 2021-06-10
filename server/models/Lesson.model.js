const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  is_visible: {type: Boolean, default: false},
  course: {type: Types.ObjectId, required: true, ref: 'Course'},
  name: {type: String, required: true},
  rating: {type: Number, default: 0},
  materials: [{type: Types.ObjectId, ref: 'Material'}],
  tasks: [{type: Types.ObjectId, ref: 'Task'}]
})

module.exports = model('Lesson', schema)
