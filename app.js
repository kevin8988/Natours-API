const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log('Request received');
  res.status(200).json({ message: 'Hey there!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.status(200).send('You can post to this endpoint...');
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
