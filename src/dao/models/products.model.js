import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";


const ProductSchema = new mongoose.Schema({ //acá tengo que poner el esquema de datos del objeto producto
    title:{
        type: String, 
        required: true,
    },
    description:{
        type: String,
         required: true,
    },
    code:{
        type: String,
        required: true,
        unique: true,
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
    },
    stock:{
        type: Number,
        required: true,
    },
    thumbnail:{
        type: String,
    }
}) 

ProductSchema.plugin(paginate);

const productModel = mongoose.model('product', ProductSchema);

export default productModel;


