const mongoosh = require('mongoodh')

mongoose.connect('mongodb+srv://fahizk100:xi2DWfEqY6xF8L9T@cluster0.5cdfdu0.mongodb.net/',{
});

const customConnection = mongoose.connection
customConnection.on('error',console.error.bind(console,'MongoDB Connection Error'));
customConnection.once('open',() => {
    console.log("MongoDb Connected Successfully");
});
module.exports = mongoosh