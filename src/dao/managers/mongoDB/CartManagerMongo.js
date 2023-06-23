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
        try {
            const CartByID = await cartModel.findById(id).populate('products.product').exec();
            return CartByID;
        } catch (error) {
            console.log (error);
        }

    }  
    
//add product to cart
    addProductToCart = async (cid,pid) => {
        //ver clase mongo avanzado I
        try {
            const chooseCart = await this.getCartById(cid);
            chooseCart.products.push({product: pid}); 
            console.log(chooseCart)   
            await cartModel.updateOne({_id: cid},chooseCart)   

        } catch (error) {
            console.log(error);
        }
    }    

//update
    updateCartById = async (id, newProps) =>{
        //creo que pertenece a la próxima entrega,investigar
    }

//delete
    deleteCartById = async (id) => {
        //creo que pertenece a la próxima entrega, investigar
    }
}//finaliza la class CartManagerMongo

export default CartManagerMongo