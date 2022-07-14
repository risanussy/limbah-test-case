const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');

const app = express();

const port = 4000;
const siswaRoutes =   require('./src/routes/siswa');
const authRoutes =   require('./src/routes/auth');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime()+'-'+file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' 
  ){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

// fungsi body parser adalah mengubah req ke json
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({storage: fileStorage, fileFilter}).single('foto'));

// untuk menangani privacy police di browser
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
  next();
})

// Router
app.use('/v1/data', siswaRoutes)
app.use('/v1/auth', authRoutes)

// validator 
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({message, data})
})

mongoose.connect('mongodb+srv://admin:6kO8oBjCCSmxXbpb@al-azhar.dgeaugp.mongodb.net/siswa?retryWrites=true&w=majority')
  .then(()=> {
    app.listen(port, ()=>{
      console.log(`server is running...`)
    })
  })
  .catch(err => console.log(err))
