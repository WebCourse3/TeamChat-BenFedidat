import * as express from "express";
import * as path from "path";
var router = express.Router();

let loginInfo: { "username": string, "password": string }[] = [
    { "username": "admin", "password": "secretpassword" }
];
let loggedIn: string[] = [];

router.get('/messages', (req, res) => {
    res.send('["message1", "message2"]')
});
module.exports = router;