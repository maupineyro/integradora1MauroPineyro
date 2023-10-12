import productModel from "./models/products.model.js";

export default class ProductServiceMongo {
//    
    addProducts = async (newPr) =>{
        if (!newPr.code || !newPr.title || !newPr.description || !newPr.price || !newPr.thumbnail || !newPr.stock || !newPr.category) {
                throw new Error('Campos vacíos, completar todos los campos');
            }
        let existingProduct = await productModel.findOne({ code: newPr.code });
        if (existingProduct) {
            throw new Error('El código del producto ya existe en la base de datos');
        }   
        const newProduct = new productModel(newPr).save();
        return newProduct
    };
//
    getProducts = async (page, limit, sort) =>{
        try {
            
            const options = {
                page: page || 1,
                limit: limit || 10,
                sort: sort || null, // Ordenar si se proporciona un campo de ordenamiento
            };
            const paginatedProducts = await productModel.paginate({},options);
            return paginatedProducts;
        } catch (error) {
            throw error
        };
    };
//
    getRealtimeProducts = async() => {
        try {
            const AllProducts = await productModel.find().lean().exec();
            return AllProducts;
            
        } catch (error) {
            console.log(error)
        }
    }
//
    getProductById = async (id) =>{
        try {
            const ProductById = await productModel.findById(id).lean();
            return ProductById;
        } catch (error) {
            console.log(error)
        }
    }
//
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
//
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
};
//
