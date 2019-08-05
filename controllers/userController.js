const catchAsync = require('./../utils/CatchAsync');
const AppError = require('./../utils/AppError');
const factory = require('./handlerFactory');
const User = require('./../models/userModel');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password update', 400));
  }

  const filteredBody = filterObj(req.body, 'name', 'email');

  // 2. Update user document
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    runValidators: true,
    new: true
  });

  res.status(200).json({ status: 'success', data: { user } });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({ status: 'success', data: null });
});

exports.createUser = catchAsync(async (req, res, next) => {
  next(new AppError('Please use sign up to create user', 400));
});

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.deleteUser = factory.deleteOne(User);
// Do not update password with this!
exports.updateUser = factory.updateOne(User);
