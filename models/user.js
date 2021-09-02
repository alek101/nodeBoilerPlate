const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const slugify = require('slugify');
const { emailRegExp } = require('../lib/misc');
const { NODE_ENV } = require('../config/environments');

const { Schema } = mongoose;
const roles = ['SuperAdmin', 'User'];

const UserSchema = new Schema(
  {
    googleId: { type: String },
    name: { type: String, trim: true, required: true },
    slugName: { type: String, trim: true },
    phone: {
      type: String,
      match: [
        /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\\./0-9]*$/g,
        'Please fill a valid phone number',
      ],
    },
    description: { type: String },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailRegExp, 'Invalid email'],
      required: [true, 'Please enter an email address'],
    },
    role: { type: String, enums: roles, default: 'User' },
    password: { type: String, required: true, select: false },
    isActive: { type: Boolean, default: true },
    allowNotifications: { type: Boolean, default: true },
    profilePicture: {
      type: String,
    },
    passwordChangedAt: { type: Date },
    resetToken: String,
    passwordResetExpires: { type: Date },
    verificationCode: {
      type: String,
    },
    lastTimeLogedIn: {
      type: Date,
      default: new Date('1989-1-1'),
    },
    thisTimeLogedIn: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  this.slugName = slugify(this.name, { lower: true });
  if (NODE_ENV === 'development') this.isActive = true;
  next();
});
// eslint-disable-next-line func-names
UserSchema.pre(/update/i, function (next) {
  if (this._update.name) {
    this._update.slugName = slugify(this._update.name, { lower: true });
  }
  next();
});
module.exports = {
  User: mongoose.model('User', UserSchema),
};
