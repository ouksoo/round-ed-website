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

	function footer(){

	}

	function menuRewind(obj){
		nowPos = obj;
		if(obj != 'about' && obj != 'story'){
			$('.aboutnavi').fadeOut();
			
			TweenMax.to($('h2.about-title'), .5, {left:'-200px', ease:Linear.easeNone});
		} 
		TweenMax.to($('h2.contact-title'), .5, {left:'-200px', ease:Linear.easeNone});
		TweenMax.to($('h2.work-title'), .5, {left:'-200px', ease:Linear.easeNone});
		TweenMax.to($('h2.lab-title'), .5, {left:'-200px', ease:Linear.easeNone});
	}

	function closeWork(){

	}
/*
	mou.prototype.prot1 = function(){
		//alert('');
	};

	mou.prototype.prot2 = function(){
		$('#or').html('');
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
		logconsole : logconsole,
		footer : footer,
		menuRewind : menuRewind,
		closeWork : closeWork
	}
});