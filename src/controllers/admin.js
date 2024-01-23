
const admin = require('../model/admin');
// const car = require('../model/addCar');
const  {setAdmin} =require('../service/auth');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const { addCars } = require('../model/addCar');
const bcrypt =require('bcrypt') ;
const { sendAdminOtp ,generateOtp } = require('../service/adminotpsms');
const{upload ,uploadFile} = require('./fileUpload')
const path =require('path')

const emailOtps = {};


const showLoginForm = (req, res) => {
  res.render('admin/login');
};

const showOtpForm = (req, res) => {
  res.status(200).render('admin/otp');
};

const generateAdminOtp = (req, res) => {
  const {email} =req.body
  const otp = generateOtp()
  console.log(otp,email);
  emailOtps[email]=otp
  req.session.email = email;

  sendAdminOtp(email, otp, (error, info) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      // Render the OTP page after successfully sending the OTP
      res.status(201).render('admin/loginotp', { email });
    }
  });
}  

async function handleAdminLogin(req, res) {
  const { email, password } = req.body;

  try {
    const bcryptPassWord = await bcrypt.hash(password, 10);

    const user = await admin.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Invalid email or password
      return res.status(401).render('admin/login', { error: 'Invalid email or password' });
    }

    const sessionId = uuidv4();
    setAdmin(sessionId, user);
    res.cookie('uid', sessionId);
    res.status(200).render('admin/index');
  } catch (error) {
    // Handle any errors that might occur during the database query
    console.error('Error during admin login:', error);
    return res.status(500).send('Internal Server Error');
  }
}

  async function  handleAdminLoginUseOtp (req, res)  {
  const{ otp}=req.body
 const  email=  req.session.email
 console.log(email,otp);
 console.log(emailOtps[email]);

 if (emailOtps[email] && emailOtps[email] == otp) {
  delete emailOtps[email];
  const user = await admin.findOne({ email });
    if(!user){
      return res.status(401).render('admin/login', { error: 'Invalid email or password' });

    }

    const sessionId = uuidv4();
    setAdmin(sessionId, user);
    res.cookie('uid', sessionId);
    res.status(200).render('admin/index');
  } else {
  const errorMessage = 'Invalid OTP';

  res.status(401).render('admin/loginotp', { error: errorMessage });

  // res.send(otp)
}
};


  async function viewCarsAdmin(req,res){
  const cars = await readAdminDashbord()

  res.status(200).render('admin/admindashbord/adminCar',{data:cars})
}


function viewHomeAdmin(req,res){
  res.status(200).render('admin/index')
}




  // async function addCarAdmin(req, res) {
  //     try {
        

  //         const {
  //             carName,
  //             charCatogory,
  //             year,
  //             dayRent,
  //             brandName,
  //             carModal,
  //             licencePlateNumber,
  //             carImage,
  //             colour,
  //             fuelType,
  //             TransmitionType,
  //             milage,
  //             insurenceDate,
  //             feathers,
  //             description
  //         } = req.body;
  //         console.log(carImage);
         
  //         // // Create a new car instance using the car model
  //         const newCar = new addCars({
  //             carName,
  //             charCatogory,
  //             year,
  //             dayRent,
  //             brandName,
  //             carModal,
  //             licencePlateNumber,
  //             colour,
  //             fuelType,
  //             TransmitionType,
  //             milage,
  //             insurenceDate,
  //             feathers,
  //             description
  //         });
          
  //         newCar.carImage = req.file.path;

  //         // Save the new car to the database
  //         await newCar.save();
  //         uploadFile(req, res);

  //         // Respond with a success message
  //         res.status(201).render('admin/index')
  //     } catch (error) {
  //         // Handle any errors that might occur during the database operation
  //         console.error('Error adding car:', error);
  //         res.status(500).send('Internal Server Error');
  //     }
  // }
  
  async function addCarAdmin(req, res) {
    try {
        const {
            carName,
            charCatogory,
            year,
            dayRent,
            brandName,
            carModal,
            licencePlateNumber,
            colour,
            fuelType,
            TransmitionType,
            milage,
            insurenceDate,
            feathers,
            description
        } = req.body;
        console.log(req.file);
        // Check if req.file is defined and has a path property
        if (req.file && req.file.path) {
            // Create a new car instance using the car model
            const newCar = new addCars({
                carName,
                charCatogory,
                year,
                dayRent,
                brandName,
                carModal,
                licencePlateNumber,
                colour,
                fuelType,
                TransmitionType,
                milage,
                insurenceDate,
                feathers,
                description
            });
            console.log('req.file:', req.file);

            // Set the carImage property to the file path
            newCar.carImage = req.file.path;

            // Save the new car to the database
            await newCar.save();

            // Handle the success or failure of the file upload
            uploadFile(req, res);
        } else {
            // Handle the case when req.file or req.file.path is undefined
            console.error('Error: File or file path is undefined');
            res.status(400).send('Bad Request');
        }
    } catch (error) {
        // Handle any errors that might occur during the database operation
        console.error('Error adding car:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { addCarAdmin };

  module.exports = {
      // ... other functions
      addCarAdmin,
  };

  async function readAdminDashbord (req,res){
    const cars = await addCars.find()
    // console.log(cars);
    // res.send(cars)
    // const allDataArray = await cars.toArray();

    return cars
  }
  


module.exports = {
  showLoginForm,
  handleAdminLogin,
  handleAdminLoginUseOtp,
  showOtpForm,
  generateAdminOtp,
  viewCarsAdmin,
  viewHomeAdmin,
  addCarAdmin,
  readAdminDashbord
  
};
