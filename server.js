const express = require("express");
const port = process.env.PORT || 8080;
const app = express();

const allowedOrigins = ["*"];
const Ticker = require("./data.json");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.get("/", (req, res) => {
  res.send("working");
  res.end();
});

app.get("/keyword/:search", (req, res) => {
  console.log("--------/keyword-----------" + req.params.search);
  let search = req.params.search;
  search = search.toLowerCase();
  res.setHeader("Content-Type", "application/json");
  const g = Ticker.filter(
    f => JSON.stringify(f).toLowerCase().indexOf(search) !== -1
  );

  res.send(g);
  res.end();
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready On Server http://localhost:${port}`);
});
