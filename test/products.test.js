import ProductServiceMongo from "../src/services/dao/db/products.service.js";
import mongoose from "mongoose";
import Assert from "assert"
import config from "../src/config/config.js";


mongoose.connect(config.mongoUrl)

describe('testing productService (Mongo)', () => {
    before(function () {
        this.productsDao = new ProductServiceMongo
    })

    //test 1
    it('el productDao debe traer los products en formato array guardados en mongo', async () => {
        const result = await this.productsDao.getProducts();

    })

    //test 2
    it()

    //test 3
    it()
})