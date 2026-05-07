const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../docs/swagger");
const { notFoundHandler, errorHandler } = require("./middlewares/errors");

const app = express();

// Enable CORS and logging
app.use(cors());
app.use(morgan("dev"));
// Security headers
app.use(helmet());
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve API docs at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import routes
const routes = require("./routes");
app.use("/api", routes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "ok" });
});

// not found handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

module.exports = app;
