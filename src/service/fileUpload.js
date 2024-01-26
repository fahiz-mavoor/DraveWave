const multer  = require('multer')
const path = require('path')
const fs =require('fs');
const { error } = require('console');
// const upload = multer({ dest: 'uploads/' })


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() +ext);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            callback(null, true);
        } else {
            console.log('Only jpg, png files are allowed');
            callback(null, false);
        }
    },
});

const uploadFile = (req, res) => {
    if (req.file) {
        console.log('File uploaded successfully!');
        res.status(201).redirect('/adminCars')
    } else {
        console.log('Error uploading file!');
    }
    // You can add additional logic here if needed
}
 
 function deleateFile(filePath){
    fs.unlink(filePath,(error)=>{
        if(error){
       console.log(`file is not removed ${error}`);

        }else{
       console.log(`file is removed ${filePath}`);
       return true
        }
    })

 }
module.exports = { upload, uploadFile,deleateFile };


// module.exports={upload}
