
import { productsService } from "../services/factory.js";
import { generateMockingProducts } from "../utils/utils.mocks.js";

class ProductController {
//    
    async add(req, res) {
        try {
        let {dataProductForAdd} = req.body
        let newPr = await productsService.addProducts(dataProductForAdd);
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
    return res.status(200).json({
        status: 'success',
        payload: paginatedProducts.docs,
        totalPages: paginatedProducts.totalPages,
        prevPages: paginatedProducts.prevPage,
        nextPages: paginatedProducts.nextPage,
        page: paginatedProducts.page,
        hasPrevPage: paginatedProducts.hasPrevPage,
        hasNextPage: paginatedProducts.hasNextPage,
        prevLink: paginatedProducts.hasPrevPage? `http://localhost:8080/api/products/?page=${paginatedProducts.prevPage}`: null,

        nextLink: paginatedProducts.hasNextPage? `http://localhost:8080/api/products/?page=${paginatedProducts.nextPage}` : null,
    })
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