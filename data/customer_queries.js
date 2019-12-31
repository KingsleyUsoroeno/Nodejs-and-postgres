const pool = require('../db/connection/postgres_connection');

const registerUser = (request, response ) => {

    // DO SOME VALIDATION ON THE INCOMING REQUEST

     const { username,password,email } = response.body

     if(!username || password || email){
         response.status(400).json({message: "Required fields have not been provided"});
         return
     }

     // CHECK IF THE USER ALREADY EXISTS IN THE DATABASE BY QUERYING THE DB FOR THEIR EMAIL
    
}