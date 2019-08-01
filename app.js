const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const AppError = require('./utils/AppError');

const globalErrorHandler = require('./controllers/errorController');

const app = express();

//1. Middlewares

//Security http header
app.use(helmet());
//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests for same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!'
});

app.use('/api', limiter);

//Body parser
app.use(express.json({ limit: '10kb' }));
//Serving static files
app.use(express.static(`${__dirname}/public`));

//2. Routes
app.use(limiter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
