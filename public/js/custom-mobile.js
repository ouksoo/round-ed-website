define([
	'socket.io'
], function(io){

	var socket = io.connect('/rc');
	var successHandler = null;
	var errorHandler = null;

	socket.on('room-joined', function (roomKey) {
		console.log('connect success', roomKey);
		successHandler && successHandler(roomKey);
	});

	socket.on('room-notexist', function (roomKey) {
		console.log('connect failed', roomKey);
		errorHandler && errorHandler(roomKey);
	});

	function connect(roomKey) {
		socket.emit('join-room', roomKey);
	}

	function sendMovement(data) {
		socket.emit('send-movement', data); 
	}

	function sendX(num){
		socket.emit('mobile-x', num); 
	}

	function sendY(num){
		socket.emit('mobile-y', num); 
	}

	function offSet(a,b){
		socket.emit('mobileMove',{'a':a,'b':b});
	}

	return {
		connect: function (roomKey, onsuccess, onerror) {
			successHandler = onsuccess;
			errorHandler = onerror;
			connect(roomKey);
		},
		sendMovement: function (data) {
			sendMovement(data);
		},
		sendX : function(num){
			sendX(num);
		},
		sendY : function(num){
			sendY(num);
		},
		offSet : function(a,b){
			offSet(a,b);
		}
	};

});

/*
var socket = io();
$('form').submit(function(){
	socket.emit('chat message', $('#m').val());
	$('#m').val('');
	return false;
});

socket.on('chat message', function(msg){
	$('#messages').append($('<li>').text(msg));
});
*/