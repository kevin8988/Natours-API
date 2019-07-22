const Tour = require('./../models/tourModel');

exports.createTour = async data => {
  const newTour = await Tour.create(data);
  return newTour;
};

exports.getAllTours = async param => {
  //Build the filtering query
  const queryObj = { ...param };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);

  // Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  let query = Tour.find(JSON.parse(queryStr));

  //Sorting
  if (param.sort) {
    const sortBy = param.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

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
