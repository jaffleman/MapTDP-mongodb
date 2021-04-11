const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//const productRoutes = require('./routes/productRoutes')
//const usersRoutes = require('./routes/usersRoutes')
//const path = require('path');
const tdpRoutes = require('./routes/tdpRoutes')
const loger = require("./logtimer/writeLog.js")


app = express()

mongoose.connect("mongodb+srv://Jaffleman:SuperMapTDP923@clustermapt.3dujj.mongodb.net/MapTDP?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => loger('Connexion à MongoDB réussie !'))
  .catch(() => loger('Connexion à MongoDB échouée !'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  //loger(`new incoming "${req.method}" request`)
  res.setHeader('Access-Control-Allow-Origin', 'http://www.jaffleman.tech');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/tdp', tdpRoutes)
module.exports = app