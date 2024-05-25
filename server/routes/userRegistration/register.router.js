const express = require("express");

const registerRouter = express.Router();

const {
    httpHandleUserRegistration,
} = require("./register.controller");



//Router for user registration (create new account)
registerRouter.post('/user', httpHandleUserRegistration);

module.exports = registerRouter;