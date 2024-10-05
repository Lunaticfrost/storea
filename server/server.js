const express = require("express");
const http = require("http");
require("dotenv").config();
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const port = process.env.PORT
const ip = process.env.IP;
const mode = process.env.MODE;

app.listen(port, () => {
  console.log("Server started on port 3000");
});

app.all("*", (req, res, next) => {
  const err = new Error(`Could not find ${req.originalUrl} on this server.`);
  err.name = "Path Error";
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

const server = http.createServer(app);

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log(
      "Express server listening on http://%s:%d, in %s mode",
      ip,
      port,
      mode
    );
  });
});

server.on("error", (err) => {
  console.error(`Server error: ${err}`);
});

module.exports = app;