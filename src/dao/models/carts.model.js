import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema ({
    products:[
        {
            product: String,
            quantity: Number,
        }
    ]
});

const cartModel = mongoose.model ('cart',cartsSchema);

export default cartModel;