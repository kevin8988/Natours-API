const express = require('express');
const morgan = require('morgan');

const userRouter = require(`${__dirname}/routes/userRoutes`);
const tourRouter = require(`${__dirname}/routes/tourRoutes`);

const port = 3000;
const app = express();

//1. Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//4. Start server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
