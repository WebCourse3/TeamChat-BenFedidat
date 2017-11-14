import * as express from "express";
import * as path from "path";
var router = express.Router();

import { User } from '../model/user';

let loginInfo: User[] = [
    new User("admin", "password")
];
let loggedIn: string[] = [];

router.post('/signin', (req, res) => {
    var username: string = req.body.id;
    var password: string = req.body.password;
    var userInfo:  User = loginInfo.filter(info => info.id === username)[0];
    if (userInfo && userInfo.password === password) {
        loggedIn.push(username);
        res.cookie('user', username, { maxAge: 60 * 60 * 24 * 365 })
            .send("logged in successfully");
    }
    else {
        res.status(400).send("username or password error");
    }
});

router.post('/signup', (req, res) => {
    var username: string = req.body.id;
    var password: string = req.body.password;
    var userInfo:  User = loginInfo.filter(info => info.id === username)[0];
    if (!userInfo) {
        loginInfo.push(new User(username, password));
        res.send("created user successfully");
    }
    else {
        res.status(400).send("username already exists");
    }
});

module.exports = router;