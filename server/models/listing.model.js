const { PrismaClient } = require('@prisma/client')
const { error } = require('console')

const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error'],  errorFormat: "minimal",}
)

async function newListing(listing){
         //Check required properties
    if (!listing.id || 
        !listing.petName || 
        !listing.petPhoto ||
        !listing.petType ||
        !listing.petAge ||
        !listing.location ||
        !listing.userId

    ){
        return ({
           error: 'Missing required properties.'
        })
    }
        try {
            //Pseudo code for userId (role=shelter) check

//Before attempting to create a listing via Prisma we have to perform a check on the userId provided.
// If the provided userId has a role=shelter then they are allowed to create a listing
// Otherwise we return an error : User does not have access rights for this.

// So i would add another await method to find user by id 
//(probably something like findUnique) and the check the returned record that indeed it has the shelter role
// If the returned role is correct the we proceed to the create
            const isUserRoleShelter = await prisma.user.findUnique(listing.userId)
            console.log(isUserRoleShelter)
            if(isUserRoleShelter.role === "shelter") {
                const newListing = await  prisma.listing.create({
                    data: {
                        id: listing.id,
                        petName: listing.petName,
                        petPhoto: listing.petPhoto,
                        petType: listing.petType,
                        petBreed: listing.petBreed,
                        petAge: listing.petAge,
                        location: listing.location,
                        description: listing.description,
                        tags: listing.tags,
                        userId: listing.userId
                    }
                  })
                  return ({message: "New listing has been created with id: " + newListing.id})

            }
            else {
                return ({error: 'You are not allowed to publish a listing.'})
            }

        }
        catch(err){
            if (err.name==="PrismaClientValidationError"){
                return ({error:"Provided input parameters or type of input parameters is invalid." })
            } 
            return({error:err.name})
        }
    } 
  
module.exports= {
    newListing
}