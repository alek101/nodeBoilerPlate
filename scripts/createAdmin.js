const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { MONGO_DB } = require('../config/environments');
const { User } = require('../models/user');

mongoose.Promise = global.Promise;

// Add admin auth to the database
const password = bcrypt.hashSync('pass_1234', 10);
const email = 'admin@example.com';
const name = 'admin';
const isActive = true;
const role = 'SuperAdmin';

const admin = new User({
  email,
  name,
  password,
  isActive,
  role,
});

admin
  .save()
  .then(() => {
    console.log('Successfully added admin');
    process.exit();
  })
  .catch((error) => {
    console.log('Error', error);
    process.exit();
  });

// Create the database connection
mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${MONGO_DB}`);
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
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});
