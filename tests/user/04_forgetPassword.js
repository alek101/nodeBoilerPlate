/* eslint-disable no-undef */
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const request = require('supertest');
const should = require('chai').should();
const expect = require('chai');
const faker = require('faker');
const app = require('../../app');
const { User } = require('../../models/user');
const { createVerificationToken } = require('../../lib/misc');
const { createUser } = require('../helpers');
const { HASH_SECRET } = require('../../config/environments');
const { customShortId } = require('../../lib/misc');

describe('Forget password', () => {
  let user;
  let token;
  let user2;
  let user3;
  let user4;
  let userToken;
  let userToken2;
  let UserToken3;
  let userToken4;
  const verificationCode = createVerificationToken();
  const name = faker.name.findName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const resetToken = customShortId();
  const resetToken2 = customShortId();

  const userData = {
    name,
    email,
    password,
    confirmedPassword: password,
    verificationCode,
  };

  before(async () => {
    const hashedResetToken = crypto.createHash('sha256', HASH_SECRET).update(resetToken).digest('hex');
    const hashedResetToken2 = crypto.createHash('sha256', HASH_SECRET).update(resetToken2).digest('hex');
    [{ user, token: userToken }, { user: user2, token: userToken2 }, { user: user3, token: userToken3 }, { user: user4, token: userToken4 }] = await Promise.all([
      createUser(userData),
      createUser({ resetToken: hashedResetToken, passwordResetExpires: Date.now() + 1000 * 15 * 60 }),
      createUser({ resetToken: hashedResetToken2, passwordResetExpires: Date.now() - 1000 * 15 * 60 }),
      createUser({ isActive: false }),

    ]);
  });

  it('POST /forgot-password Should add request of new password', async () => {
    const body = {
      email: user.email,
    };

    const res = await request(app)
      .post('/api/v1/forgot-password')
      .set('Accept', 'application/json')
      .send(body)
      .expect(200);
    res.body.message.should.equal('Successfully generated reset token');
    const selectedUser = await User.findOne({ _id: user.id }).select('resetToken');
    (selectedUser.resetToken).should.not.equal(undefined);
  });

  it('POST /forgot-password Should return error as user isnt active', async () => {
    const body = {
      email: user4.email,
    };

    const res = await request(app)
      .post('/api/v1/forgot-password')
      .set('Accept', 'application/json')
      .send(body)
      .expect(404);
    res.body.message.should.equal('User was not found');
  });

  it('POST /forgot-password Should return error', async () => {
    const body = {
    };
    const res = await request(app)
      .post('/api/v1/forgot-password')
      .set('Accept', 'application/json')
      .send(body)
      .expect(400);
    res.body.message.should.equal('Missing parameters');
  });

  it('POST /reset-password/:resetToken Should fail becuase new password isnt added', async () => {
    const body = {
    };
    const res = await request(app)
      .post(`/api/v1/reset-password/${resetToken}`)
      .set('Accept', 'application/json')
      .send(body)
      .expect(400);
    res.body.message.should.equal('Missing parameters');
  });

  it('POST /reset-password/:resetToken Should reset password', async () => {
    const password2 = faker.internet.password();
    const body = {
      password: password2,
    };
    const res = await request(app)
      .post(`/api/v1/reset-password/${resetToken}`)
      .set('Accept', 'application/json')
      .send(body)
      .expect(200);
    res.body.message.should.equal('Password updated');
    res.body.token.should.not.equal(token);
    const u = await User.findById(user2._id).select('+password').lean();
    (u.passwordChangedAt).should.not.equal(user.passwordChangedAt);
    bcrypt.compareSync(password2, u.password).should.equal(true);
  });

  it('POST /reset-password/:resetToken Should fail to reset password as token expired', async () => {
    const password3 = faker.internet.password();
    const body = {
      password: password3,
    };
    const res = await request(app)
      .post(`/api/v1/reset-password/${resetToken2}`)
      .set('Accept', 'application/json')
      .send(body)
      .expect(404);
    res.body.message.should.equal('User was not found');
  });
});
