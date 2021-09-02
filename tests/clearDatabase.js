/* eslint-disable no-undef */
const mongoose = require('mongoose');

before(async () => {
  mongoose.connection.on('open', () => {
    mongoose.connection.db.dropDatabase(() => {
    });
  });
});

after(async () => {
  mongoose.connection.db.dropDatabase(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB collections dropped');
    mongoose.disconnect();
  });
});
