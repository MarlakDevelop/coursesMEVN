const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true, unique: true},
  teacher: {type: Types.ObjectId, ref: 'User'},
  course: { type: Types.ObjectId, ref: 'Course' },
  visibleLessons: [{ type: Types.ObjectId, ref: 'Lesson' }]
})

module.exports = model('Group', schema)
