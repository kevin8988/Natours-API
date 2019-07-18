const Tour = require('./../models/tourModel');

exports.createTour = async data => {
  const newTour = await Tour.create(data);
  return newTour;
};

exports.getAllTours = async () => {
  const allTours = await Tour.find();
  return allTours;
};

exports.getTour = async id => {
  const tour = await Tour.findById(id);
  return tour;
};
