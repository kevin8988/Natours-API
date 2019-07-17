exports.checkID = (req, res, next, value) => {
  const id = value * 1;
  if (id >= tours.length) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({ status: 'fail', message: 'Name property missing' });
  } else if (!body.price) {
    return res.status(400).json({ status: 'fail', message: 'Price property missing' });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not defined yet' });
};
exports.createTour = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not defined yet' });
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
