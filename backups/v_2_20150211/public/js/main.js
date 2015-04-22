requirejs.config({
	baseUrl : 'js',
	paths : {
		'jquery' : 'jquery',
		'custom' : 'custom',
		'sammy' : 'sammy',
		'TweenMax' : 'TweenMax.min',
		'Wheel' : 'jquery.smoothwheel'
	}
});

requirejs(['jquery','custom','Sammy','TweenMax','Wheel'], function($, custom, Sammy, TweenMax, Wheel){

	//location.hash = 'main'; //initial hash

	var roundLive = false;

	var app = Sammy(function(){
		this.get('#main', function(){

			if(roundLive == true){
				$('.roundcolor').removeClass('on');
				roundLive = false;
			}

			$('.about, .story, .work, .contact').fadeOut();
			TweenMax.to($('h1'), .5, {left:'35px', ease:Expo.easeIn});
			TweenMax.to($('.footer'), .5, {bottom:'-60px', ease:Expo.easeOut});
			custom.menuRewind('main');
			$('footer').fadeIn();
		});
		this.get('#about', function(){

			if(roundLive == false){
				$('.roundcolor').addClass('on');
				roundLive = true;
			}

			$('.menufilm, nav, .menuclose').fadeOut(function(){
				custom.menuRewind('about');
				$('.story, .work, .contact').fadeOut();
				TweenMax.to($('h1'), .5, {left:'-225px', ease:Expo.easeIn, onComplete:function(){
					TweenMax.to($('.footer'), .5, {bottom:'0', ease:Expo.easeOut});
					TweenMax.to($('h2.about-title'), .5, {left:'35', ease:Expo.easeOut});
					TweenMax.to($('.work'), 1, {width:390, ease:Expo.easeInOut, onComplete:function(){
						$('.work').css('overflow-y','hidden').smoothWheel();
					}});
					$('.aboutnavi, .about').fadeIn();
					$('footer').fadeOut();	
				}});	
			});
		});
		this.get('#story', function(){
			$('.menufilm, nav, .menuclose').fadeOut(function(){
				custom.menuRewind('about');
				$('.about, .contact, .work').fadeOut();
				TweenMax.to($('h1'), .5, {left:'-225px', ease:Expo.easeIn, onComplete:function(){
					TweenMax.to($('.footer'), .5, {bottom:'0', ease:Expo.easeOut});	
					TweenMax.to($('h2.about-title'), .5, {left:'35', ease:Expo.easeOut});
					$('.story').fadeIn();
					$('footer').fadeOut();	
				}});	
			});
		});		

		this.get('#work', function(){

			if(roundLive == false){
				$('.roundcolor').addClass('on');
				roundLive = true;
			}

			$('.menufilm, nav, .menuclose').fadeOut(function(){
				custom.menuRewind('work');
				$('.story, .about, .contact').fadeOut();
				$('.work').css('display','block');				
				TweenMax.to($('h1'), .5, {left:'-225px', ease:Expo.easeIn, onComplete:function(){
					TweenMax.to($('.footer'), .5, {bottom:'0', ease:Expo.easeOut});	
					TweenMax.to($('h2.work-title'), .5, {left:'35', ease:Expo.easeOut});	
					TweenMax.to($('.work'), 1, {width:$(window).width(), ease:Expo.easeInOut, onComplete:function(){
						$('.work').css('overflow-y','scroll');//.smoothWheel();
					}});
					$('footer').fadeOut();	
				}});

				$('.work-list li').on('click', function(){

//					console.log($(this).data('nth'));

					//$( ".work-list" ).offset({top:(($(this).data('nth')-1) * 170) * -1});
					var aaa = $(this);


					//TweenMax.to($('.work-detail'), 1.5, {height:$(window).height(), ease:Expo.easeOut});
					TweenMax.to($('.work-list li'), 1, {height:'170',ease:Expo.easeOut});	
					TweenMax.to($('.work-list li').find('div'), .5, {opacity:0.5, ease:Expo.easeOut});	
					TweenMax.to($('.work-list li').find('span'), 1, {'background':'', ease:Expo.easeOut});						

					$('.work-list li').hover(function(){
						TweenMax.to($(this).find('div'), .5, {opacity:0, ease:Expo.easeOut});	
						TweenMax.to($(this).find('span'), 1, {'background':'#000', ease:Expo.easeOut});	
					}, function(){
						TweenMax.to($(this).find('div'), .5, {opacity:0.5, ease:Expo.easeOut});	
						TweenMax.to($(this).find('span'), 1, {'background':'', ease:Expo.easeOut});	
					});


					TweenMax.to($(this), 1, {height:'500',ease:Expo.easeOut, onComplete:function(){
						//$( ".work-list" ).offset({top:-500}); //((aaa.data('nth')-1) * 170) * -1
					}});

					TweenMax.to($(this).find('div'), .5, {opacity:0, ease:Expo.easeOut});	
					TweenMax.to($(this).find('span'), 1, {'background':'#000', ease:Expo.easeOut});						
					$(this).off('hover');
					/*
					TweenMax.to($('.work-close'), 1, {top:'0',delay:.7,ease:Expo.easeOut});		
					$('.work-close').on('click', function(){
						//TweenMax.to($('.work-detail'), 1.5, {height:0, ease:Expo.easeInOut});
						TweenMax.to($('.work-close'), 1, {top:'-70px',ease:Expo.easeOut});
						return false;
					});
*/
					return false;
				});

			});
		});

		this.get('#contact', function(){

			if(roundLive == false){
				$('.roundcolor').addClass('on');
				roundLive = true;
			}

			$('.menufilm, nav, .menuclose').fadeOut(function(){
				custom.menuRewind('contact');
				$('.story, .about, .work').fadeOut();
				TweenMax.to($('h1'), .5, {left:'-225px', ease:Expo.easeIn, onComplete:function(){
					TweenMax.to($('.footer'), .5, {bottom:'0', ease:Expo.easeOut});	
					TweenMax.to($('h2.contact-title'), .5, {left:'35', ease:Expo.easeOut});	
					TweenMax.to($('.work'), 1, {width:390, ease:Expo.easeInOut, onComplete:function(){
						$('.work').css('overflow-y','hidden').smoothWheel();
					}});
					$('.contact').fadeIn();
					$('footer').fadeOut();	
				}});	
			});
		});
	}).run('#main');

	$(document).ready(function(){
		var jQuery = $;
		//var cstm = new custom();
		// socket 
		var serverUrl = 'http://' + location.host;
		var socket = io.connect(serverUrl + '/rc');
		socket.on('connect', function () {
			socket.emit('create-room');
			socket.on('room-created', function (roomKey) {
				console.log('Connect completed : ', roomKey);
				$('#url').text(serverUrl + '/ctrl');
				$('#roomKey').text(roomKey);
			});
			//move x y
			socket.on('moves', function(data){
				sendAccDataToProcessing(data.b, data.a);
				//$('#info').html(data.a + " + " + data.b);
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

			//page link
			socket.on('movePage', function(data){
				location.hash = data.a;
			});

		});
		//* socket

		$('.menustart').on('click', function(){
			$('.menufilm, nav, .menuclose').fadeIn();
		});

		$('.menuclose').on('click', function(){
			$('.menufilm, nav, .menuclose').fadeOut();
		});

		$('.work-list li').hover(function(){
			TweenMax.to($(this).find('div'), .5, {opacity:0, ease:Expo.easeOut});	
			TweenMax.to($(this).find('span'), 1, {'background':'#000', ease:Expo.easeOut});	
		}, function(){
			TweenMax.to($(this).find('div'), .5, {opacity:0.5, ease:Expo.easeOut});	
			TweenMax.to($(this).find('span'), 1, {'background':'', ease:Expo.easeOut});	
		});

		//work detail
		/*
		$('.work-detail').css({
			'width':$(window).width() - 390
		});
*/

	});

	
	$(window).resize(function(){
		$('.work').width($(window).width());
	});

});