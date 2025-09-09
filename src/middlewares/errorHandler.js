const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  if (err.code === 11000) {
    return res.status(400).json({ message: "Duplicate field value" });
  }

  res.status(500).json({
    message: err.message || "Internal Server Error",
    error: err,
  });
};

module.exports = errorHandler;
