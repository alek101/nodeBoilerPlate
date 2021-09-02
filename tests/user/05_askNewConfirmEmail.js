/* eslint-disable no-undef */
const mongoose = require('mongoose');
const request = require('supertest');
const should = require('chai').should();
const faker = require('faker');
const app = require('../../app');
const { User } = require('../../models/user');
const { createVerificationToken } = require('../../lib/misc');

describe('Ask confirmation email again', () => {
  let user;
  let user2;
  const verificationCode = createVerificationToken();
  before(async () => {
    // clear collections before test
    await mongoose.connection.db.dropDatabase();

    user = await User.create({
      name: faker.name.findName(), email: faker.internet.email(), password: faker.internet.password(), verificationCode,
    });
    user2 = await User.create({
      name: faker.name.findName(), email: faker.internet.email(), password: faker.internet.password(),
    });
  });

  it('POST /confirm-email Should return sucsess', async () => {
    const body = {
      email: user.email,
    };
    const res = await request(app)
      .post('/api/v1/confirm-email/resend')
      .set('Accept', 'application/json')
      .send(body)
      .expect(200);
    res.body.message.should.equal('Succsses');
  });

  it('POST /confirm-email Should return bad request becuse email is wrong', async () => {
    const body = {
      email: faker.internet.email(),
    };
    const res = await request(app)
      .post('/api/v1/confirm-email/resend')
      .set('Accept', 'application/json')
      .send(body)
      .expect(400);
    res.body.message.should.equal('Bad Request');
  });

  it('POST /confirm-email It should fail becuase user is allready verified', async () => {
    const body = {
      email: user2.email,
    };
    const res = await request(app)
      .post('/api/v1/confirm-email/resend')
      .set('Accept', 'application/json')
      .send(body)
      .expect(400);
    res.body.message.should.equal('Bad Request');
  });
});
