// esta ruta debe mostrar todos los productos al momento en http://localhost:8080/home

import {Router} from 'express';
import ProductManagerMongo from '../dao/managers/mongoDB/ProductManagerMongo.js';

const homeRouter = Router();
const productManager = new ProductManagerMongo;

//get
homeRouter.get ('/', async (req, res) =>{
    const {page, limit} = req.query;
try {
    const dataProducts = await productManager.getProducts(page, limit); //este trae la data docs y tmb la data de paginate
    //console.log(dataProducts)
    
     let  products = dataProducts.docs.map((item) => {
    return { title: item.title, _id: item._id, price: item.price, description: item.description};
  });

    //console.log (products);

    //desestructuro dataProducts
    const { docs, ...rest } = dataProducts;
    let links = [];

    for (let i = 1; i < rest.totalPages + 1; i++) {
    links.push({ label: i, href: 'http://localhost:8080/home/?page=' + i });
  }

  //render
    res.render ('home', { 
        documentTitle: "Ecommerce - Home",
         products: products, 
         pagination: rest, links
    })
} catch (error) {
    console.log(error);
}   
})

export default homeRouter 
