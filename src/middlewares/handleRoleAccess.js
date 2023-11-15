import { productController } from "../controllers/products.controller.js"
import UserService from "../services/dao/db/users.service.js";
import { productsService } from "../services/factory.js";

const userService = new UserService();

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

export async function CartPolicies (req,res,next){
  if (req.session.user.role != "admin"){
    next();
  } else {
    return res.status(403).render('error', {
      error: 'error de autorización: no puedes agregar productos al carrito siendo Admin'})
  }
}

//Admin o Premium policies

export async function adminOrPremiumPolicies(req, res, next) {
  // Obtener el usuario logueado
  const user = await userService.currentUser(req);
  

  // Si el usuario no está autenticado, se redirige al endpoint de inicio de sesión
  if (!user) {
    return res.status(401).send('No autorizado');
  }

  // Si el rol del usuario es "admin", se llama a la siguiente función del middleware
  if (user.role === 'admin') {
    next();
  }

  // Si el rol del usuario es "premium"
  else if (user.role === 'premium') {

    let pid = req.params.pid
    const product = await productsService.findById(pid);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    // Si el producto pertenece al usuario logueado, se llama a la siguiente función del middleware
    if (product.owner === user._id) {
      next();
    } else {
      // Si no es el dueño, pero es admin, se llama a la siguiente función del middleware
      if (user.role === 'admin') {
        next();
      } else {
        return res.status(403).send('No puedes eliminar este producto');
      }
    }
  }

  // Si el rol del usuario no es "admin" ni "premium", se devuelve un error 403
  else {
    return res.status(403).send('No tienes los permisos necesarios');
  }
}
