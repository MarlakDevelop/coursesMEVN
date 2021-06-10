const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  course: {type: Types.ObjectId, ref: 'Course'},
  student: {type: Types.ObjectId, ref: 'Student'},
  rating: {type: Number, default: 0}
})

module.exports = model('StudentCourse', schema)
