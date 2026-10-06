// middlware functions to handle errors for the whole app

// notFound error | run this when a request doesn't match any route
const notFound = (req, res, next) => {
  // create error message that includes the wrong url they went to
  const error = new Error(`Not found: ${req.orginalUrl}`);

  // set 404 not found error if url incorret
  res.status(404);

  // pass the error
  next(error);
};


// errorHandler - use to catch every error 
const errorHandler = (err, req, res, next) => {

  // if route already set 404 , if not 200 or 500
  let statusCode = res.statusCode !=200 ? res.statusCode : 500;

  let message = err.message;

  // if someone uses an invalid ID then not found 404
  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'resource not found';
  }


// validationerror - missing required field or data

if (err.name === 'ValidationError') {
  statusCode = 400;
  message = Object.values(err.errors)
    .map((e) => e.message)
    .join(', ');
}

// if duplicate email or value
if (err.code === 11000) {
  statusCode = 400; 
  const field = Object.keys(err.keyValue)[0];
  message = `That ${field} is already in use`;
}

  // send final error
  res.status(statusCode).json({ message });
}


module.exports = { notFound, errorHandler };