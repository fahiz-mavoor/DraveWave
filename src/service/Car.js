const { addCars } = require('../model/addCar');

async function deleteCarById(req,res){
    try{
        const { deleteCarId }= req.body
    // console.log(deleteCarId);

    if(!deleteCarId){
        res.status(400).json('Could not get car Id');
        
    }else{
        await addCars.findByIdAndDelete(deleteCarId)
        res.status(200).redirect('/adminCars')
        console.log("successfulley DeleteCar");
    }
    // res.json('/adminHome')
}catch(error){
    console.log("Bad Request");
    res.status(500).send('Server Error:',error)
}}
module.exports={deleteCarById}