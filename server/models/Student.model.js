const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  group: {type: Types.ObjectId, required: true, ref: 'Group'},
  user: {type: Types.ObjectId, required: true, ref: 'User'},
  student_courses: [{type: Types.ObjectId, ref: 'StudentCourse'}]
})

module.exports = model('Student', schema)
