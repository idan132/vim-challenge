//packages
const express = require('express');
const app  = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
const cors = require('cors')

//Routes
const chatRoute = require('./routes/chat_route.js')
app.use(bodyParser.json())
app.use(cors())
app.use("/chat-bff", chatRoute);

module.exports = app;