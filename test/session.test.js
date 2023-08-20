
import { expect } from 'chai';
import mongoose from 'mongoose';
import supertest from 'supertest';

mongoose.connect('mongodb://localhost:27017/ecommerce');
const requester = supertest('http://localhost:8080')


describe('POST /login', () => {
  it('debería autenticar al usuario y redirigir a /views/products', async () => {
    const response = await requester
      .post('/api/users/login')
      .send({ email: 'yesicachuic@gmail.com', password: '1234' })
      .expect(302); // Redirección

    expect(response.header.location).to.equal('/views/products');
    expect(response.header['set-cookie']).to.be.an('array');
  });

  it('debería rechazar credenciales inválidas y devolver un estado de error', async () => {
    const response = await requester
      .post('/api/users/login')
      .send({ email: 'yesicachuic@gmail.com', password: '12345' })
      .expect(302);

      expect(response.header.location).to.equal('/api/sessions/failLogin');
  });
});