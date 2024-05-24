const { PrismaClient }=require('@prisma/client')
const bcrypt = require('bcrypt');

const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error'],  errorFormat: "minimal",}
)

async function createUser(username, password,role){
         //Check required properties
    if (!username || !password || !role){
        return ({
           error: 'Missing required properties.'
        })
    }
    //Check if username doesn't exist already
   //This check is done by enforcing a unique constraint on username(email) in the DB, done at the time of user creation

    //Create new user
    //Hash password 
    const hash = bcrypt.hashSync(password, 10);
    //Save user details to DB
    if (hash) {
        try {
            const userRegistration= await  prisma.user.create({
                data: {
                    email: username,
                    password: hash,
                    role: role,
                    token: null,
                    tokenCreationTimestamp: new Date().toISOString()
                }
               
              })
              return ({message: "Registration successful. User has been created with id: " + userRegistration.id})

        }
        catch(err){
            if (err.name==="PrismaClientValidationError"){
                return ({error:"Provided input parameters or type of input parameters is invalid." })
            } else if (err.name==="PrismaClientKnownRequestError"){
                return ({error: "Username already exists."})
            }
            return({error:err.name})
        }

    }


    } 
  


module.exports= {
    createUser
}