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
		var cstm = new custom();

		//test center
		$('.guide').css('top', ($(window).height()/2)-70);
		$('.guide').css('left', ($(window).width()/2)-100);

		// socket 
		var serverUrl = 'http://' + location.host;

		var socket = io.connect(serverUrl + '/rc');
		socket.on('connect', function () {
			// 방 생성 요청
			socket.emit('create-room');
			// 방 생성이 완료된 경우
			socket.on('room-created', function (roomKey) {
				console.log('연결됨', roomKey);
				$('#url').text(serverUrl + '/ctrl');
				$('#roomKey').text(roomKey);
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