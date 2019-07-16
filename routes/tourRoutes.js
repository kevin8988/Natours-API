const fs = require('fs');
const express = require('express');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'));

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;

  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: { tour }
  });
};

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  const tour = tours.find(el => el.id === id);

  res.status(200).send({ status: 'success', data: { tour: 'Updated tour...' } });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  const tour = tours.find(el => el.id === id);

  res.status(204).send({ status: 'success', data: null });
};

const router = express.Router();

router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
