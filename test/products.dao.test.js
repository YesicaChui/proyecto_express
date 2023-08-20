import mongoose from "mongoose";
import User from '../src/dao/mongo/user.mongo.dao.js'
import chai from 'chai'
import supertest from 'supertest'
mongoose.connect('mongodb://localhost:27017/ecommerce')
const requester = supertest('http://localhost:8080')
const expect = chai.expect

/* describe('CHAI Testing GET method of User DAO', () => {
    before(async function() {
        try {
            await mongoose.connection.collections.users.drop()
        } catch(err) {}
        this.userDao = new User()
    })
    it('El array que devuelve El GET debe estar vacío', async function() {
        const result = await this.userDao.getAll()
        expect(result).to.be.deep.equal([])
    })
    after(async function() {
        try {
            await mongoose.connection.collections.users.drop()
        } catch(err) {}
    })
}) */

describe('Test de Productos',()=>{
    it('En el endpoint GET /products nos debe traer todos los productos', async () => {
        const response = await requester.get('/products');
        expect(response.body).to.be.an('object'); 

        expect(response.body).to.have.property('status', 'success'); 
        expect(response.body).to.have.property('payload'); 
        expect(response.body.payload).to.be.an('array'); 
        expect(response.body).to.have.property('totalPages'); 
    });
})
