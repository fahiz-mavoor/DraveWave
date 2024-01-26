const { addCars } = require('../model/addCar');
const {deleateFile} = require('../service/fileUpload')
const {uploadFile} = require('./fileUpload')



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

            const filePath = car.carImage; 

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

        const car = await addCars.findById(editCarId).exec();

        if (!car) {
            return res.status(404).json('Car not found');
        }

        const updatedCar = await addCars.findByIdAndUpdate(editCarId, { $set: updateValues }, { new: true });

        if (req.file) {
            deleateFile(car.carImage);

            updatedCar.carImage = req.file.path;
            await updatedCar.save();

            uploadFile(req, res);
        }else{
            await updatedCar.save();
        return res.status(200).redirect('/adminCars'); 



        }


    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).send('Server Error: ' + error.message);
    }
}

module.exports={deleteCarById,editCarById}