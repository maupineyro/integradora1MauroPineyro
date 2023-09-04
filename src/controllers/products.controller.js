//debe tomar los req y devolver los res, usando el productService.

import { productService } from "../services/products.service.js";

class ProductController {
//    
    async add (req, res) {
        try {
        let newPr = await productService.addProducts(req.body);
        res.status(201).send({newPr}) 
        } catch (error) {
        res.status(500).send(`se sufre este ${error}`)
        }
    }
//
    async getAll(req, res){
    try {
        const limit= parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page)  || 1;
        const sort = parseInt(req.query.sort)  || 1;
        const paginatedProducts = await productService.getProducts(page, limit);
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
        res.status(500).send(`se sufre este ${error}`)
    }
}   
//
    async getProduct (req, res){
        let pid = req.params.pid;
        try {
            const singleProduct = await productService.getProductById(pid);
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
            let deleted = await productService.deleteProductById(pid)
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
            let updated = await productService.updateProductByID(pid,newProps)
            res.status(201).send(`el producto fue actualizado`)     
        } catch (error) {
        res.status(500).send(`se sufre este ${error}`)
        }
    }
}
//
export const productController = new ProductController;