const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stock Management API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  // Point to files where you write JSDoc comments
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
