"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.cookies || !req.cookies['user']) {
        if (req.url === 'signin.html') {
            res.redirect('signin.html');
        }
        res.redirect('signin.html?redirect=' + req.url);
    }
    else {
        next();
    }
});
module.exports = router;
//# sourceMappingURL=index.js.map