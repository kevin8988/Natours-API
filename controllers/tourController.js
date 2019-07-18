const tourDAO = require('./../DAOs/tourDAO');

exports.getAllTours = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not defined yet' });
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await tourDAO.createTour(req.body);
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'Invalid data sent!' });
  }
};
exports.getTour = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not defined yet' });
};
exports.deleteTour = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not defined yet' });
};
exports.updateTour = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not defined yet' });
};
