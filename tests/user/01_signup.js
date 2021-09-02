/* eslint-disable no-undef */
const request = require('supertest');
const should = require('chai').should();
const faker = require('faker');
const slugify = require('slugify');
const app = require('../../app');
const { User } = require('../../models/user');
const { createVerificationToken } = require('../../lib/misc');
const { createUser } = require('../helpers');

describe('Signup', () => {
  let user;
  let token;
  const verificationCode = createVerificationToken();
  const name = faker.name.findName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  const userData = {
    name,
    email,
    password,
    confirmedPassword: password,
    verificationCode,
  };

  before(async () => {
    ({ user, token: userToken } = await createUser(userData));
  });

  it('POST /signup Should return missing parameters', async () => {
    const body = {
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    };
    const res = await request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send(body)
      .expect(400);
    res.body.message.should.equal('Missing parameters');
  });

  it('POST /signup Should successfully register new user', async () => {
    const password2 = faker.internet.password();
    const body2 = {
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      password: password2,
      confirmedPassword: password2,
    };
    const res = await request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send(JSON.stringify(body2))
      .expect(200);
    res.body.message.should.equal('Successfully signed up');
    should.not.exist(res.body.results);
    const res2 = await User.findOne({ email: body2.email });
    res2.email.should.equal(body2.email);
    res2.slugName.should.equal(slugify(body2.name, { lower: true }));
  });

  it('POST /signup Should not allowed to sign up user with same email', async () => {
    const res = await request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send(JSON.stringify(userData))
      .expect(406);
    res.body.message.should.equal('This email address is already registered');
  });

  it('POST /signup Should not allowed to sign up user with invalid email', async () => {
    const body = {
      name: faker.name.findName(), email: 'invalid', password: 'pass1234', confirmedPassword: 'pass1234', verificationCode,
    };
    const res = await request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send(JSON.stringify(body))
      .expect(400);
    res.body.message.should.equal('Please fill a valid email address');
  });

  it('POST /signup Should successfully register auth with pib', async () => {
    const password3 = faker.internet.password();
    const body3 = {
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      pib: faker.commerce.department(),
      password: password3,
      confirmedPassword: password3,
    };
    const res = await request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send(JSON.stringify(body3))
      .expect(200);

    res.body.message.should.equal('Successfully signed up');
    should.not.exist(res.body.results);
  });

  it('POST /signup Should return error if password is not confirmed', async () => {
    const body = {
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      pib: faker.commerce.department(),
      password: faker.internet.password(),
      confirmedPassword: faker.internet.password(),
    };
    const res = await request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send(JSON.stringify(body))
      .expect(400);
    res.body.message.should.equal('Password and confirmed password are not matching');
  });

  it('POST /signup Should return error if password is shorter than 6 character', async () => {
    const body4 = {
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      pib: faker.commerce.department(),
      password: '1234',
      confirmedPassword: '1234',
    };
    const res = await request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send(JSON.stringify(body4))
      .expect(400);
    res.body.message.should.equal('Password must have 6 characters');
  });

  it('GET/confirm-email Should successfully confirm email', async () => {
    const res = await request(app)
      .get(`/api/v1/confirm-email/${verificationCode}`)
      .expect(200);
    res.body.message.should.equal('Successfully confirmed email');
    should.not.exist(res.body.results.verificationCode);
    res.body.results.isActive.should.equal(true);
  });

  it('GET/confirm-email Should fail for verificationToken that doesnt exist', async () => {
    const res = await request(app)
      .get(`/api/v1/confirm-email/${faker.lorem.word()}`)
      .expect(404);
    res.body.message.should.equal('User was not found');
  });
});
