//Module imports
const express= require('express')

//Initialize router
const api= express.Router()


//Health endpoint
const healthRouter= require('./routes/health.router')
api.use(healthRouter)


//User Registration
const registerRouter= require('./routes/userRegistration/register.router')
api.use(registerRouter)

//Listing Creation
const listingRouter= require('./routes/listing/listing.router')
api.use(listingRouter)

module.exports= api