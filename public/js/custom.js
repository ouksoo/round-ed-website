define(function(){
	function mou(obj){
		var socket = io();
		$('form').submit(function(){
			socket.emit('chat message', $('#m').val());
			$('#m').val('');
			return false;
		});

		socket.on('chat message', function(msg){
			$('#messages').append($('<li>').text(msg));
		});
	};

	function logconsole(msg){
		console.log(msg);
	}
/*
	mou.prototype.prot1 = function(){
		//alert('prototype1');
	};

	mou.prototype.prot2 = function(){
		$('#or').html('what');
	};

	mou.prototype.prot3 = function(m1){
		var m2 = m1;
		$('#button').click(function(){
			$(this).html(m2)
		});		
	};

	mou.prototype.port4 = function(){
		$('body').css('background-color','gray');
	};
*/
	return {
		mou : mou,
		logconsole : logconsole
	}
});