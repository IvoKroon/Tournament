const express = require("express");
const bodyParser = require("body-parser");
const server = express();
server.use(bodyParser.json());

const { handler } = require("./index");

server.post("/", (req, res) => {
  // Create dummy lambda context with fail and succeed functions
  const context = {
    fail: () => {
      res.sendStatus(500);
    },
    succeed: data => {
      res.send(data);
    }
  };

  handler(req.body, context, (err, response) => {
    if (err) {
      console.log("data", err);
      throw new Error(err);
    }
    if (response) {
      res.send(response);
    }
  });
});

server.listen("3000", function() {
  console.log("Mock Lambda Service is running on port " + "3000");
});
