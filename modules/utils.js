const fs = require("fs");

function getDate(name) {
  let currentDate = new Date().toLocaleString();
  return `${name}, current date is ${currentDate}`;
}

function writeFile(text, callback) {
  fs.appendFile("file.txt", text, function (err) {
    if (err) return callback(err);
    callback(null, "Text appended to file");
  });
}

function readFile(fileName, callback) {
  fs.readFile(fileName, "utf8", function (err, data) {
    if (err) return callback(err);
    callback(null, data);
  });
}

module.exports = { getDate, writeFile, readFile };
