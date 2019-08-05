const catchAsync = require('./../utils/CatchAsync');
const reviewDAO = require('./../DAOs/reviewDAO');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await reviewDAO.getAllReviews(filter);
  res.status(200).json({ status: 'success', results: reviews.length, data: { reviews } });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await reviewDAO.createReview(req.body);
  res.status(201).json({ status: 'success', data: { review: newReview } });
});
