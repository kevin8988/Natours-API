const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/CatchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.query.name) filter = { name: new RegExp(req.query.name, 'i') };

  // 1. Get our data from collection
  const tours = await Tour.find(filter);
  // 2. Build template

  // 3. Render that template using de tour data

  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const { tourSlug } = req.params;

  const tour = await Tour.findOne({ slug: tourSlug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render('login');
});
