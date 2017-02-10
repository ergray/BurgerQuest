var Game = {}
Game.inMenu = false;
Game.map = [
	[1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,2,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1]
]

Game.checkMap = function(y, x){
	return Game.map[y][x]
}

Game.interact = function(e){
	var menuPlace = document.getElementById("menuPlace");
	var menuContext = menuPlace.getContext("2d");
	var mapCoords = Game.map[Game.hero.yPOS/50][Game.hero.xPOS/50];
	//console.log(mapCoords);
	if (mapCoords == 2){
		var menu = new Image();
		Game.inMenu = true;
		menu.src = "./assets/menutemplate.png";
		menu.onload = function(){
		menuContext.drawImage(menu, 100, 150);
		}
		console.log("Money in register is " + Game.Register.money + " dollars!");
	} else {
		console.log("Nothing to interact with");
	}
}

Game.exitMenu = function(){
	var menuPlace = document.getElementById("menuPlace");
	var menuContext = menuPlace.getContext("2d");
	menuContext.clearRect(100, 150, 300, 200);
	Game.inMenu = false;
}

Game.hero = {
	oldX: 100,
	olxY: 100,
	xPOS: 100,
	yPOS: 100,
	mapArrayX: 1,
	mapArrayY: 1
}

Game.repos = function(e, object){
	var foreground = document.getElementById("foreground");
	var forContext = foreground.getContext("2d");
	Game.hero.oldX = Game.hero.xPOS;
	Game.hero.oldY = Game.hero.yPOS;
	if (e.keyCode == 87){
		if (Game.checkMap(Math.floor((Game.hero.yPOS-50)/50), Math.floor((Game.hero.xPOS)/50)) != 1)
		Game.hero.yPOS -= 50;
	} else if (e.keyCode == 83){
		if (Game.checkMap(Math.ceil((Game.hero.yPOS+50)/50), Math.floor((Game.hero.xPOS)/50)) != 1)
		Game.hero.yPOS += 50;	
	} if (e.keyCode == 65){
		if (Game.checkMap(Math.floor((Game.hero.yPOS)/50), Math.floor((Game.hero.xPOS-50)/50)) != 1)
		Game.hero.xPOS -= 50;			
	} if (e.keyCode == 68){
		if (Game.checkMap(Math.floor((Game.hero.yPOS)/50), Math.ceil((Game.hero.xPOS+50)/50)) != 1)
		Game.hero.xPOS += 50;	
	}
	forContext.clearRect(Game.hero.oldX, Game.hero.oldY, 50, 50);
	forContext.drawImage(object, Game.hero.xPOS, Game.hero.yPOS); 
}

Game.Register = {
	money: 0
}