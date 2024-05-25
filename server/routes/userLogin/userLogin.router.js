const express = require("express");

const loginRouter = express.Router();

const {
    httpHandleUserLogin,
    handleUserLogout
} = require("./userLogin.controller");


//Router for user login
loginRouter.post('/user/login', httpHandleUserLogin);
//Router for user logout
loginRouter.post('/user/logout', handleUserLogout);

module.exports = loginRouter;