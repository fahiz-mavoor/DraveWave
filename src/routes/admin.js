const express = require ('express')
const adminControler = require('../controllers/admin')
const router = express.Router()


router.get('/',adminControler.showLoginForm)
router.post('/',adminControler.handleAdminLogin)
router.post('/Otp',adminControler.handleAdminLoginUseOtp)
router.post('/getOtp',adminControler.showOtpForm)
router.post('/generateOtp',adminControler.generateAdminOtp)


module.exports = router
