const express = require ('express')
const bodyParser = require('body-parser')
const adminRout = require('../src/routes/admin')
const {connectToMongoDb} = require('../config/connect')
const hbs = require ('hbs')
const PORT = process.env.PORT||4000

const mongoUrl = 'mongodb://localhost:27017/';
connectToMongoDb(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error.message);
    });

const app = express()

app.set('view engine','hbs')
app.set('views','./src/views')


app.use('/',adminRout)

app.use((req, res, next) => {
    res.status(404).render('404'); // Assuming you have a "404.hbs" file in your views directory
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

