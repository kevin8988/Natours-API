const catchAsync = require('./../utils/CatchAsync');
const reviewDAO = require('./../DAOs/reviewDAO');
const factory = require('./handlerFactory');
const Review = require('./../models/reviewModel');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await reviewDAO.getAllReviews(filter);
  res.status(200).json({ status: 'success', results: reviews.length, data: { reviews } });
});

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createReview = factory.createOne(Review);

exports.deleteReview = factory.deleteOne(Review);

exports.updateReview = factory.updateOne(Review);
