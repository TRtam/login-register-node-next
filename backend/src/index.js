// import config(s)
const {app} = require("./config/index.js");

// import module(s)
const express = require("express");

// create server
const server = express();

// connect to database
require("./database/index.js")();

// server middleware(s)
server.use(require("cors")());
server.use(express.json());
server.use(express.urlencoded({extended: true}));

// pass server to these routes
require("./routes/index.js")(server);
require("./routes/auth.js")(server);

// make server listen to app.port
server.listen(app.port, () => {
    console.log(`server is ready on port ${app.port}`);
});