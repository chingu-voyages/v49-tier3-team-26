//Module imports
const express= require('express')

//Initialize router
const api= express.Router()


//Health endpoint
const healthRouter= require('./routes/health.router')
api.use(healthRouter)


//Other endpoints will come here 
//....


module.exports= api