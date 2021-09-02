/**
 * scrip is scheduled to start every day at 00:00 using crontab
 * command to insert in crontab file (crontab -e) is following:
 * 0 0 * * *  NODE_ENV=development /path/to/node /path/to/Projects/PartajmerAPI/scripts/emailReminder.js
 */

const mongoose = require('mongoose');
const path = require('path');
const { User, Job, Review } = require('../models');
const { sendReminderEmail } = require('../lib/sendReminderEmail');

const envPath = path.join(__dirname, `../config/environments/${process.env.NODE_ENV}.env`);
require('dotenv').config({ path: envPath });

mongoose.Promise = global.Promise;

(async function () {
  let db;

  try {
    //  Create the database connection
    db = await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    const users = await User.find().cursor();

    for await (const user of users) {
      if (user.permissionToReviews.length > 0) {
        for (const permission of user.permissionToReviews) {
          const review = await Review.findOne({
            fromUser: user._id,
            toUser: permission.userIdThisUserCanReview,
          }).lean();

          if (!review) {
            const daysPassed = msToDays(Date.now() - new Date(permission.createdAt).getTime());

            if (daysPassed >= 7 && daysPassed < 8) {
              const reviewer = user;
              const userToReview = await User.findOne({ _id: permission.userIdThisUserCanReview }).lean();
              const job = await Job.findOne({ _id: permission.jobId }).lean();

              if (!reviewer || !userToReview || !job) {
                throw new Error('Missing parameters');
              }

              await sendReminderEmail(reviewer, userToReview, job);
            }
          }
        }
      }
    }
  } catch (error) {
    throw error;
  } finally {
    db.disconnect();
  }

  function msToDays(ms) {
    return ms / 1000 / 60 / 60 / 24;
  }
})();

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${process.env.MONGO_DB}`);
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
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
