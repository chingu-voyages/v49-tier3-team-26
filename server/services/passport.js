//Passport imports
const passport = require('passport');
const LocalStrategy = require('passport-local');

//User model imports
const {verifyPassword, findUserById}= require('../models/user.model')

//Initialize Passport strategy "local" in order to login with username & password
const strategy  = new LocalStrategy(verifyPassword);
passport.use(strategy);


//User serialization
//The user id of the logged in user is stored in the passport session
passport.serializeUser((user, done) => {
    //Store user id in session
    done(null, user[0].id);
})


//User deserialization
//When we need to know who is logged in based on the provided session cookie, we look up
//if the user in session is an actual user from our DB 
passport.deserializeUser(async function(userId, done){
    try {
        //Look for user in the DB 
        const user= await findUserById(userId)
        return done(null, user)
    }
   catch(err) {
    return done(err)
   } 
});