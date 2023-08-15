//importar e instanciar productManager
import ProductManagerMongo from "../dao/managers/mongoDB/ProductManagerMongo.js";
const productManager = new ProductManagerMongo;
import { productService } from "../services/products.service.js";

//estructurar el socket de productos
const socketProducts = async(io) =>{
    
    io.on ('connection', async (socket) =>{ // metodo on, escucha el evento 'connection'
        //const initialProducts = await productManager.getRealtimeProducts();
        const initialProducts = await productService.getRealtimeProducts();
        console.log ('connection: User connected');
        socket.emit('initialProducts', initialProducts); // Emite la lista de productos actual al cliente que se conecta
  
        socket.on('newProduct', async (newProduct)=>{ 
            //await productManager.addProducts(newProduct)
            await productService.addProducts(newProduct)
            //const products = await productManager.getRealtimeProducts();
            const products = await productService.getRealtimeProducts();
            socket.emit('updatedProducts', products);
             io.emit ('updatedProducts', products) //Emite para todos los sockets
        })//escucha el evento newProduct y luego de agregar, emite la actualización al agregar

        socket.on ('deleteProduct', async (productId) =>{
            //await productManager.deleteProductById(productId);
            //const products = await productManager.getRealtimeProducts();

            await productService.deleteProductById(productId);
            const products = await productService.getRealtimeProducts();
            socket.emit('updatedProducts', products);
            io.emit ('updatedProducts', products) //Emite para todos los sockets
        })  //escucha el evento deleteProduct y emite la actualización al borrar 
    })
}// cierra socketProducts

export default socketProducts;