import productModel from "../../models/products.model.js"

class ProductManagerMongo {
    //CREATE (addProducts)
    addProducts = async (product) =>{
        const newProduct = new productModel(product);
        return newProduct.save()
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