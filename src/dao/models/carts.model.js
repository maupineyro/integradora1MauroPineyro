import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema ({
    //el id de carrito lo genera mongo
    products:{
        type: [
            {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
              }
            }
          ]  
        }
});

const cartModel = mongoose.model ('cart',cartsSchema);

export default cartModel;

// {
//  "products": [
//    {
//      "product": "6490b9fa6d4469bf83beb3bc",
//      "quantity": 2
//    }
//  ]
// }