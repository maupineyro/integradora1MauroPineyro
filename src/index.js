//Práctica Integradora 1

//Dependencies
import express from "express";

//Modules
import connectToDatabase from "./db.js";
import productModel from "./dao/models/products.model.js";

//App Set
const PORT = 8080;
const app = express();





//listen
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);  
    connectToDatabase();
})

