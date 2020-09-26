const gulp = require("gulp"),
  request = require("request"),
  source = require("vinyl-source-stream"),
  streamify = require("gulp-streamify"),
  jsonTransform = require("gulp-json-transform");

require("dotenv").config();

function fetchData() {
  return request({
    url: `${process.env.STOCK_API_URL}/ref-data/symbols`,
    qs: {
      token: process.env.API_TOKEN,
    },
  })
    .pipe(source("data.json"))
    .pipe(
      streamify(
        jsonTransform(function (stocks) {
          return stocks.map(function (stock) {
            return {
              symbol: stock.symbol,
              name: stock.name,
            };
          });
        })
      )
    )
    .pipe(gulp.dest("./"));
}

exports.fetchData = fetchData;
