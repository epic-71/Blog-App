import AppError from "../utils/appError.js";

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.code === 11000) err = handleDuplicateField(err);
  if (err.name === "ValidationError") err = handleValidationError(err);
  if (err.name === "CastError") err = handleCastError(err);

  // Operational Error
  if (err.isOperational) {
    console.log(err);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programing Error or other unknown error
  } else {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Somthing went vary wrong!",
    });
  }
};

//! Error Handlers

const handleDuplicateField = (err) => {
  const message = err.keyValue.email
    ? "This user already exists."
    : `Duplicate field value`;

  return new AppError(message, 409);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors)
    .map((el) => el.message)
    .join(". ");

  const message = `Invalid input data. ${errors}`;
  return new AppError(message, 400);
};

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
