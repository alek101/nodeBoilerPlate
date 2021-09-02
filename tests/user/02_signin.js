/* eslint-disable no-undef */
const request = require('supertest');
const should = require('chai').should();
const faker = require('faker');
const { expect } = require('chai');
const app = require('../../app');
const { createUser } = require('../helpers/userHelper');
const { generatePib } = require('../../lib/misc');
const { User } = require('../../models/user');

describe('Signin', () => {
  let user;
  let userToken;
  let user2;
  let userToken2;
  let companyToken;
  const pibLength = 9;
  const definedPassword = faker.internet.password();

  before(async () => {
    // generate locations
    [{ user, token: userToken }, { user: user2, token: userToken2 }, { token: companyToken }] = await Promise.all([createUser({ password: definedPassword }), createUser({ password: definedPassword, isActive: false }), createUser({ pib: generatePib(pibLength) }) ]);
  });

  it('POST /signin Should return as logged in', async () => {
    const body = {
      email: user.email,
      password: definedPassword,
    };
    const res = await request(app)
      .post('/api/v1/signin')
      .set('Accept', 'application/json')
      .send(body)
      .expect(200);
    res.body.message.should.equal('Successfully signed in');
    expect(res.body.token).not.equal(undefined);
    expect(res.body.results.email).to.equal(body.email);
  });

  it('POST /signin Should return error for unregistered user', async () => {
    const body = {
      email: user2.email,
      password: definedPassword,
    };
    const res = await request(app)
      .post('/api/v1/signin')
      .set('Accept', 'application/json')
      .send(body)
      .expect(404);
    res.body.message.should.equal('User was not found');
  });

  it('POST /signin Should change when it was last time logged in', async () => {
    const body = {
      email: user.email,
      password: definedPassword,
    };
    const res = await request(app)
      .post('/api/v1/signin')
      .set('Accept', 'application/json')
      .send(body)
      .expect(200);
    res.body.message.should.equal('Successfully signed in');
    const userRes = await User.find({ email: body.email }).lean();
    expect(userRes.lastTimeLogedIn).not.equals(new Date('1980-1-1'));
  });

  it('POST /signin Should return missing parameters', async () => {
    const body = {
      email: faker.internet.email(),
    };
    const res = await request(app)
      .post('/api/v1/signin')
      .set('Accept', 'application/json')
      .send(body)
      .expect(400);

    res.body.message.should.equal('Missing parameters');
  });

  it('POST /signin Should return wrong credentials', async () => {
    const body = {
      email: user.email,
      password: faker.internet.password(),
    };
    const res = await request(app)
      .post('/api/v1/signin')
      .set('Accept', 'application/json')
      .send(body)
      .expect(401);
    res.body.message.should.equal('Wrong credentials');
  });

  it('POST /signin Should return not found', async () => {
    const body = {
      email: faker.internet.email(),
      password: definedPassword,
    };
    const res = await request(app)
      .post('/api/v1/signin')
      .set('Accept', 'application/json')
      .send(body)
      .expect(404);
    res.body.message.should.equal('User was not found');
  });

  it('POST /signin Should return user not found', async () => {
    const body = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const res = await request(app)
      .post('/api/v1/signin')
      .set('Accept', 'application/json')
      .send(body)
      .expect(404);
    res.body.message.should.equal('User was not found');
  });

  it('POST /signin Should return missing parameters', async () => {
    const body = {
      email: undefined,
      password: undefined,
    };
    const res = await request(app)
      .post('/api/v1/signin')
      .set('Accept', 'application/json')
      .send(body)
      .expect(400);
    res.body.message.should.equal('Missing parameters');
  });
});
