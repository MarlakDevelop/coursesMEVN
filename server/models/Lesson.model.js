const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  course: {type: Types.ObjectId, required: true, ref: 'Course'},
  name: {type: String, required: true},
  rating: {type: Number, default: 0},
  materials: [{type: Types.ObjectId, ref: 'Material'}],
  tasks: [{type: Types.ObjectId, ref: 'Task'}],
  visibleInGroups: [{type: Types.ObjectId, ref: 'Group'}]
})

module.exports = model('Lesson', schema)
