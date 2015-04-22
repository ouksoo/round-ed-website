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

	$(document).ready(function(){
		window.ondevicemotion = function(event) {  
			var accX = Math.round(event.accelerationIncludingGravity.x*10);
			var accY = Math.round(event.accelerationIncludingGravity.y*10);

			sc.offSet(function(){
				return (accY*0.01);
				
				/*
				if(accX > 0){
					return accX;
				}
				else {
					return -1;
				}
				*/
			}(), function(){
				return (accX*0.01)*-1;
				/*
				if(accY > 0){
					return ;
				}
				else {
					return -1;
				}
				*/
			}());
		}

		$('nav a').on('click', function(){
			var thisattr = $(this).data('id');
			sc.links(thisattr);
			return false;
		});
	});

	$(document).on('touchmove', function (e) {
		e.preventDefault();
	});

	return {

	}
});aodnjfe