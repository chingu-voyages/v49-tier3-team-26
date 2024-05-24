
const { newListing } = require('../../models/listing.model')

async function httpHandleListingCreation(req, res){
  //A's review : The controller should pass the whole req.body to the newListing function
    const httpHandleListingCreation = await newListing(req.body)
    return res.json(httpHandleListingCreation)
 }
 
 module.exports = {
   httpHandleListingCreation,
 }