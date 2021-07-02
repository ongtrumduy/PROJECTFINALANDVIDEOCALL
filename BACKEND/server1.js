import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import https from "https";
import socketio from "socket.io";
import events from "events";
import path from "path";
import fs from "fs";

import allRoutes from "./source/routes/allroutes";

import allSockets from "./source/io-sockets/allsockets";

import portRoutes from "./source/routes/port";

let app = express();
// let server = http.createServer(app);
let port = 8081;

// let locallink = "http://40.88.10.237:3000";
// let locallink = "http://localhost:3000";

app.use(cors());

let corsOptions = {
  body: "*",
  origin: "*",
  optionsSuccessStatus: 200,
  methods: "GET,PUT,POST,DELETE"
};

let sslCerticates = {
  key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  requestCert: false,
  rejectUnauthoried: false
};

let sslServer = https.createServer(sslCerticates, app);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);

let io = socketio(sslServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://localhost:3000",
      "http://192.168.1.194:3000",
      "http://192.168.0.108:3000",
      "https://192.168.0.108:3000",
      "https://192.168.1.203:3000",
      "https://192.168.5.59:3000"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

events.EventEmitter.defaultMaxListeners = 6969696969696969696969696969696969696969696969696969;

//========================Routes=========================================

allRoutes(app, corsOptions);

//=========================================================================

//============================Socket======================================

allSockets(io);

//=========================================================================

//============================Port======================================
portRoutes(sslServer, port);
//=========================================================================
