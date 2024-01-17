const { body } = require('express-validator')
const router = require('express').Router()
const urlsController = require('../controllers/urlsControllers')

router.get('/', (req, res) => {
  res.render('home')
})
router.get('/:param', urlsController.open)

router.post('/add', urlsController.create)

module.exports = router
