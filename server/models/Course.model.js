const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true, unique: true},
  lessons: [{type: Types.ObjectId, ref: 'Lesson'}],
  course_students: [{type: Types.ObjectId, ref: 'StudentCourse'}],
  groups: [{ type: Types.ObjectId, ref: 'Group' }]
})

module.exports = model('Course', schema)