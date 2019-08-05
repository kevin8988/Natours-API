const tourDAO = require('./../DAOs/tourDAO');
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/CatchAsync');
const AppError = require('./../utils/AppError');
const factory = require('./handlerFactory');

exports.getAllTours = catchAsync(async (req, res, next) => {
  const tours = await tourDAO.getAllTours(req.query);
  res.status(200).json({ status: 'success', results: tours.length, data: { tours } });
});

exports.createTour = factory.createOne(Tour);

exports.getTour = factory.getOne(Tour, { path: 'reviews' });

exports.deleteTour = factory.deleteOne(Tour);

exports.updateTour = factory.updateOne(Tour);

exports.getTourStats = catchAsync(async (req, res, next) => {
  const status = await tourDAO.tourStats();
  res.status(200).json({ status: 'success', data: { status } });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await tourDAO.getMonthlyPlan(year);
  res.status(200).json({ status: 'success', data: { plan } });
});

exports.aliasTopTour = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
