const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  file: {type: String, required: true},
  date: {type: Date, default: Date.now},
  solution: {type: Types.ObjectId, required: true, ref: 'SubSolution'}
})

module.exports = model('SubSolution', schema)
