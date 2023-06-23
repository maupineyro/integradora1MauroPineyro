import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema ({
    //el id de carrito lo genera mongo
    products:{
        type: [
            {// estas llaves es el objeto de un producto,que tiene que tener su product id y la cantidad.
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
              },
              quantity: Number
            }// cierra al objeto de producto
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