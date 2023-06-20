import productModel from "../../models/products.model.js"

class ProductManagerMongo {
    //CREATE (addProducts)
    addProducts = async (newPr) =>{
        const newProductSaveMongo = new productModel(newPr).save();
        return newProductSaveMongo
    };

    //READ (getProductById y getProducts)
    getProducts = async () =>{
        try {
            const AllProducts = await productModel.find().lean().exec();
            return AllProducts;
        } catch (error) {
            console.log(error)
        };
    };

    getProductById = async (id) =>{
        try {
            const ProductById = await productModel.findById(id).exec();
            return ProductById;
        } catch (error) {
            console.log(error)
        }
    }

    //UPDATE (updateProductByID)


    //DELETE (deleteProductById)
    deleteProductById = async(id) =>{
        try {
            const FindProductById = await productModel.findById(id);
            if (!FindProductById) return
            const deleteProductById = await FindProductById.deleteOne();
            console.log(`el producto ${FindProductById} fue eliminado`)
            

            
        } catch (error) {
            console.log(error)
        }
    }

}

export default ProductManagerMongo