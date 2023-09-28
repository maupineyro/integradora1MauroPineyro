import { productController } from "../controllers/products.controller.js"

export async function handleDeleteProductPolicies (req, res, next) {
  
  let productFound = await productController.findProductById(pid);
  if(req.session.user.role == "admin"){
    next ();
  }
  if (req.session.user.role == "premium" && (req.session.user._id == productFound.owner)) {
     next()
  } else {
    return 'no tienes permisos para borrar este producto'
  }
   
//cambiar usando CurrentUser, revisar en general si se puede mejorar
}