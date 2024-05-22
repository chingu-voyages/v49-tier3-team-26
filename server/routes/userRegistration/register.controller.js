
const {createUser}= require('../../models/user.model')

async function httpHandleUserRegistration(req, res){
    const handleUserRegistration= await createUser(req.body.username, req.body.password, req.body.role)
    return res.json(handleUserRegistration)
 }
 
 module.exports = {
    httpHandleUserRegistration,
 }