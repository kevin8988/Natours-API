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

exports.updateTour = async (id, data) => {
  const updatedTour = await Tour.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  return updatedTour;
};

exports.deleteTour = async id => {
  const deletedTour = await Tour.findByIdAndDelete(id);
  return deletedTour;
};
