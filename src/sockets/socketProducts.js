
import { productService } from "../services/products.service.js";
import { productController } from "../controllers/products.controller.js";

//estructurar el socket de productos
const socketProducts = async(io) =>{
    
    io.on ('connection', async (socket) =>{ // metodo on, escucha el evento 'connection'
        //const initialProducts = await productService.getRealtimeProducts();
        const initialProducts = await productController.getRealTimeProducts();
        console.log ('connection: User connected');
        socket.emit('initialProducts', initialProducts); // Emite la lista de productos actual al cliente que se conecta
  
        socket.on('newProduct', async (newProduct)=>{ 
            
            await productService.addProducts(newProduct)
           
            //const products = await productService.getRealtimeProducts();
            const products = await productController.getRealTimeProducts();
            socket.emit('updatedProducts', products);
             io.emit ('updatedProducts', products) //Emite para todos los sockets
        })//escucha el evento newProduct y luego de agregar, emite la actualización al agregar

        socket.on ('deleteProduct', async (productId) =>{
            //await productService.deleteProductById(productId);
            await productController.delete(productId);
            //const products = await productService.getRealtimeProducts();
            const products = await productController.getRealTimeProducts();
            socket.emit('updatedProducts', products);
            io.emit ('updatedProducts', products) //Emite para todos los sockets
        })  //escucha el evento deleteProduct y emite la actualización al borrar 
    })
}// cierra socketProducts

export default socketProducts;