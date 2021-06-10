const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  title: {type: String, required: true},
  comment: {type: String},
  date: {type: Date, default: Date.now},
  solution: {type: Types.ObjectId, required: true, ref: 'SubSolution'}
})

module.exports = model('Verdict', schema)
