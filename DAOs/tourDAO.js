const Tour = require('./../models/tourModel');

exports.createTour = async data => {
  const newTour = await Tour.create(data);
  return newTour;
};

exports.getAllTours = async param => {
  //Build the query
  const queryObj = { ...param };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);
  const query = Tour.find(queryObj);

  //Execute the query
  const tours = await query;
  return tours;
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
