const {prisma}= require('../prisma/prismaClient')
//Imports
const bcrypt = require('bcrypt');

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
                    role: role
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
  
async function verifyPassword(username, password, done){
        //Check required properties
        if (!username || !password){
        return ({
            error: 'Missing required properties.'
        })
    }

        //Retrieve stored password
        const user= await prisma.user.findMany({
            where: {
                email: username
            },
            select: {
                password: true,
                email: true,
                id: true
            } 
        })
        //Check if stored hash is the same as provided user login password
        try {
            const hashCompare= bcrypt.compareSync(password, user[0].password)
            if (hashCompare){
        
                return done(null,user)
            } else {
                return done(null, false, {error: "Incorrect username or password."})
            }
        }
           catch(err) {
            return done(null, false, {error: "Incorrect username or password."})
           }
           
        }
   
async function findUserById(userId){
    const user= await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true
        } 
    })
    return user
}

async function searchUser(query){
    const allUsers= await prisma.user.findMany({
        where: {
            email: query.username? query.username: {not: ''},
            id: query.id? query.id: {not: ''} ,
            role: query.role? query.role: {not:''}
        },
        select: {
            id: true,
            email: true,
            role: true 
        } 
    })
    return allUsers
}

module.exports= {
    createUser,
    verifyPassword,
    findUserById,
    searchUser

}