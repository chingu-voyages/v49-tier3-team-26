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

//User login
const loginRouter= require('./routes/userLogin/userLogin.router')
api.use(loginRouter)

module.exports= api