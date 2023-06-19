import productModel from "../../models/products.model.js"

class ProductManagerMongo {
    //CREATE (addProducts)
    addProducts = async (product) =>{
        const newProductSaveMongo = new productModel(product);
        return newProductSaveMongo.save()
    }

    //READ (getProductById y getProducts)
    getProducts = async () =>{
        try {
            const products = await productModel.find().lean().exec();
            return products;
        } catch (error) {
            console.log(error)
        }
    }

    //UPDATE (updateProductByID)


    //DELETE (deleteProductById)


}

export default ProductManagerMongo