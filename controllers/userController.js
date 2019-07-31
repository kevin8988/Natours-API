const catchAsync = require('./../utils/CatchAsync');
const userDAO = require('./../DAOs/userDAO');
const AppError = require('./../utils/AppError');

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
  const user = await userDAO.updateMe(req.user.id, filteredBody);

  res.status(200).json({ status: 'success', data: { user } });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userDAO.getUsers(req.query);
  res.status(200).json({ status: 'success', results: users.length, data: { users } });
});

exports.createUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not defined yet' });
};
exports.getUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not defined yet' });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not defined yet' });
};
exports.updateUser = catchAsync(async (req, res, next) => {
  res.status(500).json({ status: 'error', message: 'This route is not defined yet' });
});
