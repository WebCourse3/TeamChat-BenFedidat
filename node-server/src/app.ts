import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as path from "path";

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
app.use(express.static(path.join(__dirname, "../../angular-client/dist")));

var index = require('./routes/index');
app.use('/', index);
var users = require('./routes/users');
app.use('/', users);

// app.use('/', function(req, res, next){
//   if(!req.cookies || !req.cookies['user']) {
//     if(req.url === 'login.html') {
//       res.redirect('login.html');
//     }
//     res.redirect('login.html?redirect=' + req.url);
//   }
//   else {
//     next();
//   }
// });

app.route('/*').get(function(req, res) { 
  return res.sendFile(path.join(__dirname, "../../angular-client/dist", 'index.html')); 
});

//////////////////SOCKET IO
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socketCookieParser = require('socket.io-cookie-parser');

io.use(socketCookieParser());

io.on('connection', function(socket: any){
  var user = socket.request.cookies["user"];
  console.log('User ' + user + ' connected');
  socket.broadcast.emit('user connect event', user, 'connected');
  socket.on('disconnect', function(){
    console.log('User ' + user + ' disconnected');
    io.emit('user connect event', user, 'disconnected');
  });
  socket.on('chat message', function(msg: string){
    console.log('chat message: ' + user + ' said \"' + msg + '"');
    socket.broadcast.emit('chat message', user, msg);
  });
});
///END////////////////

app.use(errorHandler());

app.listen(3000, function () {
  console.log('OfekTwitter')
});