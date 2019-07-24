/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
  path: './config.env'
});

process.on('uncaughtException', err => {
  console.log('Uncaught Exception... Shutting down...');
  console.error(err);

  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection... Shutting down...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
