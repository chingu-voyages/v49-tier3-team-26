//Module imports
require("dotenv").config();
const express = require("express");
const cors = require("cors"); //for client side requests
const helmet = require("helmet"); // good practice for securing http response headers
const morgan = require("morgan"); // for logging http requests
const passport = require("passport"); //for authentication

//Create express server
const app = express();
//add JSON parsing
app.use(express.json());

//add Helmet
app.use(helmet());
// add cors middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
//add logging
app.use(morgan("combined")); //combined is a predefined format as to how the output is logged; this is the standard Apache combined log output


//Import v1 api configuration. Good practice to work with versions
const api= require('./api')
app.use('/v1', api)

module.exports= app