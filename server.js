/*
  This JavaScript file contains code generated with assistance from ChatGPT,
  an AI language model developed by OpenAI.

  ChatGPT was used for advice on certain functionalities and structures in
  this project.

  For more information, visit: https://openai.com/chatgpt
*/

const http = require("http");
const url = require("url");
const fs = require("fs");
const { getDate, writeFile, readFile } = require("./modules/utils");
const messages = require("./en");

class Server {
  constructor(port) {
    this.port = port;
  }

  start() {
    http
      .createServer((req, res) => this.requestHandler(req, res))
      .listen(this.port);
    console.log(`Server running at https://potipress.com`);
  }

  requestHandler(req, res) {
    let q = url.parse(req.url, true);
    const pathSegments = q.pathname
      .split("/")
      .filter((segment) => segment.length > 0);

    switch (pathSegments[0]) {
      case "writeFile":
        this.handleWriteFile(q.query["text"], res);
        break;
      case "readFile":
        this.handleReadFile(pathSegments[1], res);
        break;
      case "getDate":
        this.handleGetDate(q.query["name"], res);
        break;
      default:
        this.handleNotFound(res);
        break;
    }
  }

  handleWriteFile(text, res) {
    writeFile(text, (err, result) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("Error writing to the file.");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h3>${result}</h3>`);
      }
    });
  }

  handleReadFile(fileName, res) {
    if (!fileName) {
      this.handleNotFound(res);
      return;
    }
    readFile(fileName, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(`Error: File '${fileName}' not found.`);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h3>${data}</h3>`);
      }
    });
  }

  handleGetDate(name, res) {
    const responseText = `<h3 style="color: blue">${messages.greet(
      name
    )} ${getDate(name)}</h3>`;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(responseText);
  }

  handleNotFound(res) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("404 Not Found");
  }
}

// Create and start the server
const server = new Server(3000);
server.start();

// const https = require("https");
// const http = require("http");
// const fs = require("fs");
// let url = require("url");
// let { getDate, writeFile, readFile } = require("./modules/utils");
// const messages = require("./en");

// http
//   .createServer(function (req, res) {
//     let q = url.parse(req.url, true);
//     const pathSegments = q.pathname
//       .split("/")
//       .filter((segment) => segment.length > 0);

//     if (pathSegments[0] === "writeFile") {
//       writeFile(q.query["text"], function (err, result) {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "text/html" });
//           res.end("Error writing to the file.");
//         } else {
//           res.writeHead(200, { "Content-Type": "text/html" });
//           res.end(`<h3>${result}</h3>`);
//         }
//       });
//     } else if (pathSegments[0] === "readFile") {
//       const fileName = pathSegments[1];
//       if (!fileName) {
//         res.writeHead(404, { "Content-Type": "text/html" });
//         res.end("404 Not Found");
//         return;
//       }
//       readFile(fileName, function (err, data) {
//         if (err) {
//           res.writeHead(404, { "Content-Type": "text/html" });
//           res.end(`Error: File '${fileName}' not found.`);
//         } else {
//           res.writeHead(200, { "Content-Type": "text/html" });
//           res.end(`<h3>${data}</h3>`);
//         }
//       });
//     } else if (pathSegments[0] === "getDate") {
//       const responseText = `<h3 style="color: blue">${messages.greet(
//         q.query["name"]
//       )} ${getDate(q.query["name"])}</h3>`;
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(responseText);
//     } else {
//       res.writeHead(404, { "Content-Type": "text/html" });
//       res.end("404 Not Found");
//     }
//   })
//   .listen(3000);

// console.log("Server running at https://potipress.com");
