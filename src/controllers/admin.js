
const admin = require('../model/admin');
// const car = require('../model/addCar');
const  {setAdmin} =require('../service/auth');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const { addCars } = require('../model/addCar');
const bcrypt =require('bcrypt') ;
const { sendAdminOtp ,generateOtp } = require('../service/adminotpsms');
const{upload ,uploadFile} = require('../service/fileUpload')
const path =require('path');
const addCar = require('../model/addCar');

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
  const carCount = await countCars()


  res.status(200).render('admin/admindashbord/adminCar',{data:cars,count:carCount})
}



async function countCars() {
  try {
    const carCount = await addCars.countDocuments();
    // console.log(`Total number of cars: ${carCount}`);
    return carCount;
  } catch (error) {
    // console.error('Error counting cars:', error);
    return null;
  }
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
            newCar.carImage = req.file.path;
            await newCar.save();
            uploadFile(req, res);


        } else {
            console.error('Error: File or file path is undefined');
            res.status(400).send('Bad Request');
        }
    } catch (error) {
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

  async function getCarAdminCategory (req,res){
    try{
      const category = req.query.category;
      const car = await addCars.find({charCatogory:category})
  const carCount = await categorycountCars(category)

  res.status(200).render('admin/admindashbord/adminCar',{data:car,count:carCount,category:category})
      
      
    } catch(error){
      console.error('Error adding car:', error);
      res.status(500).send('Internal Server Error');
    }    
  }

  async function categorycountCars(category) {
    try {
      const carCount = await addCars.countDocuments({charCatogory:category});
      // console.log(`Total number of cars: ${carCount}`);
      return carCount;
    } catch (error) {
      // console.error('Error counting cars:', error);
      return null;
    }
  }
  

 async function carDetailsAdmin(req,res ){
  try {
    const carId = req.query.carId;

    // Fetch the car details from MongoDB based on the carId
    const carDetails = await addCars.findById(carId);

    if (!carDetails) {
        return res.status(404).json({ error: 'Car not found' });
    }

    res.json(carDetails);
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
}
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
  readAdminDashbord,
  carDetailsAdmin,
  getCarAdminCategory,
  
};
