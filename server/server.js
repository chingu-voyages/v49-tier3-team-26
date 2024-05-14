//Module imports
require('dotenv').config()
const http= require('http')

//Config imports
const app= require('./app')
const PORT= process.env.PORT

//Create http server
const server= http.createServer(app)

async function startServer(){
    //here we will add await of DB connexion

    server.listen(PORT, ()=> {
        console.log(`Listening on port ${PORT}`)
    })
}

startServer()