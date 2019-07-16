const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;

/* app.get('/', (req, res) => {
  console.log('Request received');
  res.status(200).json({ message: 'Hey there!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.status(200).send('You can post to this endpoint...');
});
 */

const toursDataJSON = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: toursDataJSON.length,
    data: {
      tours: toursDataJSON
    }
  });
});

app.get('/api/v1/tours', (req, res) => {});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
