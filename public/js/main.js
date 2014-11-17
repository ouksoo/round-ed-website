requirejs.config({
	baseUrl : 'js',
	paths : {
		'jquery' : 'jquery',
		'custom' : 'custom'
	}
});

requirejs(['jquery','custom'], function($, custom){
	$(document).ready(function(){
		var jQuery = $;
		//var cstm = new custom();

		//test center
		//$('.guide').css('top', '0%');//($(window).height()/2)-70
		//$('.guide').css('right', '0%');//($(window).width()/2)-100

		// socket 
		var serverUrl = 'http://' + location.host;

		var socket = io.connect(serverUrl + '/rc');
		socket.on('connect', function () {
			// 방 생성 요청
			socket.emit('create-room');
			// 방 생성이 완료된 경우
			socket.on('room-created', function (roomKey) {
				console.log('Connect completed : ', roomKey);
				$('#url').text(serverUrl + '/ctrl');
				$('#roomKey').text(roomKey);
			});

			//move x y
			socket.on('moves', function(data){
				sendAccDataToProcessing(data.b, data.a);
				$('#info').html(data.a + " + " + data.b);
			});

			// move event from emit
			socket.on('move', function (data) {
				var el = $('.guide');
				var p = el.offset();

				if(data == 'top'){
					el.css('top', p.top-10);
				}
				else if(data == 'bottom'){
					el.css('top', p.top+10);
				}
				else if(data == 'left'){
					el.css('left', p.left-10);
				}
				else {
					el.css('left', p.left+10);
				}
				//console.log('move:', data);
			});

		});
		//* socket

	});
});