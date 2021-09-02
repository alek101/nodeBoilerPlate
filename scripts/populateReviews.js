const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const { User, Review, Job } = require('../models');

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

// NODE_ENV=development node ./scripts/populateReviews.js
(async () => {
  // add reviews
  const users = await User.distinct('_id', { isDeleted: false });
  const jobs = await Job.distinct('_id', { creator: { $in: users }, isDeleted: false });

  const reviews = [];
  for (let i = 1; i < users.length; i += 1) {
    reviews.push({
      fromUser: users[i],
      toUser: users[0],
      job: jobs[Math.floor(Math.random() * jobs.length)],
      comment: faker.lorem.sentences(),
      rating: Math.floor(Math.random() * 5) + 1,
    });
  }
  await Review.insertMany(reviews);

  // close connection
  console.log('Successfully added reviews');
  await mongoose.connection.close();
})();
