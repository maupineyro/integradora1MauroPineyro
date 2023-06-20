import cartModel from "../../models/carts.model.js"

class CartManagerMongo{

//create
    addCart = async (cart)=>{
        const productId = cart.product;// este será el id de producto (pid)
        const productQuantity = cart.quantity; // cantidad de un mismo product
        const newCart = new cartModel({products:[{product: productId, quantity: productQuantity}]}) // el cid lo genera mongo
        try {
            const savedCart = await newCart.save();
            return savedCart;
        } catch (error) {
            console.log(error);
        }
    }

//read
    getCarts =async ()=>{

    }   

    getCartById = async (id) =>{

    }   

//update
    updateCartById = async (id, newProps) =>{

    }

//delete
    deleteCartById = async (id) => {

    }
}//finaliza la class CartManagerMongo

export default CartManagerMongo