//Passport imports
const passport = require('passport');

function httpHandleUserLogin(req, res){
  //The controller will use the local strategy defined in the passport.js configuration
    passport.authenticate("local", function (err, user) {
        if (err) {
          res.json({ message: err });
        } else {
          if (!user) {
            res.json({message: "Username or password incorrect." });
          } else {
            //If username & password are correct, Passport will log in the user to the passport session
            req.logIn(user, function(err) {
              res.json({ message: "Login successful." })
            }); 
            ;
          }
        }
      })(req, res);
  
}



 module.exports = {
    httpHandleUserLogin,
 }