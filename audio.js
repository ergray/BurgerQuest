var Audible = (function(){

	var Audible = function(){

		this.loadSound = function(src){
			var tempAudio = document.createElement("audio");
			tempAudio.src = src;
			tempAudio.play();
		}

	}

	return Audible;

})()