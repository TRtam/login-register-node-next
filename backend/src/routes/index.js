// import module(s)
const {Router} = require("express");

// import service(s)
const Auth = require("../services/Auth.js");
const Users = require("../services/Users.js");

// create route
const route = Router();

// create signin route
route.get("/", async (req, res) => {
    const {authorization} = req.headers;

    const token = Auth.verify(authorization);

    if(!token) {
        return res.json({});
    }

    const user = await Users.getById(token.id);

    if(!user) {
        return res.json({});
    }

    return res.json({username: user.username});
});

module.exports = (server) => {
    // tell server to use this route
    server.use("/", route);
}