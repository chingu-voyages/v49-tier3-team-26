const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error'],  errorFormat: "minimal",}
)

async function newListing(id, petName){
         //Check required properties
    if (!id || !petName ){
        return ({
           error: 'Missing required properties.'
        })
    }
    //Check if username doesn't exist already
   //This check is done by enforcing a unique constraint on username(email) in the DB, done at the time of user creation

        try {
            const newListing = await  prisma.listing.create({
                data: {
                    id: id,
                    petName: petName,
                    petPhoto: "https://example.com/photos/buddy.jpg",
                    petType: "Dog",
                    petBreed: "Golden Retriever",
                    petAge: 3,
                    location: "New York, NY",
                    description: "A friendly and playful dog.",
                    tags: "friendly,playful",
                    creationTimestamp: "2023-05-23T18:25:43.511Z",
                    lastUpdateTimestamp: "2024-05-23T18:25:43.511Z",
                    published: true,
                    userId: "16ea8d68-882f-4437-b644-40a1a40fe702"
                      
                }
              })
              return ({message: "New listing has been created with id: " + newListing.id})

        }
        catch(err){
            if (err.name==="PrismaClientValidationError"){
                return ({error:"Provided input parameters or type of input parameters is invalid." })
            } else if (err.name==="PrismaClientKnownRequestError"){
                return ({error: "Listing already exists."})
            }
            return({error:err.name})
        }
    } 
  
module.exports= {
    newListing
}