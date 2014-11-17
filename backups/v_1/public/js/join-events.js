define([
	'jquery',
	'custom-mobile'
], function($, sc){

	$('#connect').click(function(e){
		var roomKey = $('#room-key').val();
		sc.connect(roomKey, function(){
			$('.guide').hide();
			$('.chatroom').css('display','block');
			
			$('.chatroom .top').click(function(){
				sc.sendMovement('top');
			});
			$('.chatroom .bottom').click(function(){
				sc.sendMovement('bottom');
			});
			$('.chatroom .left').click(function(){
				sc.sendMovement('left');
			});
			$('.chatroom .right').click(function(){
				sc.sendMovement('right');
			});

		}, function(){
			alert('connect failed');
		});
	});

	$(document).on('touchmove', function (e) {
		e.preventDefault();
	});

	return {

	}
});