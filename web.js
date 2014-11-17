var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

// all environments
app.set('port', process.env.PORT || 8001);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.sendfile(__dirname + "/public/index.html");
});

app.get('/ctrl', function(req, res){
	res.sendfile(__dirname + "/public/mobile.html");
});

http.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var rooms = [];
io.on('connection', function(socket){
	  socket.on('chat message', function(msg){
	    io.emit('chat message', msg);
	  });
});

io.of('/rc').on('connection', function(s){
	//create room
	s.on('create-room', function(){
		var roomKey = String(parseInt(Math.random() * 100000));
		s.roomKey = roomKey;
		s.join(roomKey);
		rooms.push(roomKey);
		s.emit('room-created', roomKey);
	});
	
	//access choice 
	s.on('join-room', function(roomKey){
		if(rooms.indexOf(roomKey) === -1){
			s.emit('room-notexist', roomKey);
			return;
		}
		s.roomKey = roomKey;
		s.join(roomKey);
		s.emit('room-joined', roomKey);
	});
	
	//response x,y
	s.on('mobileMove', function(num){
		if(s.roomKey){
			s.broadcast.to(s.roomKey).emit('moves', num);
		}
	});	
	
	s.on('mobile-x', function(num){
		if(s.roomKey){
			s.broadcast.to(s.roomKey).emit('moveX', num);
		}
	});
	
	s.on('mobile-y', function(num){
		if(s.roomKey){
			s.broadcast.to(s.roomKey).emit('moveY', num);
		}
	});	

	//controler message request
	s.on('send-movement', function(data){
		if(s.roomKey){
			s.broadcast.to(s.roomKey).emit('move', data);
		}
	});
	
});
