// import config(s)
const {tokens} = require("../config/index.js");

// import module(s)
const emailValidator = require("email-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import class(es)
const Users = require("./Users.js");

module.exports = {
    async signIn(details) {
        if(!(details.username && details.password)) {
            return {success: false, error: "invalid details"};
        }

        if((details.username.length < 4) || (details.username.length > 16)) {
            return {success: false, error: "username must have between 4 and 16 characters"};
        }

        if((details.password.length < 4) || (details.password.length > 32)) {
            return {success: false, error: "password must have between 4 and 32 characters"};
        }

        const user = await Users.getOne({username: details.username});

        if(!user) {
            return {success: false, error: "username is not valid"};
        }
        else if (!(await bcrypt.compare(details.password, user.password))) {
            return {success: false, error: "password doesn't match"};
        }

        const token = jwt.sign({id: user._id}, tokens.secretKey, {expiresIn: "1d"});

        return {success: true, message: "you have been successfully signed in", token: token};
    },

    async signUp(details) {
        if(!(details.firstName && details.lastName && details.email && details.username && details.password)) {
            return {success: false, error: "invalid details"};
        }

        if(details.firstName.length < 1) {
            return {success: false, error: "first name should have at least 1 character"};
        }

        if(details.lastName.length < 1) {
            return {success: false, error: "last name should have at least 1 character"};
        }

        if(!emailValidator.validate(details.email)) {
            return {success: false, error: "email must be valid"};
        }

        if((details.username.length < 4) || (details.username.length > 16)) {
            return {success: false, error: "username must have between 4 and 16 characters"};
        }

        if((details.password.length < 4) || (details.password.length > 32)) {
            return {success: false, error: "password must have between 4 and 32 characters"};
        }

        {
            const user = await Users.getOne({$or: [{email: details.email}, {username: details.username}]});

            if(user) {
                return {success: false, error: `${(user.email === details.email) ? "email" : "username"} is already taken`};
            }
        }

        try {
            details.password = await bcrypt.hash(details.password, 16);
        }
        catch(error) {
            return {success: false, error: "something went wrong while hashing your password"};
        }

        const user = await Users.create(details);

        user.save();

        return {success: true, message: "you have been successfully signed up"};
    },

    verify(token) {
        return jwt.verify(token, tokens.secretKey);
    }
}