const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  course: {type: Types.ObjectId, required: true, ref: 'Course'},
  group: {type: Types.ObjectId, required: true, ref: 'Group'},
  user: {type: Types.ObjectId, required: true, ref: 'User'},
  rating: {type: Number, default: 0}
})

module.exports = model('Student', schema)
