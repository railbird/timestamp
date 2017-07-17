const express = require('express');
const convert = require('./converter');
const app = express();

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/convert.html");
})

app.get("/:id", convert);


app.use((res, req, next) => {
  let err = new Error("404: Not found.");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
})

module.exports = app;
