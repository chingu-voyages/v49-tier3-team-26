const express = require("express");

const healthRouter = express.Router();

const {
  returnHealthStatus,
} = require("../routes/health.controller");
healthRouter.get('/health', returnHealthStatus);

module.exports = healthRouter;
