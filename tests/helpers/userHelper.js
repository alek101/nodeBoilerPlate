const faker = require('faker');
const { User } = require('../../models');
const { issueNewToken } = require('../../lib/jwtHandler');

module.exports.createUser = async ({
  name = faker.name.findName(),
  slugname = undefined,
  pib = undefined,
  profilePicture = faker.image.imageUrl(),
  phone = faker.phone.phoneNumberFormat(),
  description = faker.lorem.sentence(),
  location = faker.address.city(),
  favorites = [],
  email = faker.internet.email().toLowerCase(),
  role = 'User',
  password = faker.internet.password(),
  isActive = true,
  allowNotifications = true,
  ratingsSum = faker.datatype.number(),
  ratingsQuantity = faker.datatype.number(),
  googleId = undefined,
  permissionToReviews = [],
  passwordChangedAt = undefined,
  isDeleted = false,
  notifications = [],
  verificationCode = undefined,
  resetToken = undefined,
  passwordResetExpires = undefined,
  lastTimeLogedIn = new Date('1980-1-1'),
  thisTimeLogedIn = undefined,
} = {}) => {
  const user = await new User({
    name,
    slugname,
    pib,
    profilePicture,
    phone,
    description,
    location,
    favorites,
    email,
    role,
    password,
    isActive,
    allowNotifications,
    ratingsSum,
    ratingsQuantity,
    googleId,
    permissionToReviews,
    passwordChangedAt,
    isDeleted,
    notifications,
    verificationCode,
    resetToken,
    passwordResetExpires,
    lastTimeLogedIn,
    thisTimeLogedIn,
  }).save();
  const token = issueNewToken({ _id: user._id });
  return { user, token };
};

module.exports.createManyUsers = async ({
  number = 1,
  role = 'User',
  isActive = true,
} = {}) => {
  const set = [];
  for (let i = 0; i < number; i += 1) {
    set.push({
      name: faker.name.findName(),
      profilePicture: faker.image.imageUrl(),
      phone: faker.phone.phoneNumberFormat(),
      description: faker.lorem.sentence(),
      location: faker.address.city(),
      favorites: [],
      email: faker.internet.email().toLowerCase(),
      role,
      password: faker.internet.password(),
      isActive,
      allowNotifications: true,
      ratingsSum: faker.datatype.number(),
      ratingsQuantity: faker.datatype.number(),
      permissionToReviews: [],
      isDeleted: false,
      notifications: [],
    });
  }
  return User.insertMany(set);
};
