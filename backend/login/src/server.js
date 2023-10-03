//packages
const express = require('express');
const app  = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
const cors = require('cors')

//Routes
const loginRoute = require('./routes/login_route.js')
app.use(bodyParser.json())
app.use(cors())
app.use("/login", loginRoute);

module.exports = app;