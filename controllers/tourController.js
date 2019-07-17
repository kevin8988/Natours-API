const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));

exports.checkID = (req, res, next, value) => {
  const id = value * 1;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  const body = req.body;
  console.log(body);
  if (!body.name) {
    return res.status(404).json({ status: 'fail', message: 'Name property missing' });
  } else if (!body.price) {
    return res.status(404).json({ status: 'fail', message: 'Price property missing' });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'success',
    data: { tour }
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign(
    {
      id: newId
    },
    req.body
  );
  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    if (err) console.log(err);
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  });
};

exports.updateTour = (req, res) => {
  res.status(200).send({ status: 'success', data: { tour: 'Updated tour...' } });
};

exports.deleteTour = (req, res) => {
  res.status(204).send({ status: 'success', data: null });
};
