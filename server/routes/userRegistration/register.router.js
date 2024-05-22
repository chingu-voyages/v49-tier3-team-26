const express = require("express");

const registerRouter = express.Router();

const {
    httpHandleUserRegistration,
} = require("./register.controller");


registerRouter.post('/user/register', httpHandleUserRegistration);

module.exports = registerRouter;