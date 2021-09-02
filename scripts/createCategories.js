const mongoose = require('mongoose');
const { Category } = require('../models');

const environments = require('../config/environments');

mongoose.Promise = global.Promise;

// Create the database connection
mongoose.connect(environments.MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${environments.MONGO_DB}`);
});

// CONNECTION EVENTS
// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// When the connection is open
mongoose.connection.on('open', () => {
  console.log('Mongoose default connection is open');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});

// NODE_ENV=development node ./scripts/createCategories.js
// --drop (Drop old locations collection if exists)
(async () => {
  // add categories
  await Category.insertMany([
    { name: 'Kućni servisi', isTopCategories: true },
    { name: 'Privatni časovi', isTopCategories: true },
    { name: 'IT i dizajn', isTopCategories: true },
    { name: 'Fizički poslovi' },
    { name: 'Dostava' },
    { name: 'Trgovina i prodaja' },
    { name: 'Ugostiteljstvo' },
    { name: 'Online poslovi' },
    { name: 'Rad na terenu' },
    { name: 'Čuvanje i nega' },
    { name: 'Fitnes' },
    { name: 'Volontiranje' },
    { name: 'Ostalo' },
  ]);

  // close connection
  console.log('Successfully added categories');
  await mongoose.connection.close();
})();
