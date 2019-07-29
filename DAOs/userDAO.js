const User = require('./../models/userModel');

exports.createUser = async user => {
  const newUser = await User.create(user);
  return newUser;
};
