const errorHandler = (err, req, res, next) => {
  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${
      err.message
    }`
  );
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 400;
  res.status(statusCode).json({
    success: false,
    error: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = errorHandler;
