"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var errorHandler = require("errorhandler");
var path = require("path");
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, '../node_modules/popper.js/dist')));
app.use(express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, '../node_modules/jquery.cookie')));
app.use(express.static(path.join(__dirname, "../public")));
var users = require('./routes/users');
app.use('/', users);
var index = require('./routes/index');
app.use('/', index);
app.use('/', function (req, res, next) {
    if (!req.cookies || !req.cookies['user']) {
        if (req.url === 'login.html') {
            res.redirect('login.html');
        }
        res.redirect('login.html?redirect=' + req.url);
    }
    else {
        next();
    }
});
//////////////////SOCKET IO
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketCookieParser = require('socket.io-cookie-parser');
io.use(socketCookieParser());
io.on('connection', function (socket) {
    var user = socket.request.cookies["user"];
    console.log('User ' + user + ' connected');
    socket.broadcast.emit('user connect event', user, 'connected');
    socket.on('disconnect', function () {
        console.log('User ' + user + ' disconnected');
        io.emit('user connect event', user, 'disconnected');
    });
    socket.on('chat message', function (msg) {
        console.log('chat message: ' + user + ' said \"' + msg + '"');
        socket.broadcast.emit('chat message', user, msg);
    });
});
///END////////////////
app.use(errorHandler());
app.listen(3000, function () {
    console.log('OfekTwitter');
});
//# sourceMappingURL=app.js.map