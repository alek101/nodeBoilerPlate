const express = require('express');
const AuthController = require('./authController');
const { catchAsyncError } = require('../../lib/functionErrorHandler');
const { permissionAccess } = require('../../middlewares/permissionAccess');

const router = express.Router();

router
  .post('/signup', catchAsyncError(AuthController.signUp))
  .post('/signin', catchAsyncError(AuthController.signIn))
  .post('/google-auth', catchAsyncError(AuthController.googleAuth))
  .get('/confirm-email/:verificationToken', catchAsyncError(AuthController.confirmEmail))
  .post('/forgot-password', catchAsyncError(AuthController.forgotPassword))
  .post('/reset-password/:resetToken', catchAsyncError(AuthController.resetPassword))
  .post('/change-password', permissionAccess(), catchAsyncError(AuthController.changePassword))
  .post('/refresh-token', catchAsyncError(AuthController.refreshToken))
  .post('/confirm-email/resend', catchAsyncError(AuthController.resendVerificationCode));

module.exports = router;
