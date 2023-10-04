
import { productsService } from "../services/factory.js";
import { generateMockingProducts } from "../utils/utils.mocks.js";

class ProductController {
//    
    async add(req, res) {
        try {
        let {dataProduct} = req.body
        let newPr = await productsService.addProducts(dataProduct);
        res.status(201).send(newPr); 
        } catch (error) {
        res.status(500).send(`se sufre este ${error}`)
        }
    }
//
    async getAll (req,res){
        try {
        let {limit = 10, page = 1, query, sort} = req.query
            if(sort && (sort !== 'asc' && sort !== 'desc')){
                sort = ''
            } 
        const paginatedProducts = await productsService.getProducts(page, limit, sort, query);
          const { docs, ...rest } = paginatedProducts;
            let user = req.session.user || null;
            let products = docs.map((doc) => {
              return { _id: doc._id, title: doc.title, thumbnail: doc.thumbnail, price: doc.price, stock: doc.stock ,description: doc.description};
            });
        res.status(200).render('home',{products, pagination:rest , user})
        
    } catch (error) {
        throw error
    }
}   
//
    async getProduct (req, res){//y currentUser, cambiar nombre e importaciones
        let pid = req.params.pid;
        let currentUser = req.session.user;
        try {
            const singleProduct = await productsService.getProductById(pid);
            console.log("el detalle de pid es",singleProduct)
            //res.status(200).send(singleProduct);
            res.status(200).render('singleProduct', {user: currentUser , product: singleProduct }); 
        } catch (error) {
            res.status(500).send(`se sufre este ${error}`)
        }
    }
//
    async findProductById (req, res){
        let pid = req.params.pid;
        try {
            const singleProduct = await productsService.getProductById(pid);
            console.log("el detalle de pid es",singleProduct)
            res.status(200).send(singleProduct);   
        } catch (error) {
            res.status(500).send(`se sufre este ${error}`)
        }
    }



//
    async delete(req, res){
        let pid = req.params.pid;
        try {
            let deleted = await productsService.deleteProductById(pid)
            res.status(201).send(`el producto fue eliminado`) 
        } catch (error) {
            res.status(500).send(`se sufre este ${error}`)
        }
    }
//
    async update (req,res){
        let pid = req.params.pid;
        let newProps = req.body;
        if (!newProps) return;
        try {
            let updated = await productsService.updateProductByID(pid,newProps)
            res.status(201).send(`el producto fue actualizado`)     
        } catch (error) {
        res.status(500).send(`se sufre este ${error}`)
        }
    }
//    
     async getMockingProducts (req,res){
        try {
            let mockProducts = [];
            let mockProductsQuantity = 100;
            for(let index = 0; index < mockProductsQuantity; index++){
                mockProducts.push(generateMockingProducts())
            }

            res.render('mockproducts', {payload:mockProducts})
        } catch (error) {
              console.error(error); 
             res.status(500).send({error: error, payload:'mocks Fail'})
        }
    }
//
    async getRealTimeProducts (req,res){
        try {
            let result= await productsService.getRealtimeProducts();
            return result
        } catch (error) {
           res.status(500).send(`se sufre este ${error}`) 
        }
    }
}

//

   
export const productController = new ProductController;