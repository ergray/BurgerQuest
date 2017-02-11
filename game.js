var Game = (function(){

	var Game = function(){
		this.inMenu = false;
		this.context;
		this.selected;
		this.newSelection;

		this.map = [
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

		this.registerMenu = {
			selected: 0,
			prevSelected: 0
		}

		this.hero = {
			oldX: 100,
			olxY: 100,
			xPOS: 100,
			yPOS: 100,
		}		

		this.checkMap = function(y, x){
			return this.map[y][x]
		}

		this.menu = {

			//object for functions called by interact
			//step 1: create method to check register funds
		}

		this.interact = function(e, context){
			var mapCoords = this.map[this.hero.yPOS/50][this.hero.xPOS/50];

			if (mapCoords == 2){
				this.context.createMenu(this.context.menuContext, this.context.menuImage, 100, 150);
				this.inMenu = true;
			} else {
				console.log("Nothing to interact with");
			}
		}

		this.exitMenu = function(){
			this.context.removeImage(this.context.menuContext, 100, 150, 300, 200);
			this.inMenu = false;
		}



		this.repos = function(e, object){
			this.hero.oldX = this.hero.xPOS;
			this.hero.oldY = this.hero.yPOS;
			if (e.keyCode == 87){
				if (this.checkMap(Math.floor((this.hero.yPOS-50)/50), Math.floor((this.hero.xPOS)/50)) != 1)
				this.hero.yPOS -= 50;
			} else if (e.keyCode == 83){
				if (this.checkMap(Math.ceil((this.hero.yPOS+50)/50), Math.floor((this.hero.xPOS)/50)) != 1)
				this.hero.yPOS += 50;	
			} if (e.keyCode == 65){
				if (this.checkMap(Math.floor((this.hero.yPOS)/50), Math.floor((this.hero.xPOS-50)/50)) != 1)
				this.hero.xPOS -= 50;			
			} if (e.keyCode == 68){
				if (this.checkMap(Math.floor((this.hero.yPOS)/50), Math.ceil((this.hero.xPOS+50)/50)) != 1)
				this.hero.xPOS += 50;	
			}
			this.context.removeImage(this.context.forContext, this.hero.oldX, this.hero.oldY, 50, 50);
			this.context.createWorker()
		}

		this.Register = {
			money: 0
		}
			
	}
	return Game
})()