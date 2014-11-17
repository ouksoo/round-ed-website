requirejs.config({
	baseUrl : 'js',
	paths : {
		'jquery' : 'jquery',
		'cm' : 'custom-mobile',
		'socket.io' : '/socket.io/socket.io.js'
	},
	shim : {
		'socket.io' :  {
			exports : 'io'
		}
	}
});

require([
  'custom-mobile',
  'join-events'
]);