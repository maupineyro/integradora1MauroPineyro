//Práctica Integradora 1

//Dependencies
import express from "express";
import {engine} from "express-handlebars";

//Modules
import connectToDatabase from "./db.js";
import __dirNameViews from "./views/solutionDirName.js";
import __dirNamePublic from "./public/publicDirName.js";
import productModel from "./dao/models/products.model.js";

//App Set
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine ("handlebars", engine());
app.set ("view engine", "handlebars");
app.set ("views", __dirNameViews);

//Public
app.use(express.static(__dirNamePublic));

//App Routes
//app.use ('/home', homeRouter); //debe agregar todos los productos agregados hasta el momento
//app.use ('/realtimeproducts', realTimeRouter); //debe trabajar con webSocket y mostrar cambios a tiempo real
//app.use ("/api/products", productRouter);
//app.use ("/api/cart", cartRouter);



//listen
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);  
    connectToDatabase();
})

