import mongoose from "mongoose";
import chai from "chai";
import supertest from "supertest";
import dotenv from 'dotenv';
import ProductServiceMongo from "../src/services/dao/db/products.service.js";
import Mocha from "mocha";

dotenv.config();
mongoose.connect(process.env.MONGO || 'mongodb+srv://mauPineyro:mongoClusterMP1Nomehable1@clustermp1.yuubkwb.mongodb.net/CoderBackendEcommerceDB'
)

const expect = chai.expect
const requester = supertest ('http://localhost:8080')

describe ('Products Supertest', () => {
    describe('testing productsDao', () => {
       
        before(function() {
            this.productsDao = new ProductServiceMongo()    
        })

        it('el productDao debe traer los products guardados en mongo y tener la propiedad docs', async function() {
            const result = await this.productsDao.getProducts()
            console.log(result)
            expect(result).to.be.ok
            expect(result).to.have.property('docs')
    
        }).timeout(9000)
        it ('el productDao debe poder crear y guardar un producto en Mongo', async function (){

            const mockingProduct = {
                title: 'product test 1',
                description: 'description test 1',
                thumbnail: 'img test 1',
                category: 'supertest',
                price: 1,
                stock: 1,
                status: true,
                code: 'test1',
                owner: 'admin'
            }
            
            const result = await this.productsDao.addProducts(mockingProduct)
            
            expect(result).to.have.property('_id')
            expect(result).to.be.an('object')
        })
        it('api/products endpoint testing', async function(){
            const response = await requester.get('/api/products')
            expect(response.statusCode).to.be.equal(200)
        })        

    })
})
