/*
  This JavaScript file contains code generated with assistance from ChatGPT,
  an AI language model developed by OpenAI.

  ChatGPT was used for advice on certain functionalities and structures in
  this project.

  For more information, visit: https://openai.com/chatgpt
*/

const https = require("https");
const http = require("http");
const fs = require("fs");
let url = require("url");
let { getDate, writeFile, readFile } = require("./modules/utils");
const messages = require("./en");

// Load SSL certificate and key
// This will cause an error when running the server locally
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/potipress.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/potipress.com/fullchain.pem"),
  secureProtocol: "TLS_method", // This can be adjusted if needed
};

https
  .createServer(function (req, res) {
    let q = url.parse(req.url, true);
    const pathSegments = q.pathname
      .split("/")
      .filter((segment) => segment.length > 0);

    if (pathSegments[0] === "writeFile") {
      writeFile(q.query["text"], function (err, result) {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("Error writing to the file.");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(`<h3>${result}</h3>`);
        }
      });
    } else if (pathSegments[0] === "readFile") {
      const fileName = pathSegments[1];
      if (!fileName) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Not Found");
        return;
      }
      readFile(fileName, function (err, data) {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(`Error: File '${fileName}' not found.`);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(`<h3>${data}</h3>`);
        }
      });
    } else if (pathSegments[0] === "getDate") {
      const responseText = `<h3 style="color: blue">${messages.greet(
        q.query["name"]
      )} ${getDate(q.query["name"])}</h3>`;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(responseText);
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("404 Not Found");
    }
  })
  .listen(443);

console.log("Server running at https://potipress.com");

http
  .createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  })
  .listen(80);
