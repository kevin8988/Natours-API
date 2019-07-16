const fs = require('fs');
const express = require('express');

const port = 3000;
const app = express();
app.use(express.json());

/* app.get('/', (req, res) => {
  console.log('Request received');
  res.status(200).json({ message: 'Hey there!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.status(200).send('You can post to this endpoint...');
});
 */

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
