const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const session = require('express-session')
const cookieParser = require('cookie-parser');


server.set("view engine", "pug");
server.set("views", `../WWW`);
server.use(express.static("../"), express.static('IMAGES'));
//server.use(express.json());
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(session({secret: 'message'}))
server.use("/", routes);
server.listen(9999);