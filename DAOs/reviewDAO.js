const Review = require('./../models/reviewModel');

exports.createReview = async data => {
  const review = await Review.create(data);
  return review;
};

exports.getAllReviews = async () => {
  const reviews = await Review.find();
  return reviews;
};
