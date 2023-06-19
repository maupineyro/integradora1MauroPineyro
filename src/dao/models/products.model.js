import mongoose from "mongoose";

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
        type: Number,
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

const productModel = mongoose.model('product', ProductSchema);

export default productModel;


