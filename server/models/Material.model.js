const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  lesson: {type: Types.ObjectId, required: true, ref: 'Lesson'},
  body: {type: String},
})

module.exports = model('Material', schema)
