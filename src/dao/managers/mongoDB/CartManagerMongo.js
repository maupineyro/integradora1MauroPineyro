import cartModel from "../../models/carts.model.js"

class CartManagerMongo{

//create
    addCart = async (cart)=>{
        //const productId = cart.product;// este será el id de producto (pid)
        //const productQuantity = cart.quantity; // cantidad de un mismo product
        //{product: productId, quantity: productQuantity} esto iría dentro del array products revisar
        const newCart = new cartModel({products:[]}) // el cid lo genera mongo
        try {
            const savedCart = await newCart.save();
            return savedCart;
        } catch (error) {
            console.log(error);
        }
    }

//read
    getCarts =async ()=>{
        try {
            const AllCarts = await cartModel.find({});
            return AllCarts;
        } catch (error) {
            console.log(error)
        }
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