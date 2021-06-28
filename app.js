const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(fileUpload())

app.use('/api/v1/auth', require('./server/apis/apiv1/auth.routes'))
app.use('/api/v1/main', require('./server/apis/apiv1/main.routes'))
app.use('/api/v1/control', require('./server/apis/apiv1/control.routes'))
app.use('/api/v1/student', require('./server/apis/apiv1/student.routes'))
app.use('/api/v1/teacher', require('./server/apis/apiv1/teacher.routes'))

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
