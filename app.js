const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.get("/", (req, res) => {
  res.redirect("/all-article");
});
app.get("/all-article", (req, res) => {
  res.render("index");
});
app.get("/add-new-article", (req, res) => {
  res.render("add-new-article");
});
app.get("/mix", (req, res) => {
  res.send("mourad");
});
app.use((req, res) => {
  res.status(404).send("Sorry cant find that!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
