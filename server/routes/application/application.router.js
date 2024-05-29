const express = require("express");

const applicationRouter = express.Router();

const {
    httpHandleApplicationCreation,
    httpHandleGetApplicationById,
    httpHandleApplicationSearch,
    httpHandleApplicationUpdate
    // httpHandleApplicationDelete
} = require("./application.controller");


//Create a new application
applicationRouter.post('/application', httpHandleApplicationCreation);

//Update an existing application
applicationRouter.patch('/application/:id', httpHandleApplicationUpdate)

//Get a application by id
applicationRouter.get('/application/:id', httpHandleGetApplicationById)


//Get a application by id
applicationRouter.get('/application/search', httpHandleApplicationSearch)


module.exports = applicationRouter;