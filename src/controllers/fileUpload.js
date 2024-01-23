const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage:storage})
const uploadFile = (req,res)=>{
    if(req.file){
        console.log('File uploaded successfully!');

    }  else {
        console.log('Error uploading file!');
    }
}

module.exports={upload,uploadFile}
