const express = require("express");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Error handler (should be last)
app.use(errorHandler);

// Start server after DB connects
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully");
    app.listen(3000, () => console.log("🚀 Server running on port 3000"));
  })
  .catch((err) => console.error(`❌ Connection error: ${err}`));
