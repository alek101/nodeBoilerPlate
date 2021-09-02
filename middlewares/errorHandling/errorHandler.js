const { logError } = require('../../lib/misc');
const errorMessage = require('./errorConstants');
const environments = require('../../config/environments');

module.exports = () => (err, req, res, next) => {
  const error = {};
  // console.log('error', err);

  switch (err.message) {
    case errorMessage.AUTHORIZATION_TOKEN:
      error.message = 'No authorization token was found';
      error.status = 401;
      error.errorCode = 1;
      break;
    case errorMessage.MISSING_PARAMETERS:
      error.message = 'Missing parameters';
      error.status = 400;
      error.errorCode = 2;
      break;
    case errorMessage.NOT_ACCEPTABLE:
      error.status = 406;
      error.message = 'Not acceptable';
      error.errorCode = 3;
      break;
    case errorMessage.NOT_FOUND:
      error.status = 404;
      error.message = 'Not Found';
      error.errorCode = 4;
      break;
    case errorMessage.FORBIDDEN:
      error.status = 403;
      error.message = 'Insufficient privileges';
      error.errorCode = 5;
      break;
    case errorMessage.INVALID_VALUE:
      error.status = 400;
      error.message = 'Value is not valid';
      error.errorCode = 6;
      break;
    case errorMessage.BAD_REQUEST:
      error.status = 400;
      error.message = 'Bad Request';
      error.errorCode = 7;
      break;
    case errorMessage.CREDENTIALS_ERROR:
      error.status = 401;
      error.message = 'Wrong credentials';
      error.errorCode = 8;
      break;
    case errorMessage.INVALID_EMAIL:
      error.status = 400;
      error.message = 'Please fill a valid email address';
      error.errorCode = 9;
      break;
    case errorMessage.DUPLICATE_EMAIL:
      error.status = 406;
      error.message = 'This email address is already registered';
      error.errorCode = 10;
      break;
    case errorMessage.FILE_UPLOAD_ERROR:
      error.status = 400;
      error.message = 'Something went wrong during file upload';
      error.errorCode = 11;
      break;
    case errorMessage.UNAUTHORIZED_ERROR:
      error.status = 401;
      error.message = 'Invalid credentials';
      error.errorCode = 12;
      break;
    case errorMessage.PASSWORD_WONT_MATCH:
      error.status = 400;
      error.message = 'Password and confirmed password are not matching';
      error.errorCode = 13;
      break;
    case errorMessage.SHORT_PASSWORD:
      error.status = 400;
      error.message = 'Password must have 6 characters';
      error.errorCode = 14;
      break;
    case errorMessage.OWN_JOB_TRY_FAV:
      error.status = 400;
      error.message = 'You cant add own job/service as favourite';
      error.errorCode = 15;
      break;
    case errorMessage.JWT_MALFORMED:
      error.message = 'jwt malformed';
      error.status = 401;
      error.errorCode = 16;
      break;
    case errorMessage.REPORT_RESON_UNKNOWN:
      error.status = 400;
      error.message = 'Report reason isnt in db';
      error.errorCode = 17;
      break;
    case errorMessage.NOT_VALID_MONGO_ID:
      error.status = 400;
      error.message = 'Not valid id';
      error.errorCode = 18;
      break;
    case errorMessage.PARAM_MUST_BE_STRING:
      error.status = 400;
      error.message = 'Parametar must be string';
      error.errorCode = 19;
      break;
    case errorMessage.NO_PERMISSION_TO_REVIEW:
      error.status = 403;
      error.message = 'You do not have permission to review';
      error.errorCode = 20;
      break;
    case errorMessage.LOCATION_UNKNOWN:
      error.status = 400;
      error.message = 'Location isnt in db';
      error.errorCode = 21;
      break;
    case errorMessage.DUPLICATE_ENTRY:
      error.status = 400;
      error.message = 'Duplicate Entry';
      error.errorCode = 22;
      break;
    case errorMessage.DUPLICATE_REPORT:
      error.status = 403;
      error.message = 'Allready Reported';
      error.errorCode = 23;
      break;
    case errorMessage.MAIL_WAS_NOT_SENT:
      error.status = 400;
      error.message = 'Mail was not sent';
      error.errorCode = 24;
      break;
    case errorMessage.JWT_INVALID_SIGNATURE:
      error.status = 401;
      error.message = 'Invalid access token signature';
      error.errorCode = 25;
      break;
    case errorMessage.JWT_EXPIRED:
      error.status = 401;
      error.message = 'Access token expired';
      error.errorCode = 26;
      break;
    case errorMessage.JOB_NOT_FOUND:
      error.status = 404;
      error.message = 'Job was not found';
      error.errorCode = 27;
      break;
    case errorMessage.USER_NOT_FOUND:
      error.status = 404;
      error.message = 'User was not found';
      error.errorCode = 28;
      break;
    case errorMessage.USER_DELETED:
      error.status = 404;
      error.message = 'User was deleted';
      error.errorCode = 29;
      break;
    case errorMessage.USER_UNACTIVE:
      error.status = 403;
      error.message = 'User is not active';
      error.errorCode = 30;
      break;
    case errorMessage.CATEGORY_NOT_FOUND:
      error.status = 404;
      error.message = 'Category was not found';
      error.errorCode = 31;
      break;
    case errorMessage.CONVERSATION_NOT_FOUND:
      error.status = 404;
      error.message = 'Conversation was not found';
      error.errorCode = 32;
      break;
    case errorMessage.MESSAGE_NOT_FOUND:
      error.status = 404;
      error.message = 'Message was not found';
      error.errorCode = 33;
      break;
    case errorMessage.REVIEW_NOT_FOUND:
      error.status = 404;
      error.message = 'Review was not found';
      error.errorCode = 34;
      break;
    default:
      error.status = 500;
      error.message = 'Oops, an error occurred';
      error.errorCode = 0;
  }

  // handle error names
  if (err.name === 'CastError') {
    error.status = 400;
    error.message = 'Not valid id';
    error.errorCode = 18;
  }

  if (error.status === 500) {
    logError(req, err);
    // eslint-disable-next-line no-console
    console.log(err);
  }

  if (environments.NODE_ENV === 'development') {
    error.stack = err.stack;
  }

  return res.status(error.status).send(error);
};
