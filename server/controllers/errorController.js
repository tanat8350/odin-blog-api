module.exports = (error, req, res, next) => {
  // mongoose no error code, so return 500
  // but has error message like
  // "Cast to ObjectId failed for value "668fcfe4c460bfcd02c029d71" (type string) at path "_id" for model "Comment""
  error.statusCode = error.statusCode || 500;
  error.status = error.statusCode || "error";
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
};
