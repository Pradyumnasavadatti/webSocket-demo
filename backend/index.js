const express = require("express");
const ws = require("ws");
const app = express();
const path = require("path");

app.use("/", express.static(path.resolve(__dirname, "")));
const server = app.listen(18000);

//Create the ws server
const webServer = new ws.Server({
  server,
});

//on connect
webServer.on("connection", (connect) => {
  console.log("Connecting");
  //on message
  connect.on("message", (msg) => {
    webServer.clients.forEach((element) => {
      if (element.readyState == ws.OPEN) {
        element.send(msg.toString());
      }
    });
  });
});

//on upgrade connection
webServer.on("upgrade", (req, socket, head) => {
  console.log("Upgrade");
  webServer.handleUpgrade(req, socket, head, () => {
    webServer.emit("connection", socket, req);
  });
});
