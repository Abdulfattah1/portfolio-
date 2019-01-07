const http = require("http");
const express = require("express");
const path = require("path");

const app = express();
const server = http.createServer(app);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/", (req, res, next) => {
  res.render("index.ejs");
});

server.listen(8080);
