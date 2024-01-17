const express = require('express')
const app = express()
const dotenv = require('dotenv')
const routes = require('./routes/index')
const db = require('./db/config')
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000

require('./models/Urls')

dotenv.config()

db.sync({ force: false })
  .then(() => console.log('its ok'))
  .catch(error => console.log('oh no!'))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))
app.use(routes)

app.listen(port, () =>
  console.log('> Server is up and running on port: ' + port)
)
