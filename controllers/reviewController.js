const catchAsync = require('./../utils/CatchAsync');
const reviewDAO = require('./../DAOs/reviewDAO');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await reviewDAO.getAllReviews();
  res.status(200).json({ status: 'success', results: reviews.length, data: { reviews } });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const data = Object.assign({ user: req.user.id }, { review: req.body.review, rating: req.body.rating, tour: req.body.tour });
  const review = await reviewDAO.createReview(data);
  res.status(201).json({ status: 'success', data: { review } });
});
