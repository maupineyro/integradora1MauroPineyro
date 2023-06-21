
//Import Dependencies
import express from "express";
import {engine} from "express-handlebars";
import http from 'http';
import {Server} from "socket.io";
import morgan from "morgan";

//Import Modules
import { connectToDatabase } from "./dao/db.js";
import __dirNameViews from "./views/solutionDirName.js";
import __dirNamePublic from "./public/publicDirName.js";
import socketProducts from "./sockets/socketProducts.js";
import socketChat from "./sockets/socketChat.js";

//Import Routes
import homeRouter from "./routes/home.route.js";
import realTimeRouter from "./routes/realTime.route.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/carts.route.js";

//App Settings
const app = express();
app.engine ("handlebars", engine());
app.set ("view engine", "handlebars");
app.set ("views", __dirNameViews);
app.use(express.static(__dirNamePublic));
app.use(morgan('dev')) //para chequear peticiones get post etc por consola
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//App Routes
app.use ('/home', homeRouter); //debe mostrar todos los productos agregados hasta el momento
app.use ('/realtimeproducts', realTimeRouter); //debe trabajar con webSocket y mostrar cambios a tiempo real
app.use ("/api/products", productRouter); //debe manejar el crud de productos con diferentes rutas
app.use ("/api/cart", cartRouter); //debe manejar el crud de carrito

//Socket IO
const server = http.createServer(app);
const io = new Server(server);
socketProducts(io);
socketChat (io);
 
//listen y DB
const PORT = 8080 || process.env.PORT;
server.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);  
    connectToDatabase();
})

