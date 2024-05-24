const { PrismaClient } = require('@prisma/client')
const { error } = require('console')

const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error'],  errorFormat: "minimal",}
)

async function newListing(listing){
         //Check required properties
    if (!listing.petName || 
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

            const isUserRoleShelter = await prisma.user.findUnique({
                where: {
                    id: listing.userId,
                  },
            })
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
                        userId: listing.userId,
                        published: listing.published
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