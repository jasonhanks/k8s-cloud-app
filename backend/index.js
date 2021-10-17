'use strict'

// const axios = require('axios');
const path = require('path');
const express = require("express");
const logger = require('pino')()

const PORT = process.env.PORT || 5000;

const app = express();

// Request logging here
app.use(require('pino-http')())

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')))


app.get("/test", (req, res) => {
  logger.info("TEST request made")
  res.json({ message: "TEST" })
})


/**
 * Health check used to validate service connection availability. This
 * is used by Kubernetes for Liveness and Readiness checks.
 */
app.get("/health", (req, res) => {
  // Not needed since the Express process is used in production
  // axios.get('http://localhost:3000').then(response => {
  //   res.json({ message: "OK" });
  // })
  // .catch(err => {
  //   console.error("[ERROR] /health: "+ err.message)
  //   res.json({ message: "ERROR: "+ err.message, status: req.status })
  // });
  res.json({ message: "OK" })
})


app.listen(PORT, () => {
  logger.info(`Backend API server listening on http://localhost:${PORT}/`)
})
