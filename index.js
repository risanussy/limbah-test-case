const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const multer = require('multer');

const app = express();

const port = 4000;
const dataRoutes =   require('./src/routes/data');

// fungsi body parser adalah mengubah req ke json
app.use(bodyParser.json());
app.use(multer().single('none'));

// untuk menangani privacy police di browser
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
  next();
})

// Router
app.use('/v1/data', siswaRoutes)

// validator 
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({message, data})
})

mongoose.connect('mongodb+srv://thislaptop55:jogja1234@db.zhycss4.mongodb.net')
  .then(()=> {
    app.listen(port, ()=>{
      console.log(`server is running...`)
    })
  })
  .catch(err => console.log(err))
