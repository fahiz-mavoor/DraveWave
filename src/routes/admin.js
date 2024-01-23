const express = require ('express')
const adminControler = require('../controllers/admin')
const router = express.Router()


router.get('/',adminControler.showLoginForm)
router.post('/',adminControler.handleAdminLogin)
router.post('/Otp',adminControler.handleAdminLoginUseOtp)
router.post('/getOtp',adminControler.showOtpForm)
router.post('/generateOtp',adminControler.generateAdminOtp)
router.get('/adminCars',adminControler.viewCarsAdmin)
router.get('/adminHome',adminControler.viewHomeAdmin)
router.post('/addCars',adminControler.addCarAdmin)




module.exports = router
