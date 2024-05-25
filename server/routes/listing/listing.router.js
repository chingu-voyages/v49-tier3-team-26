const express = require("express");

const registerRouter = express.Router();

const {
    httpHandleListingCreation,
} = require("./listing.controller");


registerRouter.post('/listing', httpHandleListingCreation);

module.exports = registerRouter;