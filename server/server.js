//Module imports
require('dotenv').config()
const http= require('http')
const {Client}= require('pg')

//Config imports
const app= require('./app')
const PORT= process.env.PORT

//Create http server
const server= http.createServer(app)

//Create PostgreSQL client object
const dbConfig= new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE_NAME
})

async function startServer(){
    //here we will add await of DB connexion
    dbConfig.connect(()=> {
        console.log('Connected to PostgreSQL database');
    })

    //TEST DB connexion: only for testing purposes
    // dbConfig.query('SELECT * FROM listing', (err, result) => {
    //     if (err) {
    //         console.error('Error executing query', err);
    //     } else {
    //         console.log('Query result:', result.rows);
    //     }})

    server.listen(PORT, ()=> {
        console.log(`Listening on port ${PORT}`)
    })
}

startServer()