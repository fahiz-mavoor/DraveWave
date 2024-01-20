const express = require ('express')
const adminControler = require('../controllers/admin')
const router = express.Router()


router.get('/',adminControler.showLoginForm)
router.post('/',adminControler.handleAdminLogin)



module.exports = router
