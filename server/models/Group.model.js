const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true, unique: true},
  teacher: {type: Types.ObjectId, ref: 'User'},
  students: [{ type: Types.ObjectId, ref: 'Student' }],
  courses: [{ type: Types.ObjectId, ref: 'Course' }]
})

module.exports = model('Group', schema)
