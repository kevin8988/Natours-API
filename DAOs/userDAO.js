const User = require('./../models/userModel');
const ApiFeatures = require('./../utils/ApiFeatures');

exports.createUser = async user => {
  const newUser = await User.create(user);
  return newUser;
};

exports.getUserByEmail = async email => {
  const user = await User.findOne({ email }).select('+password');
  return user;
};

exports.getUsers = async query => {
  const feature = new ApiFeatures(User.find(), query)
    .filter()
    .limitFields()
    .sort()
    .paginate();
  const users = await feature.query;
  return users;
};

exports.getUser = async id => {
  const user = await User.findById(id);
  return user;
};

exports.getUserByResetToken = async token => {
  const user = await User.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } });
  return user;
};

exports.updateMe = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true
  });
  return user;
};
