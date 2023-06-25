import productModel from "../../models/products.model.js"
import mongoose from "mongoose";

class ProductManagerMongo {
    //CREATE (addProducts)
    addProducts = async (newPr) =>{
        const newProductSaveMongo = new productModel(newPr).save();
        return newProductSaveMongo
    };

    //READ (getProductById, getRealtimeProducts y getProducts)
    getProducts = async (page,limit) =>{
        try {
            //const AllProducts = await productModel.find().lean().exec();
            //return AllProducts;
            const paginatedProducts = await productModel.paginate({},{limit: limit || 10, page: page || 1});
            return paginatedProducts;
        } catch (error) {
            console.log(error)
        };
    };

    getRealtimeProducts = async() => {
        try {
            const AllProducts = await productModel.find().lean().exec();
            return AllProducts;
            
        } catch (error) {
            console.log(error)
        }
    }

    getProductById = async (id) =>{
        try {
            const ProductById = await productModel.findById(id).exec();
            return ProductById;
        } catch (error) {
            console.log(error)
        }
    }

    //UPDATE (updateProductByID)
    updateProductByID = async (id, newProps) =>{
       
        try {
            const FindProductById = await productModel.findById(id);
            if (!FindProductById) return "id de producto no encontrado";
            const updatedProduct = await productModel.findByIdAndUpdate(id, newProps, {new:true, runValidators:true}).exec();
            return updatedProduct;
        } catch (error) {
            console.log(error)
        }
    }

    //DELETE (deleteProductById)
    deleteProductById = async(id) =>{
        try {
            const FindProductById = await productModel.findById(id);
            if (!FindProductById) return "id de producto no encontrado"
            const deleteProduct = await FindProductById.deleteOne();
            console.log(`el producto ${FindProductById} fue eliminado`);            
        } catch (error) {
            console.log(error)
        }
    }

}

export default ProductManagerMongo