const http = require("http");
let url = require("url");
let getDate = require("./modules/utils");
const messages = require("./en");

http
  .createServer(function (req, res) {
    let q = url.parse(req.url, true);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      `<span style="color: blue">${messages.greet(
        q.query["name"]
      )} ${getDate()}</span>`
    );
  })
  .listen(8888);

console.log("Server running at http://localhost:8888");
