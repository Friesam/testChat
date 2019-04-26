//let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

var express = require('express');
var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var appRoutes = require('./routes/app');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
io.on("connection", (socket) => {
  // Log whenever a user connects
  console.log('new conection made.');

 socket.on('join', function(data){
      //joining
      socket.join(data.room);

      console.log(data.user + 'joined the room : ' + data.room);

      socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message: 'has joined this room.'});
    });

 // Log whenever a client disconnects from our websocket server
    socket.on('leave', function(data){
    
      console.log(data.user + 'left the room : ' + data.room);

      socket.broadcast.to(data.room).emit('left room', {user:data.user, message: 'has left this room.'});

      socket.leave(data.room);
    });
// When we receive a 'message' event from our client, print out
// the contents of that message and then echo it back to our client

    socket.on('message',function(data){

      io.in(data.room).emit('new message', {user:data.user, message:data.message});
      socket.broadcast.to(data.room).emit('message sent', {user:data.user, message:'has left this room.'});
      console.log("message sent");
    })
});

// Initialize our websocket server on port 5000
http.listen(5000, () => {
  console.log("started on port 5000");
});