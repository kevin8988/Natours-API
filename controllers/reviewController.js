const catchAsync = require('./../utils/CatchAsync');
const reviewDAO = require('./../DAOs/reviewDAO');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await reviewDAO.getAllReviews();
  res.status(200).json({ status: 'success', results: reviews.length, data: { reviews } });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const review = await reviewDAO.createReview(req.body);
  res.status(201).json({ status: 'success', data: { review } });
});
