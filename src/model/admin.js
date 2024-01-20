const mongoose = require ('mongoose')
mongoose.connect('mongodb://localhost:27017/your-database', { useNewUrlParser: true, useUnifiedTopology: true })
    // .then(() => {
    //     app.listen(PORT, () => {
    //         console.log(`Server is running on http://localhost:${PORT}`);
    //     });
    // })
    // .catch(error => console.error('Error connecting to MongoDB:', error));

const adminSchema = new mongoose.Schema({
name:{
    type:String,
    required: true
},password:{
    type:String,
    required: true
}

},{timestamps:true});

const user = mongoose.model("admin",adminSchema)
module.exports = user