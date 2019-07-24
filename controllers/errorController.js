const AppError = require('./../utils/AppError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({ status: err.status, error: err, message: err.message, stack: err.stack });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({ status: err.status, message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Something went very wrong!' });
  }
};

const handleCastErrorDB = err => {
  return new AppError(`${err.value} is an invalid ${err.path}`, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV.trim() === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(err);
    sendErrorProd(error, res);
  }
};
