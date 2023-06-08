import {promises as fs} from 'fs';
//import { customAlphabet } from 'nanoid'; // genera ids como uuid4
//const nanoid = customAlphabet ('1234567890abcdef', 10);

class ProductManager {
    constructor (){
        this.path = "./src/saveData/products.json"
    }
    //métodos auxiliares

    readProducts = async ()=>{ //lee el products.json y lo convierte en object
        let readingProducts = await fs.readFile (this.path, "utf-8");
        let readingProductsParsed = await JSON.parse (readingProducts);
        return readingProductsParsed;
    }

    writeProducts = async (product)=>{
        await fs.writeFile (this.path, JSON.stringify(product, null, 2))
    }

    findProductById = async (id) =>{
        let readingProducts = await this.readProducts();
        let productById = await readingProducts.find(prod => prod.id === id);
        return productById;
    }


    //métodos del proyecto
    addProducts = async (product) =>{//agrega al products.json
        let productsAccumulator = await this.readProducts();
        product.id =nanoid(8);
        let totalProducts = [...productsAccumulator, product];
        await this.writeProducts (totalProducts);
        return "Producto Agregado correctamente"
    }   

    getProducts = async ()=>{//devuelve los productos del products.json
        return await this.readProducts();
    }

    getProductById = async (id) =>{
        let readingProducts = await this.readProducts();
        let productById = await this.findProductById (id);
        if (productById){
            return productById;
        } else {
            return "ID de Producto no encontrado";
        }   
    }

    deleteProducts = async (id) =>{
      let readingProductsForDelete = await this.readProducts();
      let productById = await this.findProductById(id);
      let filterProducts = readingProductsForDelete.filter ((products) => products.id !== id);
      if (productById){
        await this.writeProducts (filterProducts);
        return "producto eliminado"
      }  else {
        return "ID de producto no encontrado"
      }
    }

    updateProducts = async (id, product) => {
        let productById = await this.findProductById(id);
        if (!productById) return "ID de Producto no encontrado";
        await this.deleteProducts(id); //borra el producto, pero "revive" dos lineas más abajo
        let productsAccumulator = await this.readProducts(); // no tiene el producto borrado en la linea anterior
        let totalProducts = [...productsAccumulator,{...product, id: id}]; //agrega el producto nuevo por Body pero mantiene el Id, y "concatena" con el array de products
        await this.writeProducts (totalProducts);
        return "producto actualizado";
    }



} //cierra la class ProductManager

export default ProductManager