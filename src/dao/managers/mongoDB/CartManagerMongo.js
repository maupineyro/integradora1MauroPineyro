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
            const index = chooseCart.products.findIndex(prod => prod.product._id.toString() === pid)
           if (index === -1){ // index -1 si no lo encuentra al pid
                const add = {$push:{products:{product:{_id:pid},quantity:1}}}
                await cartModel.updateOne(chooseCart, add) 
                return "producto agregado"
           } else{
                 const filter = { _id: cid, 'products.product': pid };
                const update = { $inc: { 'products.$.quantity': 1 } };
                await cartModel.updateOne(filter, update);
                return "producto agregado"
           }
                
           
             
        }  catch (error) {
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