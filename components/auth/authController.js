const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { User } = require('../../models');
const { issueNewToken } = require('../../lib/jwtHandler');
const { customShortId, createVerificationToken, validateEmail } = require('../../lib/misc');
const error = require('../../middlewares/errorHandling/errorConstants');
const { sendConformationEmail } = require('../../lib/sendConformationEmail');
const { sendForgetPasswordEmail } = require('../../lib/sendForgetPasswordEmail');
const { GOOGLE_CLIENT_ID, HASH_SECRET } = require('../../config/environments');

/**
 * @api {post} /signup Signup User
 * @apiVersion 1.0.0
 * @apiName Signup
 * @apiDescription Create new User
 * @apiGroup Auth
 *
 * @apiParam (body) {String} name Name
 * @apiParam (body) {String} email Email
 * @apiParam (body) {String} password Password
 * @apiParam (body) {String} confirmedPassword Password
 * @apiParam (body) {String} [pib] pib
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
  "message": "Successfully signed up",
    }
 }
 * @apiUse MissingParamsError
 * @apiUse ShortPassword
 * @apiUse ValidEmailError
 * @apiUse DuplicateEmailError
 * @apiUse PasswordsUnmatching
 * @apiUse MailFailed
 */
module.exports.signUp = async (req, res) => {
  const {
    email, password, name, confirmedPassword, pib,
  } = req.body;

  if (!email || !password || !name || !confirmedPassword) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  if (password.length < 6) {
    throw new Error(error.SHORT_PASSWORD);
  }

  if (!validateEmail(email)) {
    throw new Error(error.INVALID_EMAIL);
  }

  const check = await User.findOne({ email });

  if (check) {
    throw new Error(error.DUPLICATE_EMAIL);
  }

  if (password !== confirmedPassword) {
    throw new Error(error.PASSWORD_WONT_MATCH);
  }

  const verificationCode = createVerificationToken();

  // await sendConformationEmail(email, verificationCode, req, name);

  const user = await new User({
    email: email.toLowerCase(),
    name,
    password,
    pib,
    verificationCode,
  }).save();

  user.password = undefined;

  return res.status(200).send({
    message: 'Successfully signed up',
  });
};

/**
 * @api {post} /signin Sign in User
 * @apiVersion 1.0.0
 * @apiName Sign in
 * @apiDescription Sign in User
 * @apiGroup Auth
 *
 * @apiParam (body) {String} email Email
 * @apiParam (body) {String} password Password
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "message": "Successfully signed in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVlY2ExYzRiZGM2MzBmMzdiNTMzYzMiLCJpYXQiOjE2MjYyNjM1NDksImV4cCI6MTYyNjMwNjc0OX0.B6tta7coiDKRQ0KJESdjJc7x6cUNf5oDfBD4Zaz60FE",
    "results": {
        "role": "User",
        "isActive": true,
        "isDeleted": false,
        "allowNotifications": true,
        "favorites": [],
        "ratingsSum": 0,
        "ratingsQuantity": 0,
        "_id": "60eeca1c4bdc630f37b533c3",
        "email": "test@gmail.com",
        "name": "test",
        "verificationCode": "eWClh8gZh1rK8A3f0SgqsNjWUlGQAKn",
        "permissionToReviews": [],
        "createdAt": "2021-07-14T11:27:24.159Z",
        "updatedAt": "2021-07-14T11:27:24.159Z",
        "__v": 0,
    }
 }
 * @apiUse MissingParamsError
 * @apiUse ValidEmailError
 * @apiUse UserNotFound
 * @apiUse Forbidden
 * @apiUse CredentialsError
 */
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  if (!validateEmail(email)) {
    throw new Error(error.INVALID_EMAIL);
  }

  let user = await User.findOneAndUpdate({ email: email.toLowerCase(), isActive: true }, { $set: { isDeleted: false } }).select('+password').lean();

  if (!user) {
    throw new Error(error.USER_NOT_FOUND);
  }

  if (!user.isActive) {
    throw new Error(error.FORBIDDEN);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error(error.CREDENTIALS_ERROR);
  }

  if (user.thisTimeLogedIn) {
    const lastTimeLogedIn = user.thisTimeLogedIn;
    const thisTimeLogedIn = Date.now();
    user = await User.findOneAndUpdate({ _id: user._id }, { $set: { lastTimeLogedIn, thisTimeLogedIn } }, { new: true }).lean();
  } else {
    const thisTimeLogedIn = Date.now();
    user = await User.findOneAndUpdate({ _id: user._id }, { $set: { thisTimeLogedIn } }, { new: true }).lean();
  }

  user.password = undefined;

  return res.status(200).send({
    message: 'Successfully signed in',
    token: issueNewToken({
      _id: user._id,
    }),
    results: user,
  });
};

/**
 * @api {post} /google-auth Sign in with Google Auth
 * @apiVersion 1.0.0
 * @apiName Sign-in-with-Google-Auth
 * @apiGroup Auth
 * @apiDescription ## Allowed roles:
 * - SuperAdmin
 * - User
 *
 * @apiParam (body) {String} idToken ID token
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
  "message": "Successfully signed in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVkN2RkYjY4NWE5MDRhNGI0NTgwNGUiLCJpYXQiOjE2MjYxNzY5ODcsImV4cCI6MTYyNjIyMDE4N30.J45AfO9Vvewl3NeWcSek49fKBVnzafg1-skhsBQBFXc",
  "results": {
    "role": "User",
    "isActive": true,
    "allowNotifications": true,
    "favorites": [],
    "ratingsSum": 0,
    "ratingsQuantity": 0,
    "_id": "60ed7ddb685a904a4b45804e",
    "googleId": "118354505645562085051",
    "name": "Partajmer",
    "email": "partajmer@gmail.com",
    "profilePicture": "https://lh3.googleusercontent.com/a/AATXAJwg6o2WZrvuv4M5nVmHuaie2VzgJQsIfAI-fpaq=s96-c",
    "password": "$2b$10$3eZmmuZNv7HJRrt8KXXXfuhJjcwe5bkmvRHXgNYAF6DJ3ymw0974i",
    "permissionToReviews": [],
    "createdAt": "2021-07-13T11:49:47.732Z",
    "updatedAt": "2021-07-13T11:49:47.732Z",
    "__v": 0
  }
}
 * @apiUse MissingParamsError
 * @apiUse UserNotFound
 */
module.exports.googleAuth = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) throw new Error(error.MISSING_PARAMETERS);

  const client = new OAuth2Client();
  const googleUser = await client.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  });
  if (!googleUser) throw new Error(error.USER_NOT_FOUND);

  let results = await User.findOneAndUpdate({
    $or: [{ googleId: googleUser.payload.sub }, { email: googleUser.payload.email }],
  }, { name: googleUser.payload.name, $set: { isDeleted: false } }, { new: true }).lean();

  if (!results) {
    results = await new User({
      googleId: googleUser.payload.sub,
      name: googleUser.payload.name,
      email: googleUser.payload.email,
      profilePicture: googleUser.payload.picture,
      password: createVerificationToken(), // to generate Fake password
      isActive: true,
    }).save();
  }

  if (results.thisTimeLogedIn) {
    const lastTimeLogedIn = results.thisTimeLogedIn;
    const thisTimeLogedIn = Date.now();
    results = await User.findOneAndUpdate({ _id: results._id }, { $set: { lastTimeLogedIn, thisTimeLogedIn } }, { new: true }).lean();
  } else {
    const thisTimeLogedIn = Date.now();
    results = await User.findOneAndUpdate({ _id: results._id }, { $set: { thisTimeLogedIn } }, { new: true }).lean();
  }

  return res.status(200).send({
    message: 'Successfully signed in',
    token: issueNewToken({
      _id: results._id,
    }),
    results,
  });
};

/**
 * @api {post} /forgot-password Forgot password
 * @apiVersion 1.0.0
 * @apiName forgotPassword
 * @apiDescription Sends an email with the token to reset the password
 * @apiGroup Auth
 *
 * @apiParam (body) {String} email Email
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "message": "Successfully generated reset token"
 }
 * @apiUse MissingParamsError
 * @apiUse ValidEmailError
 * @apiUse UserNotFound
 * @apiUse MailFailed
 */
module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  if (!validateEmail(email)) {
    throw new Error(error.INVALID_EMAIL);
  }

  const resetToken = customShortId();
  const user = await User.findOne({ email: email.toLowerCase(), isActive: true }).lean();

  if (!user) {
    throw new Error(error.USER_NOT_FOUND);
  }
  if (user.googleId) {
    throw new Error(error.USER_NOT_FOUND);
  }

  const hashedResetToken = crypto.createHash('sha256', HASH_SECRET).update(resetToken).digest('hex');

  await Promise.all([User.updateOne({ email }, { $set: { resetToken: hashedResetToken, passwordResetExpires: Date.now() + 1000 * 15 * 60 } }), sendForgetPasswordEmail(email, resetToken, req)]);

  return res.status(200).send({
    message: 'Successfully generated reset token',
  });
};

/**
 * @api {post} /reset-password/:resetToken Reset password
 * @apiVersion 1.0.0
 * @apiName resetPassword
 * @apiDescription Resets the password if the token is valid
 * @apiGroup Auth
 *
 * @apiParam (body) {String} password New password
 * @apiParam {String} resetToken ResetToken
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "message": "Password updated",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVlY2ExYzRiZGM2MzBmMzdiNTMzYzMiLCJpYXQiOjE2MjYyNjQ2MzEsImV4cCI6MTYyNjMwNzgzMX0.1M_jnOVI5hKdht8TjBipeapC_0FseE4w_d5U9TEOqGE",
    "results": {
        "_id": "60eeca1c4bdc630f37b533c3",
        "role": "User",
        "isActive": true,
        "isDeleted": false,
        "allowNotifications": true,
        "favorites": [],
        "ratingsSum": 0,
        "ratingsQuantity": 0,
        "email": "test@gmail.com",
        "name": "test",
        "verificationCode": "eWClh8gZh1rK8A3f0SgqsNjWUlGQAKn",
        "permissionToReviews": [],
        "createdAt": "2021-07-14T11:27:24.159Z",
        "updatedAt": "2021-07-14T12:10:17.906Z"
    }
 }
 * @apiUse MissingParamsError
 * @apiUse ShortPassword
 * @apiUse UserNotFound
 */
module.exports.resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  if (!password || !resetToken) {
    throw new Error(error.MISSING_PARAMETERS);
  }
  if (password.length < 6) {
    throw new Error(error.SHORT_PASSWORD);
  }

  const hashedResetToken = crypto.createHash('sha256', HASH_SECRET).update(resetToken).digest('hex');
  let user = await User.findOne({ resetToken: hashedResetToken, passwordResetExpires: { $gt: Date.now() } }).lean();

  if (!user) {
    throw new Error(error.USER_NOT_FOUND);
  }

  const newPassword = bcrypt.hashSync(password, 10);

  const now = new Date();

  if (user.thisTimeLogedIn) {
    const lastTimeLogedIn = user.thisTimeLogedIn;
    user = await User.findOneAndUpdate(
      {
        resetToken: hashedResetToken,
        passwordResetExpires: { $gt: Date.now() },
      },
      {
        $set: {
          password: newPassword, passwordChangedAt: now, lastTimeLogedIn, thisTimeLogedIn: now, isDeleted: false,
        },
        $unset: { resetToken: '', passwordResetExpires: '' },
      },
      { new: true },
    ).lean();
  } else {
    user = await User.findOneAndUpdate(
      {
        resetToken: hashedResetToken,
        passwordResetExpires: { $gt: Date.now() },
      },
      {
        $set: {
          password: newPassword, passwordChangedAt: now, thisTimeLogedIn: now, isDeleted: false,
        },
        $unset: { resetToken: '', passwordResetExpires: '' },
      },
      { new: true },
    ).lean();
  }

  user.resetToken = undefined;

  return res.status(200).send({
    message: 'Password updated',
    token: issueNewToken({
      _id: user._id,
    }),
    results: user,
  });
};

/**
 * @api {post} /change-password Change password
 * @apiVersion 1.0.0
 * @apiName changePassword
 * @apiDescription Changing password for logged in auth
 * @apiGroup Auth
 *
 * @apiParam (body) {String} oldPassword User's old password
 * @apiParam (body) {String} newPassword User's new password to set to
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "message": "Password successfully updated",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVlY2ExYzRiZGM2MzBmMzdiNTMzYzMiLCJpYXQiOjE2MjYyNjQ2MzEsImV4cCI6MTYyNjMwNzgzMX0.1M_jnOVI5hKdht8TjBipeapC_0FseE4w_d5U9TEOqGE",
 }
 * @apiUse MissingParamsError
 * @apiUse ShortPassword
 * @apiUse NotFound
 */
module.exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { _id } = req.user;

  if (!oldPassword || !newPassword) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  if (newPassword.length < 6) {
    throw new Error(error.SHORT_PASSWORD);
  }

  const user = await User.findOne({ _id }, { password: 1 }).lean();

  if (user.googleId) {
    throw new Error(error.CREDENTIALS_ERROR);
  }

  if (!bcrypt.compareSync(oldPassword, user.password)) {
    throw new Error(error.CREDENTIALS_ERROR);
  }

  const now = new Date();

  const password = bcrypt.hashSync(newPassword, 10);
  await User.updateOne({ _id }, { $set: { password, passwordChangedAt: now } });

  return res.status(200).send({
    message: 'Password successfully updated',
    token: issueNewToken({
      _id: user._id,
    }),
  });
};

/**
 * @api {post} /refresh-token Refresh token
 * @apiVersion 1.0.0
 * @apiName refreshToken
 * @apiDescription ## Allowed roles:
 * - SuperAdmin
 * - User
 * @apiGroup Auth
 *
 * @apiParam (body) {String} token User expired token
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "message": "Successfully refreshed token",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWFlNzAwMGJmZDgyNzNhYjI3ZDVmYTki",
   "results": { ... }
 }
 * @apiUse MissingParamsError
 * @apiUse InvalidValue
 * @apiUse UserNotFound
 */
module.exports.refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) throw new Error(error.MISSING_PARAMETERS);

  const decoded = await jwt.decode(token, process.env.JWT_SECRET);

  if (!decoded) throw new Error(error.INVALID_VALUE);

  const user = await User.findOneAndUpdate(
    { _id: decoded._id },
    { $set: { lastActivity: new Date() } },
    { new: true },
  ).lean();

  if (!user) throw new Error(error.USER_NOT_FOUND);

  return res.status(200).send({
    message: 'Successfully refreshed token',
    token: issueNewToken({ _id: user._id }),
    results: user,
  });
};

/**
 * @api {get} /confirm-email/:verificationToken Confirm email
 * @apiVersion 1.0.0
 * @apiName Confirm Email
 * @apiDescription ## Allowed roles:
 * - SuperAdmin
 * - User
 * @apiGroup Auth
 * @apiParam {string} verificationToken verificationToken
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "message": "Successfully confirmed email",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVlY2ExYzRiZGM2MzBmMzdiNTMzYzMiLCJpYXQiOjE2MjYyNjQ5NTgsImV4cCI6MTYyNjMwODE1OH0.Rt2FnBS7l-mmji9zwCY9J5OpeKD0DmGCbfsh9inJ6Do",
    "results": {
        "_id": "60eeca1c4bdc630f37b533c3",
        "role": "User",
        "isActive": true,
        "isDeleted": false,
        "allowNotifications": true,
        "favorites": [],
        "ratingsSum": 0,
        "ratingsQuantity": 0,
        "email": "test@gmail.com",
        "name": "test",
        "permissionToReviews": [],
        "createdAt": "2021-07-14T11:27:24.159Z",
        "updatedAt": "2021-07-14T12:10:31.404Z",
        "__v": 0
    }
 }
 * @apiUse MissingParamsError
 * @apiUse UserNotFound
 */
module.exports.confirmEmail = async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) throw new Error(error.MISSING_PARAMETERS);

  let user = await User.findOneAndUpdate(
    { verificationCode: verificationToken },
    { $set: { isActive: true }, $unset: { verificationCode: '' } },
  ).lean();

  if (!user) throw new Error(error.USER_NOT_FOUND);

  if (user.thisTimeLogedIn) {
    const lastTimeLogedIn = user.thisTimeLogedIn;
    const thisTimeLogedIn = Date.now();
    user = await User.findOneAndUpdate({ _id: user._id }, { $set: { lastTimeLogedIn, thisTimeLogedIn, isDeleted: false } }, { new: true }).lean();
  } else {
    const thisTimeLogedIn = Date.now();
    user = await User.findOneAndUpdate({ _id: user._id }, { $set: { thisTimeLogedIn, isDeleted: false } }, { new: true }).lean();
  }

  user.verificationCode = undefined;

  return res.status(200).send({
    message: 'Successfully confirmed email',
    token: issueNewToken({ _id: user._id }),
    results: user,
  });
};

/**
 * @api {post} /confirm-email/resend Ask new confirm email
 * @apiVersion 1.0.0
 * @apiName Ask new confirm email
 * @apiDescription Resend already generated activation code
 * @apiGroup User
 * @apiParam (body) {string} email email
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
    "message": "Succsses"
 }
 * @apiUse MissingParamsError
 * @apiUse ValidEmailError
 * @apiUse BadRequest
 * @apiUse MailFailed
 */
module.exports.resendVerificationCode = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  if (!validateEmail(email)) {
    throw new Error(error.INVALID_EMAIL);
  }

  const user = await User.findOne({ email, verificationCode: { $exists: true } }).lean();

  if (!user) {
    throw new Error(error.BAD_REQUEST);
  }

  await sendConformationEmail(email, user.verificationCode, req, user.name);

  return res.status(200).send({
    message: 'Succsses',
  });
};
