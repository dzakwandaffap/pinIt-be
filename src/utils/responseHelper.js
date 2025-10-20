// utils/responseHelper.js

const success = (res, data, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

const error = (res, message = 'Internal Server Error', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

const notFound = (res, message = 'Resource Not Found') => {
  return res.status(404).json({
    success: false,
    message,
  });
};

module.exports = {
  success,
  error,
  notFound,
};
