/*const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(
    "Fsh Bot - Discord v14 - Bot is currently in testing mode which means that the api doesn't work"
  );
});
server.listen(3000);*/

const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.status(200);
  res.send(
    "Fsh Bot - Discord v14 - Bot is currently being reworked which means that the api doesn't work"
  );
});

app.listen(3000);
