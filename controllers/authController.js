const userDAO = require('./../DAOs/userDAO');
const catchAsync = require('./../utils/CatchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await userDAO.createUser(req.body);
  res.status(201).json({ status: 'success', data: { user: newUser } });
});
