var videoEvent = function(id) {
	videojs(id).ready(function() {

		var myPlayer = this;
		var handleFullscreenChange = function(){
			var myPlayer = this;
			// Do something when the event is fired
			$('#container-nav').toggleClass('fullscreen-ie');
			$('#scroll-top').toggleClass('fullscreen-ie');
		};

		var stopBuffering = function(){
			videojs(id).pause();
		};

		myPlayer.on('fullscreenchange', handleFullscreenChange);

		var btn = document.getElementById(id).parentNode.getElementsByTagName('button')[0];

		btn.onclick = function() {
			stopBuffering();
		};
	});
};

for(var i = 1; i <= 8; i++) {
	videoEvent('video-player-0'+i);
}