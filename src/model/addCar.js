const mongoose = require("mongoose");


try{

   const carScheema = new mongoose.Schema({
    carName:{
      type: String,
      required: true,
    },
    charCatogory:{
      type: String,
      required: true,
    },
    year:{
      type: Number,
      required: true,
    },
    dayRent:{
      type: Number,
      required: true,
    },
    brandName:{
      type: String,
      required: true,
    },
    carModal:{
      type: String,
      required: true,
    },
    licencePlateNumber:{
      type: String,
      required: true,
      unique:true
    },
    carImage:{
      type: Buffer, 
      required: true,
    },
    colour:{
      type: String,
      required: true,
    },
    fuelType:{
      type: String,
      required: true,
    },
    TransmitionType:{
      type: String,
      required: true,
    },
    milage:{
      type: Number,
      required: true,
    },
    insurenceDate:{
      type: Date,
      required: true,
    },
    feathers:{
      type: Array,
      required: false,
    },
    description:{
      type: Array,
      required: false,

    },
   },
   { timestamps: true }
  
   )
    const Car =mongoose.model("Cars",carScheema)
    module.exports={ addCars: Car}

  
}catch(error){
  console.error('Error during admin login:', error);
  return res.status(500).send('Internal Server Error');
}