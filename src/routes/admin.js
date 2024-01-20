const express = require ('express')
const adminControler = require('../controllers/admin')
const router = express.Router()


router.get('/',adminControler.showLoginForm)
module.exports = router
