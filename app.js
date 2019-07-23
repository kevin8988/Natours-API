const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const AppError = require('./utils/AppError');

const globalErrorHandler = require('./controllers/errorController');

const app = express();

//1. Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//2. Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
