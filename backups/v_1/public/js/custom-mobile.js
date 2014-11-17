define([
	'socket.io'
], function(io){

	var socket = io.connect('/rc');
	var successHandler = null;
	var errorHandler = null;

	function connect(roomKey) {
		socket.emit('join-room', roomKey);
	}

	socket.on('room-joined', function (roomKey) {
		console.log('connect success', roomKey);
		successHandler && successHandler(roomKey);
	});

	socket.on('room-notexist', function (roomKey) {
		console.log('connect failed', roomKey);
		errorHandler && errorHandler(roomKey);
	});

	function sendMovement(data) {
		socket.emit('send-movement', data); 
	}

	return {
		connect: function (roomKey, onsuccess, onerror) {
			successHandler = onsuccess;
			errorHandler = onerror;
			connect(roomKey);
		},
		sendMovement: function (data) {
			sendMovement(data);
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