const mongoose = require('mongoose');
const { ReportReason } = require('../models');

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

// NODE_ENV=development node ./scripts/createReportReasons.js
// --drop (Drop old locations collection if exists)
(async () => {
  // add report reasons
  await ReportReason.insertMany([
    { reportReason: 'Lažna objava' },
    { reportReason: 'Zastareli sadržaj' },
    { reportReason: 'Uvredljiv sadržaj' },
    { reportReason: 'Ostalo' },
  ]);

  // close connection
  console.log('Successfully added report reasons');
  await mongoose.connection.close();
})();
