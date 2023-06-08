//Práctica Integradora 1

//imports
import express from "express";
import connectToDatabase from "./db.js";

//Set
const app = express();
const PORT = 8080;
connectToDatabase();



//listen


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);  
   
})

