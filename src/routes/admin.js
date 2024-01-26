const express = require ('express')
const adminControler = require('../controllers/admin')
const router = express.Router()

const {upload,uploadFile} =require('../service/fileUpload')
const car = require ('../service/Car')



router.get('/',adminControler.showLoginForm)
router.post('/',adminControler.handleAdminLogin)
router.post('/Otp',adminControler.handleAdminLoginUseOtp)
router.post('/getOtp',adminControler.showOtpForm)
router.post('/generateOtp',adminControler.generateAdminOtp)
router.get('/adminCars',adminControler.viewCarsAdmin)
router.get('/adminHome',adminControler.viewHomeAdmin)
router.post('/addCars', upload.single('carImage'), adminControler.addCarAdmin);
router.get('/getCarDetails',adminControler.carDetailsAdmin)
// router.delete('/deleteCar',car.deleteCarById)
router.delete('/deleteCar',car.deleteCarById);
router.post('/updateCarDetails', upload.single('carImage'),car.editCarById)
router.get('/getCarAdmin',adminControler.getCarAdminCategory)
router.get('/alphabeticallySort',adminControler.alphabeticallySort)





module.exports = router
