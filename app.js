const express = require('express');
const morgan = require('morgan');

const userRouter = require(`${__dirname}/routes/userRoutes`);
const tourRouter = require(`${__dirname}/routes/tourRoutes`);

const app = express();

//1. Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//2. Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
