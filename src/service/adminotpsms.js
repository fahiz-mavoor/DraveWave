const nodemailer = require ('nodemailer')



const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'benny.grimes6@ethereal.email',
      pass: 'beCWcw3HXWCzGp4zAx'
  }
});

    function generateOtp(){
      return Math.floor(100000+Math.random()*900000).toString()
    }

    function sendAdminOtp(email,otp, callback){
      const mailOption= {
        from:'fahizk100@gmal.com',
        to:email,
        subject:`your OTP for Login`,
        text:`your Otp is :${otp}`


      }
      transporter.sendMail(mailOption,callback)
    }

module.exports = { generateOtp ,sendAdminOtp };
