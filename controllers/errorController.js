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

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  return new AppError(`Duplicate field value ${value[0]}`, 400);
};

const handleValidatorErrorDB = err => {
  return new AppError(err.message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV.trim() === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(err);
    else if (error.code === 11000) error = handleDuplicateFieldsDB(err);
    else if (error.name === 'ValidationError') error = handleValidatorErrorDB(err);
    sendErrorProd(error, res);
  }
};
