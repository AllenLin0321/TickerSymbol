const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const Ticker = require("./data.json");

app.use(cors());

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
