//Práctica Integradora 1

//Dependencies
import express from "express";

//Modules
import connectToDatabase from "./db.js";

//Set
const app = express();
const PORT = 8080;




//listen
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);  
    connectToDatabase();
})

