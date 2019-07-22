const tourDAO = require('./../DAOs/tourDAO');

exports.aliasTopTour = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const tours = await tourDAO.getAllTours(req.query);
    res.status(200).json({ status: 'success', results: tours.length, data: { tours } });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await tourDAO.createTour(req.body);
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await tourDAO.getTour(req.params.id);
    res.status(200).json({ status: 'success', data: { tour } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await tourDAO.deleteTour(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await tourDAO.updateTour(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: { tour } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};
