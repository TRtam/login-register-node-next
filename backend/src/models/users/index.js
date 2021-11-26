// import module(s)
const {model} = require("mongoose");

// import schema
const schema = require("./schema.js");

module.exports = model("users", schema);