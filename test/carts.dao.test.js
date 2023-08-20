import mongoose from "mongoose";
import chai from 'chai'
import supertest from 'supertest'
mongoose.connect('mongodb://localhost:27017/ecommerce')
const requester = supertest('http://localhost:8080')
const expect = chai.expect


describe('POST /api/carts', () => {
  let response
  it('debería crear un carrito y devolver un estado de éxito', async () => {
    response = await requester
      .post('/api/carts')
      .expect(200);

    expect(response.body.status).to.equal('success');
    expect(response.body.message).to.equal('Cart Created');
    expect(response.body.payload).to.be.an('object');
    expect(response.body.payload._id).to.be.a('string');
  });

  after(async function () {
    try {
      await requester.delete(`/api/carts/${response.body.payload._id}`)
    } catch (err) { }
  })
});
