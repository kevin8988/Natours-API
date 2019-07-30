const jwt = require('jsonwebtoken');
const userDAO = require('./../DAOs/userDAO');
const catchAsync = require('./../utils/CatchAsync');
const AppError = require('./../utils/AppError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await userDAO.createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = signToken(newUser._id);

  res.status(201).json({ status: 'success', token, data: { user: newUser } });
});

exports.login = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;

  // 1. Verify if has a password and email
  if (!password || !email) return next(new AppError('Please provide email and password', 400));

  const user = await userDAO.getUserByEmail(email);

  // 2. Verify if has a valid email and password
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email/password', 401));
  }

  // 3. Generate the token and send to client
  const token = signToken(user._id);

  res.status(200).json({ status: 'success', token });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1. Getting token and check it's there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. Verify the token
  if (!token) {
    return next(new AppError('You are not logged in!', 401));
  }

  // 3. Check if users still exists

  // 4. Check if user changed password after the token was issued

  next();
});
