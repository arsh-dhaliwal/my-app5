const errorHandler = (err, req, res, next) => {
  // Define a default error message
  const defaultErr = {
    statusCode: 500,
    message: 'Something went wrong, please try again later.'
  };

  // If the error has a specific status code and message, use them; otherwise, use defaults
  const errorResponse = {
    statusCode: err.statusCode || defaultErr.statusCode,
    message: err.message || defaultErr.message
  };

  // Log the error for debugging purposes
  console.error(`[Error]: ${errorResponse.message}`);

  // Send the error response to the client
  res.status(errorResponse.statusCode).json({
    error: true,
    message: errorResponse.message
  });
};

module.exports = errorHandler;