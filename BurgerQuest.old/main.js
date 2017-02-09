window.onload = function(){
	var bgCanvas = document.getElementById("background");
	var bgContext = bgCanvas.getContext("2d");
	var fgCanvas = document.getElementById("foreground");
	var fgContext = fgCanvas.getContext("2d");	
	var background = new Image();
	var heroImage = new Image();
	background.src = "./assets/basicfloorplan.png";
	heroImage.src = "./assets/hero.png";
	console.log("hello");	
	background.onload = function(){
		bgContext.drawImage(background, 0, 0);
		};
	heroImage.onload = function(){
		fgContext.drawImage(heroImage, Hero.xPOS, Hero.yPOS);
		console.log('hello foreground');
	};	

	var repos = function(e){
		Hero.oldX = Hero.xPOS;
		Hero.oldY = Hero.yPOS;
		if (e.key == "ArrowUp"){
			Hero.yPOS -= 5;
			if (Hero.yPOS < 30){
				Hero.yPOS = 30;
			}
		} else if (e.key == "ArrowDown"){
			Hero.yPOS += 5;
			if (Hero.yPOS > 320){
				Hero.yPOS = 320;
			}			
		} if (e.key == "ArrowLeft"){
			Hero.xPOS -= 5;
			if (Hero.xPOS < 22){
				Hero.xPOS = 22;
			}			
		} if (e.key == "ArrowRight"){
			Hero.xPOS += 5;
			if (Hero.xPOS > 562){
				Hero.xPOS = 562;
			}	
		}
		fgContext.clearRect(Hero.oldX, Hero.oldY, 50, 50);
		fgContext.drawImage(heroImage, Hero.xPOS, Hero.yPOS); 
	}
	window.addEventListener('keydown', repos, true);


}
