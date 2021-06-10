const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  lesson: {type: Types.ObjectId, required: true, ref: 'Lesson'},
  name: {type: String, required: true},
  body: {type: String},
  solutions: [{type: Types.ObjectId, ref: 'Solution'}],
})

module.exports = model('Task', schema)
