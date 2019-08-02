const Tour = require('./../models/tourModel');
const ApiFeatures = require('./../utils/ApiFeatures');

exports.createTour = async data => {
  const newTour = await Tour.create(data);
  return newTour;
};

exports.getAllTours = async query => {
  const feature = new ApiFeatures(Tour.find(), query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await feature.query;
  return tours;
};

exports.getTour = async id => {
  const tour = await Tour.findById(id).populate('reviews');
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

exports.tourStats = async () => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        num: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: -1 }
    }
  ]);
  return stats;
};

exports.getMonthlyPlan = async year => {
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: {
        numTourStarts: -1
      }
    }
  ]);

  return plan;
};
