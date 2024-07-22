const router = require('express').Router()
const userController = require('./controllers/userController.js')
const paintingsController = require('./controllers/paintingsController.js')

router.use('/users', userController)
router.use('/paintings', paintingsController)

module.exports = router