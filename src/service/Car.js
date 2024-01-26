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

async function editCarById(req, res) {
    try {
        const { editCarId, ...updateValues } = req.body;

        if (!editCarId) {
            return res.status(400).json('Could not get car Id');
        }

        if (Object.keys(updateValues).length === 0) {
            return res.status(400).json('No fields to update');
        }

        const result = await addCars.findByIdAndUpdate(editCarId, { $set: updateValues }, { new: true });

        if (!result) {
            return res.status(404).json('Car not found');
        }

        res.status(200).redirect('/adminCars');
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).send('Server Error: ' + error.message);
    }
}

module.exports={deleteCarById,editCarById}