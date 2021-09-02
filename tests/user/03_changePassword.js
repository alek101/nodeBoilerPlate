/* eslint-disable no-undef */
const request = require('supertest');
const should = require('chai').should();
const { expect } = require('chai');
const faker = require('faker');
const bcrypt = require('bcrypt');
const app = require('../../app');
const { User } = require('../../models/index');
const { issueNewToken } = require('../../lib/jwtHandler');
const { createUser } = require('../helpers/userHelper');

describe('changePassword', () => {
  let token;
  let user;
  const newPassword = faker.internet.password();
  const oldPassword = faker.internet.password();

  // generate users and tokens
  before(async () => {
    ({ user, token } = await createUser({ password: oldPassword }));
  });

  it('POST /change-password Should change user password', async () => {
    const body = {
      oldPassword,
      newPassword,
    };
    const res = await request(app)
      .post('/api/v1/change-password')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(200);
    res.body.message.should.equal('Password successfully updated');
    const selectedUser = await User.findOne({ _id: user.id }).select('+password').lean();
    expect(selectedUser.passwordChangedAt).not.to.equal(user.passwordChangedAt);
    bcrypt.compareSync(newPassword, selectedUser.password).should.equal(true);
    expect(res.body.token).not.equal(undefined);
  });

  it('POST /change-password New password shouldnt be equal the oldPassword ', async () => {
    const body = {
      oldPassword,
      newPassword: oldPassword,
    };
    const res = await request(app)
      .post('/api/v1/change-password')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(401);
    res.body.message.should.equal('Wrong credentials');
  });
});
