const router = require('express').Router()
const urlsController = require('../controllers/urlsControllers')
router.get('/', (req, res) => {
  res.render('home')
})
router.get('/:param', urlsController.open)

module.exports = router
