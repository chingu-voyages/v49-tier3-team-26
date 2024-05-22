const { PrismaClient }=require('@prisma/client')
const bcrypt = require('bcrypt');

const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error'],}
)

async function createUser(username, password,role){
    //Check required properties
    if (!username || !password){
        return ({
           error: 'Missing required properties.'
        })
    }
    //Check if username doesn't exist already
    //   const userExists = await existsUser(username)
    //   if (userExists) {
    //     return ({error: "Username already exists."})
    //   }

    //Create new user
    //Hash password 
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            // Handle error
            return ({error: 'There was an error with your request.Try again later.'})
        }
        //Save user details to database
        prisma.user.create({
            data: {
                email: username,
                password: hash,
                role: role,
                tokenCreationTimestamp: new Date().toISOString()
            }
           
          }).then(data=> {
            return ({message: "Registration successful. User created with id: "+ data.id})
        }).catch(err=> {
            return ({error: err})
        })
       //console.log(userRegistration)
    
    
})
   

}

module.exports= {
    createUser
}