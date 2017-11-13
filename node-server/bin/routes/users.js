"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var loginInfo = [
    { "username": "admin", "password": "secretpassword" }
];
var loggedIn = [];
router.post('/signin', function (req, res) {
    var username = req.body.name;
    var password = req.body.password;
    var userInfo = loginInfo.filter(function (info) { return info.username === username; })[0];
    if (userInfo && userInfo.password === password) {
        loggedIn.push(username);
        res.cookie('user', username, { maxAge: 60 * 60 * 24 * 365 })
            .send("logged in successfully");
    }
    else {
        res.status(400).send("username or password error");
    }
});
router.post('/signup', function (req, res) {
    var username = req.body.name;
    var password = req.body.password;
    var userInfo = loginInfo.filter(function (info) { return info.username === username; })[0];
    if (!userInfo) {
        loginInfo.push({ "username": username, "password": password });
        res.send("created user successfully");
    }
    else {
        res.status(400).send("username already exists");
    }
});
module.exports = router;
//# sourceMappingURL=users.js.map