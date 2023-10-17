import mongoose from "mongoose";
import chai from "chai";
import supertest from "supertest";
import ProductServiceMongo from "../src/services/dao/db/products.service.js";


mongoose.connect('mongodb+srv://mauPineyro:mongoClusterMP1Nomehable1@clustermp1.yuubkwb.mongodb.net/CoderBackendEcommerceDB'
)

const expect = chai.expect
const requester = supertest ('http://localhost:8080')

describe ('Products Supertest', ()=>{
    describe('testing productsDao - Mongo', () => {
        before(function() {
            this.productsDao = new ProductServiceMongo();
        });
        it('el productDao debe traer los products en formato array guardados en mongo', async () => {
            const result = await this.productsDao.getProducts()
            expect(result).to.have.property("docs")
        }).timeout(8000)
        })
    }
    
)