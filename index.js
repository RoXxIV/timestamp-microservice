// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  // Get the date from the request parameter
  let inputDate = req.params.date;

  // If no date is provided, return the current date and time
  if (!inputDate) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // Check if the date input is a Unix timestamp
  if (/^\d+$/.test(inputDate)) {
    const date = new Date(parseInt(inputDate));
    if (!isNaN(date.getTime())) {
      return res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
    }
  }

  // Check if the input is in the YYYY-MM-DD format or any other format parsed by Date
  const date = new Date(inputDate);
  if (!isNaN(date.getTime())) {
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }

  // If the date is invalid, return an error
  res.json({ error: "Invalid Date" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
