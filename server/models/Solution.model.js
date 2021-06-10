const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  status: {type: String, required: true},
  student: {type: Types.ObjectId, required: true},
  last_statused: {type: Date, default: Date.now},
  task: {type: Types.ObjectId, required: true, ref: 'Task'},
  verdicts: [{type: Types.ObjectId, ref: 'Verdict'}],
  sub_solutions: [{type: Types.ObjectId, ref: 'SubSolution'}]
})

module.exports = model('Solution', schema)
