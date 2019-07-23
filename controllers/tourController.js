const tourDAO = require('./../DAOs/tourDAO');
const catchAsync = require('./../utils/CatchAsync');

exports.aliasTopTour = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  const tours = await tourDAO.getAllTours(req.query);
  res.status(200).json({ status: 'success', results: tours.length, data: { tours } });
});

exports.createTour = catchAsync(async (req, res) => {
  const newTour = await tourDAO.createTour(req.body);
  res.status(201).json({ status: 'success', data: { tour: newTour } });
});

exports.getTour = catchAsync(async (req, res) => {
  const tour = await tourDAO.getTour(req.params.id);
  res.status(200).json({ status: 'success', data: { tour } });
});

exports.deleteTour = catchAsync(async (req, res) => {
  await tourDAO.deleteTour(req.params.id);
  res.status(204).json({ status: 'success', data: null });
});

exports.updateTour = catchAsync(async (req, res) => {
  const tour = await tourDAO.updateTour(req.params.id, req.body);
  res.status(200).json({ status: 'success', data: { tour } });
});

exports.getTourStats = catchAsync(async (req, res) => {
  const status = await tourDAO.tourStats();
  res.status(200).json({ status: 'success', data: { status } });
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
  const year = req.params.year * 1;
  const plan = await tourDAO.getMonthlyPlan(year);
  res.status(200).json({ status: 'success', data: { plan } });
});
