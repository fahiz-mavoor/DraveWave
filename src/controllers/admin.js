
const admin = require('../model/admin');
const  {setAdmin} =require('../service/auth');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const bcrypt =require('bcrypt') ;
const { sendAdminOtp ,generateOtp } = require('../service/adminotpsms');

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


  // sendAdminOtp();


module.exports = {
  showLoginForm,
  handleAdminLogin,
  handleAdminLoginUseOtp,
  showOtpForm,
  generateAdminOtp,
};
