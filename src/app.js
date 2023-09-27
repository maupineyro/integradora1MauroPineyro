
//Import Dependencies
import express from "express";
import {engine} from "express-handlebars";
import http from 'http';
import {Server} from "socket.io";
import morgan from "morgan";
import session from "express-session";
import MongoStore from 'connect-mongo';
import passport from "passport";
import dotenv from 'dotenv';


//Import Modules
import { connectToDatabase } from "./dao/db.js";
import __dirNameViews from "./views/solutionDirName.js";
import __dirNamePublic from "./public/publicDirName.js";
import socketProducts from "./sockets/socketProducts.js";
import socketChat from "./sockets/socketChat.js";
import { InitPassport } from "./config/passport.config.js";
import { addLogger } from "./config/logger.js";
import config from "./config/config.js";
import MongoSingleton from "./config/db.singleton.js";

//Import Routes
import homeRouter from "./routes/home.route.js";
import realTimeRouter from "./routes/realTime.route.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/carts.route.js";
import chatRouter from "./routes/chat.route.js";
import sessionRouter from "./routes/sessions.route.js";
import viewRouter from "./routes/views.router.js";
import mockRouter from "./routes/mocks.route.js";
import loggerRouter from "./routes/logger.route.js";
import emailRouter from "./routes/emails.route.js";

//App Settings
dotenv.config();
const app = express();
app.engine ("handlebars", engine());
app.set ("view engine", "handlebars");
app.set ("views", __dirNameViews);
app.use(express.static(__dirNamePublic));
app.use(morgan('dev')) //para chequear peticiones get post etc por consola
app.use(express.json());
app.use(express.urlencoded({extended:true}));




//session
app.use(session ({
    store: MongoStore.create({
        mongoUrl:config.mongoUrl,
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

//Passport
InitPassport();
app.use(passport.initialize());
app.use(passport.session());

//logger como middleware
app.use(addLogger);

//App Routes
app.use ('/home', homeRouter); //debe mostrar todos los productos agregados hasta el momento
app.use ('/chat', chatRouter); // debe mostrar el chat
app.use ('/realtimeproducts', realTimeRouter); //debe trabajar con webSocket y mostrar cambios a tiempo real
app.use ("/api/products", productRouter); //debe manejar el crud de productos con diferentes rutas
app.use ("/api/carts", cartRouter); //debe manejar el crud de carrito
app.use ("/api/sessions",sessionRouter) // debe manejar el post de login, register, logout de sesiones
app.use ('/', viewRouter) //debe manejar la parte visible de login y register
app.use ('/mockingproducts', mockRouter)
app.use('/loggerTest', loggerRouter )
app.use('/api/mailing', emailRouter)

//Socket IO
const server = http.createServer(app);
const io = new Server(server);
socketProducts(io);
socketChat (io);
 
//listen y DB


const SERVER_PORT = config.port;
server.listen(SERVER_PORT, ()=>{
    console.log(`Servidor escuchando por el puerto: ${SERVER_PORT}`);  
    const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error(error);
        process.exit();
    }
};
    mongoInstance();
})

