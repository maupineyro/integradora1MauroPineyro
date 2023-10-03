//debe relacionar al controller con la persistencia, usando el model

import cartModel from "../../../dao/mongo/models/carts.model.js";

export default class CartServiceMongo {
//
    addCart = async (cart)=>{
        const newCart = new cartModel({products:[]}) // el cid lo genera mongo
        try {
            const savedCart = await newCart.save();
            return savedCart;
        } catch (error) {
            console.log(error);
        }
    }
//
    getCarts = async ()=>{
        try {
            const AllCarts = await cartModel.find({});
            return AllCarts;
        } catch (error) {
            console.log(error)
        }
    }   
//
    getCartById = async (id) =>{
        try {
            const CartByID = await cartModel.findById(id).populate('products.product').lean();
            return CartByID;
        } catch (error) {
            console.log (error);
        }
    } 
//   
    addProductToCart = async (cid,pid) => {
        try {
            const chooseCart = await this.getCartById(cid);
            const index = chooseCart.products.findIndex(prod => prod.product._id.toString() === pid)
           if (index === -1){ // index -1 si no lo encuentra al pid
                const add = {$push:{products:{product:{_id:pid},quantity:1}}}
                await cartModel.updateOne(chooseCart, add) 
                return "producto agregado"
           } else{// significa que encontró el pid dentro de products
                const filter = { _id: cid, 'products.product': pid };
                const update = { $inc: { 'products.$.quantity': 1 } };
                await cartModel.updateOne(filter, update);
                return "producto agregado"
           }
        }  catch (error) {
            console.log(error);
        }
    } 
//
    deleteSingleProduct = async (cid, pid) =>{
        try {
            const chooseCart = await this.getCartById(cid);
            const index = chooseCart.products.findIndex(prod => prod.product._id.toString() === pid);
            if (index === -1){//no encuentra el pid
                return `no se encuentra el producto ${pid} dentro del carrito ${cid}`
            } else{ //si lo encuentra
                const eraseProduct = {$pull: {products: { product: pid }}}
                await cartModel.updateOne(chooseCart, eraseProduct)
                return `el producto ${pid} ha sido eliminado del carrito ${cid}`
            }
        } catch (error) {
            console.log(error)
        }
    }
//
    deleteAllProductsFromCart = async (cid) => {
        try {
            const chooseCart = await this.getCartById(cid);
            const resetCart = {$set: {products: []}};
            await cartModel.updateOne(chooseCart,resetCart)
            return `el carrito ${cid} fue vaciado`
        } catch (error) {
            console.log(error)
        }
    }

//
    updateCartById = async (cid, products) =>{
        try {
            const chooseCart = await this.getCartById(cid);
            const update = {$set:{products: products}};
            await cartModel.updateOne(chooseCart,update);
            return `el carrito ${cid} fue actualizado`
        } catch (error) {
            console.log(error)
        }
    }

//update quantity, agregando via post un quantity: value, debe actualizarse en el product y cart indicado.
    updateQuantity = async (cid, pid, quantity) =>{
        try {
            const chooseCart = await this.getCartById(cid);
            const index = chooseCart.products.findIndex(prod => prod.product._id.toString() === pid);
            if (index === -1){//no lo encuentra al producto
                return `no se encuentra el producto ${pid} dentro del carrito ${cid}`
            } else {//si lo encuentra
                const filter = { _id: cid, 'products.product': pid };
                const updatedQty = { $set: { 'products.$.quantity': quantity } };
                await cartModel.updateOne(filter, updatedQty);
                return `la cantidad del producto ${pid} dentro del carrito ${cid} ha sido actualizada`
            }
        } catch (error) {
            console.log(error)
        }
    }
}

