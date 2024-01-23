const mongoose = require("mongoose");
const { Schema, model } = mongoose;


try{
  const userSchema = new mongoose.Schema(
    {
      
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
const User = mongoose.model("user", userSchema);
module.exports = User;

}
catch (error) {
  console.error('Error during admin login:', error);
  return res.status(500).send('Internal Server Error');
}

// try{

//    const carScheema = new mongoose.Schema({
//     carName:{
//       type: String,
//       required: true,
//     },
//     charCatogory:{
//       type: String,
//       required: true,
//     },
//     year:{
//       type: Number,
//       required: true,
//     },
//     dayRent:{
//       type: Number,
//       required: true,
//     },
//     brandName:{
//       type: String,
//       required: true,
//     },
//     carModal:{
//       type: String,
//       required: true,
//     },
//     licencePlateNumber:{
//       type: String,
//       required: true,
//       unique:true
//     },
//     carImage:{
//       type: String, 
//       required: true,
//     },
//     colour:{
//       type: String,
//       required: true,
//     },
//     fuelType:{
//       type: String,
//       required: true,
//     },
//     TransmitionType:{
//       type: String,
//       required: true,
//     },
//     milage:{
//       type: Number,
//       required: true,
//     },
//     insurenceDate:{
//       type: Date,
//       required: true,
//     },
//     feathers:{
//       type: Array,
//       required: true,
//     },
//     description:{
//       type: Array,
//       required: true,

//     },
//    },
//    { timestamps: true }
  
//    )
//     const addCar= mongoose.model("Cars",carScheema)
//     // module.exports=addCar

  
// }catch(error){
//   console.error('Error during admin login:', error);
//   // return res.status(500).send('Internal Server Error');
// }
