const { ValidationError } = require('sequelize');

function errorLog(error, req, res, next) {
  console.error('> Error Message:', error);
  next(error);
}

function errorHandler(error, req, res) {
  const statusCode = 500;
  res.status(statusCode).json({
    statusCode,
    message: error.message,
    stack: error.stack,
  });
}

function errorBoomHandler(error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  }
  next(error);
}

function errorOrmHandler(error, req, res, next) {
  if (error instanceof ValidationError) {
    const statusCode = 409;
    res.status(statusCode).json({
      statusCode,
      message: error.message,
      stack: error.errors,
    })
  }
  next(error);
}

module.exports = {
  errorLog,
  errorHandler,
  errorBoomHandler,
  errorOrmHandler
};
