// import module(s)
const {Schema} = require("mongoose");

module.exports = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    username: {type: String},
    password: {type: String}
});