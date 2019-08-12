const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/CatchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1. Get our data from collection
  const tours = await Tour.find();
  // 2. Build template

  // 3. Render that template using de tour data

  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker'
  });
};
