import config from "../config/config.js";
import MongoSingleton from "../config/db.singleton.js";

let productsService;
let cartsService;
let usersService;

async function initializeMongoService() {
    console.log("Iniciando service para MongoDB desde factory");
    try {
        await MongoSingleton.getInstance();
        const { default: ProductServiceMongo } = await import('./dao/db/products.service.js');
        const { default: CartServiceMongo } = await import('./dao/db/carts.service.js');
        const { default: UserServiceMongo } = await import('./dao/db/users.service.js');

        productsService = new ProductServiceMongo();
        cartsService = new CartServiceMongo();
        usersService = new UserServiceMongo();

        console.log(`mongoDB services Ok`);
        
        

    } catch (error) {
        console.error("Error al iniciar MongoDB:", error);
        process.exit(1); 
    }
}

switch(config.persistence) {
    case 'mongodb':
        initializeMongoService();
        break;

    case 'files':
        const { default: ProductServiceFileSystem } = await import('./dao/filesystem/products.service.js');
        const { default: CartServiceFileSystem } = await import('./dao/filesystem/carts.service.js');
        const { default: UserServiceFileSystem } = await import('./dao/filesystem/users.service.js');

        productsService = new ProductServiceFileSystem();
        cartsService = new CartServiceFileSystem();
        usersService = new UserServiceFileSystem();

        console.log(`Servicio de products cargado (filesystem)`);
        console.log(`Servicio de carts cargado (filesystem)`);
        console.log(`Servicio de users cargado (filesystem)`);
        break
    default:  
        console.error("Persistencia no válida en la configuración:", config.persistence);
        process.exit(1);
}

export { productsService, cartsService, usersService}