const jwt = require('jsonwebtoken');
const userDAO = require('./../DAOs/userDAO');
const catchAsync = require('./../utils/CatchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await userDAO.createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(201).json({ status: 'success', token, data: { user: newUser } });
});
