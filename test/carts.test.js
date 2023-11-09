import mongoose from "mongoose";
import chai from "chai";
import supertest from "supertest";
import dotenv from 'dotenv';

import CartServiceMongo from "../src/services/dao/db/carts.service.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI)

const expect = chai.expect
const requester = supertest ('http://localhost:8080')

describe ('Carts Supertest',()=>{
    describe('testing cartsDao', function() {
        before(function() {
          
            this.cartsDao = new CartServiceMongo();
        })
        //test 1
        it('el cartsDao debe crear un cart vacio', async function() {
        
            const result =  await this.cartsDao.addCart()

            expect(result).to.be.an('object')
            expect(result).to.have.property('_id')
            expect(result).to.have.property('products').that.is.an('array').that.is.empty;
            
        }).timeout(8000);
        //test 2
        it('api/carts endpoint testing: debe traer todos los carritos', async function(){
            const result = await this.cartsDao.getCarts()
            expect(result).to.be.ok
            expect(result).to.be.an('array')
        })

        //test 3
        it('api/carts/cid endpoint testing: debe traer un carrito', async function(){
            const testId = '6491f68f8c7e6e12ce3bf3a2'
            const resCart = await requester.get(`/api/carts/${testId}`)
            console.log(resCart)
            expect(resCart.statusCode).to.equal(200)
            //expect(response).to.have.property('products')
        })  
    })
})
