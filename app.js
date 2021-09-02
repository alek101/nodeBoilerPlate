const cors = require('cors');
const express = require('express');
const compression = require('compression');
const expressJwt = require('express-jwt');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const lusca = require('lusca');
const path = require('path');
const ErrorHandler = require('./middlewares/errorHandling/errorHandler');
const mongoDB = require('./config/database/connection');
const environments = require('./config/environments');
const { name } = require('./package.json');

const port = environments.PORT;
const appURL = `http://localhost:${port}/api/v1/`;
mongoose.Promise = global.Promise;

const app = express();

// Application Routes
const AuthRoutes = require('./components/auth/authRouter');


app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(mongoSanitize());

app.disable('x-powered-by');

// Security
app.use(lusca.xframe('ALLOWALL'));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

// Whitelisted routes
app.use(
  expressJwt({
    secret: environments.JWT_SECRET,
    algorithms: environments.JWT_ALGORITHMS,
  }).unless({
    path: [
      '/api/v1/signin',
      '/api/v1/signup',
      '/api/v1/forgot-password',
      { url: /\/api\/v1\/categories\/?$/, methods: ['GET'] },
      '/api/v1/google-auth',
      '/api/v1/confirm-email/resend',
      /\/api\/v1\/reset-password\/\w*/,
      /\api\/v1\/confirm-email\/\w*/,
      /\/apidoc.+/,
      /\/api\/v1\/users\/\w{8,24}/,
      { url: '/api/v1/jobs', methods: ['GET'] },
      { url: /\/api\/v1\/jobs\/\w*\/?$/, methods: ['GET'] },
      { url: '/api/v1/sse-server', methods: ['GET'] },
      { url: /\/api\/v1\/locations\/?$/, methods: ['GET'] },
      { url: /\/api\/v1\/reviews\/?$/, methods: ['GET'] },
    ],
  }),
);

// Create the database connection
mongoose.connect(mongoDB.connectionString(), {
  // this one isn't compatible with useUnifideToplogy
  // reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true,
  useCreateIndex: true,
  // so it will remove deprication warrning
  useFindAndModify: false,
  // so it will remove warrning
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  console.log(
    `Mongoose default connection open to ${mongoDB.connectionString()}`,
  );
});

// CONNECTION EVENTS
// If the connection throws an error
mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  // eslint-disable-next-line no-console
  console.log('Mongoose default connection disconnected');
});

// When the connection is open
mongoose.connection.on('open', () => {
  // eslint-disable-next-line no-console
  console.log('Mongoose default connection is open');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    // eslint-disable-next-line no-console
    console.log(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});

app.use('/api/v1', AuthRoutes);

if (environments.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  require('./scripts/createDocs');
  app.use('/apidoc', express.static(path.join(__dirname, './doc')));
}

app.use(ErrorHandler());

// show env vars
// eslint-disable-next-line no-console
console.log(`__________ ${name} __________`);
// eslint-disable-next-line no-console
console.log(`Starting on port: ${port}`);
// eslint-disable-next-line no-console
console.log(`Env: ${environments.NODE_ENV}`);
// eslint-disable-next-line no-console
console.log(`App url: ${appURL}`);
// eslint-disable-next-line no-console
console.log('______________________________');

app.listen(port);
module.exports = app;
