
const { newListing } = require('../../models/listing.model')

async function httpHandleListingCreation(req, res){
    const httpHandleListingCreation = await newListing(req.body.id, req.body.petName)
    return res.json(httpHandleListingCreation)
 }
 
 module.exports = {
   httpHandleListingCreation,
 }