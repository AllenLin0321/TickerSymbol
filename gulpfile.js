const gulp = require("gulp");
const jsonTransform = require("gulp-json-transform");

gulp.task("format", function () {
  return gulp
    .src("./src/data.json")
    .pipe(
      jsonTransform(function (data, file) {
        return data.map(stock => ({
          symbol: stock.symbol,
          name: stock.name,
        }));
      })
    )
    .pipe(gulp.dest("./"));
});
