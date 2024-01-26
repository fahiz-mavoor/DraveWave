const { addCars } = require('../model/addCar');
const {deleateFile} = require('../service/fileUpload')

// async function deleteCarById(req,res){
//     try{
//         const { deleteCarId }= req.body
//     // console.log(deleteCarId);

//     if(!deleteCarId){
//         res.status(400).json('Could not get car Id');
        
//     }else{
//         const filePath = addCars.findById({deleteCarId},{carImage})
//         console.log(filePath);
//        const deleteImag= deleateFile(filePath)
//         if(deleteImag){

        
//         await addCars.findByIdAndDelete(deleteCarId)
//         res.status(200).redirect('/adminCars')
//         console.log("successfulley DeleteCar");
//         }else{
//         console.log('Could not get file path of the car');
//         res.status(300).redirect('/adminCars')
            
//         }
//     }
//     // res.json('/adminHome')
// }catch(error){
//     console.log("Bad Request");
//     res.status(500).send('Server Error:',error)
// }}

async function deleteCarById(req, res) {
    try {
        const { deleteCarId } = req.body;

        if (!deleteCarId) {
            return res.status(400).json('Could not get car Id');
        } else {
            const car = await addCars.findById(deleteCarId);
            
            if (!car) {
                return res.status(404).json('Car not found');
            }

            const filePath = car.carImage; // Assuming carImage is the property containing the file path

            const deleteImage = deleateFile(filePath);

            
                await addCars.findByIdAndDelete(deleteCarId);
                console.log("Successfully deleted Car");
                return res.status(200).redirect('/adminCars');
         
            
        }
    } catch (error) {
        console.log("Bad Request:", error);
        return res.status(500).send('Server Error: ' + error.message);
    }
}

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