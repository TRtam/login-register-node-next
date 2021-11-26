// import module(s)
const {Router} = require("express");

// import class(es)
const Auth = require("../services/Auth.js");

// create route
const route = Router();

// create signin route
route.post("/sign-in", async (req, res) => {
    // try to sign up with Auth class
    try {
        res.json(await Auth.signIn(req.body));
    }
    catch(error) {
        res.json({success: false, error: error});
    }
});

// create signup route
route.post("/sign-up", async (req, res) => {
    // try to sign up with Auth class
    try {
        res.json(await Auth.signUp(req.body));
    }
    catch(error) {
        res.json({success: false, error: error});
    }
});

module.exports = (server) => {
    // tell server to use this route
    server.use("/auth", route);
}