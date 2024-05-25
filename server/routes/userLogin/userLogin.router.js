const express = require("express");

const loginRouter = express.Router();

const {
    httpHandleUserLogin,
} = require("./userLogin.controller");


//Router for user login
loginRouter.post('/user/login', httpHandleUserLogin);

module.exports = loginRouter;