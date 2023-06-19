import productModel from "../../models/products.model.js"

class ProductManagerMongo {
    //CREATE (addProducts)
    addProducts = async (newPr) =>{
        const newProductSaveMongo = new productModel(newPr).save();
        return newProductSaveMongo
    }

    //READ (getProductById y getProducts)
    getProducts = async () =>{
        try {
            const AllProducts = await productModel.find().lean().exec();
            return AllProducts;
        } catch (error) {
            console.log(error)
        }
    }

    //UPDATE (updateProductByID)


    //DELETE (deleteProductById)


}

export default ProductManagerMongo