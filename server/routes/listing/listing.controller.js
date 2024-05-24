
const { newListing } = require('../../models/listing.model')

async function httpHandleListingCreation(req, res){
    const httpHandleListingCreation = await newListing(req.body)
    return res.json(httpHandleListingCreation)
 }
 
 module.exports = {
   httpHandleListingCreation,
 }