
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

//Import Routes
import homeRouter from "./routes/home.route.js";
import realTimeRouter from "./routes/realTime.route.js";
import productRouter from "./routes/productRouter.js";
import ProductManagerMongo from "./dao/managers/mongoDBmanager/ProductManagerMongo.js";
//import cartRouter from "./routes/cartRouter.js";


//App Set
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.engine ("handlebars", engine());
app.set ("view engine", "handlebars");
app.set ("views", __dirNameViews);

//Public
app.use(express.static(__dirNamePublic));

//morgan
app.use(morgan('dev')) //para chequear peticiones get post etc

//App Routes
app.use ('/home', homeRouter); //debe mostrar todos los productos agregados hasta el momento
app.use ('/realtimeproducts', realTimeRouter); //debe trabajar con webSocket y mostrar cambios a tiempo real
app.use ("/api/products", productRouter); //debe manejar el crud de productos con diferentes rutas
//app.use ("/api/cart", cartRouter);


//Socket IO
const server = http.createServer(app);
const io = new Server(server);

const ProductManagerServer = new ProductManagerMongo;

 
//socket (server)
io.on ('connection', async (socket) =>{ // metodo on, escucha eventos, en este caso el evento 'connection'
    console.log ('connection: User conectado');
    
    const products = await ProductManagerServer.getProducts();
    
  socket.emit('initialProducts', products); // Emite la lista de productos actual al cliente que se conecta
  io.emit('updatedProducts', products); // Emite la lista de productos actual a todos los clientes
    

    socket.on('newProduct', (newProduct)=>{ //debe escuchar el evento emitido por el cliente que trae el objeto newProduct
        ProductManagerServer.addProducts(newProduct);
        console.log("el producto enviado via socket es:", newProduct);

    })

    socket.on ('deleteProduct' , (productId) =>{
        ProductManagerServer.deleteProducts(productId);
        console.log ("el producto ha sido eliminado");
        io.emit('updatedProducts', products);
    })

 })


//listen y DB
server.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);  
    connectToDatabase();
})

