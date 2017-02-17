var Game = (function(){

	var Game = function(){
		here = this;
		this.inMenu = false;
		this.context;
		this.selected;
		this.newSelection;
		this.currentConsumer = 0;
		this.currentMenu = "empty";

		this.map = [
			[10,10,10,10,10,10,10,10,10,10],
			[10,00,00,00,00,00,00,00,40,10],
			[10,00,00,00,00,00,00,03,50,10],
			[10,00,00,00,00,02,00,00,60,10],
			[10,10,10,10,10,10,10,10,10,10],
			[10,00,00,00,00,00,00,00,00,10],
			[10,00,00,00,00,00,00,00,00,10],
			[10,00,00,00,00,00,00,00,00,10],
			[10,00,00,00,00,00,00,00,00,10],
			[10,00,00,00,00,00,00,00,00,10],	
			[10,10,10,10,10,30,10,10,10,10]
		]

		this.atSelection = {
			selected: 0,
			prevSelected: 0
		}

		this.kitchenMenu = {
			selected: 0,
			prevSelected: 0
		}		

		this.hero = {
			oldX: 100,
			olxY: 100,
			xPOS: 100,
			yPOS: 100
		}

		this.customer = {
			oldX: 0,
			oldY: 0,
			xPOS: 0,
			yPOS: 0,
			money: 10,
			hungry: true
		}		

		this.checkMap = function(y, x){
			return this.map[y][x]
		}

		this.interact = function(e, context){
			var mapCoords = this.map[this.hero.yPOS/50][this.hero.xPOS/50];

			if (mapCoords == 2){
				this.currentMenu = 'register'
				this.context.createMenu(here.currentMenu, this.context.menuContext, this.context.menuImage, 100, 150);
				this.inMenu = true;
			} else if (mapCoords == 3){
				this.currentMenu = 'kitchen';				
				this.context.createMenu(here.currentMenu, this.context.menuContext, this.context.fightScreen, 0, 0);
				this.inMenu = true;
			} else {
				console.log("Nothing to interact with.");
			}
		}

		this.exitMenu = function(){
			this.context.removeImage(this.context.menuContext, 100, 150, 300, 200);
			this.inMenu = false;
			this.atSelection.selected = 0;
			this.atSelection.prevSelected = 0;
		}

		this.repos = function(e, object){
			this.hero.oldX = this.hero.xPOS;
			this.hero.oldY = this.hero.yPOS;
			if (e.keyCode == 87){
				if (this.checkMap(Math.floor((this.hero.yPOS-50)/50), Math.floor((this.hero.xPOS)/50)) <= 9)
				this.hero.yPOS -= 50;
			} else if (e.keyCode == 83){
				if (this.checkMap(Math.ceil((this.hero.yPOS+50)/50), Math.floor((this.hero.xPOS)/50)) <= 9)
				this.hero.yPOS += 50;	
			} if (e.keyCode == 65){
				if (this.checkMap(Math.floor((this.hero.yPOS)/50), Math.floor((this.hero.xPOS-50)/50)) <= 9)
				this.hero.xPOS -= 50;			
			} if (e.keyCode == 68){
				if (this.checkMap(Math.floor((this.hero.yPOS)/50), Math.ceil((this.hero.xPOS+50)/50)) <= 9)
				this.hero.xPOS += 50;	
			}
			this.context.removeImage(this.context.forContext, this.hero.oldX, this.hero.oldY, 50, 50);
			this.context.createWorker()
		}

		this.menuCall = function(type){
			if (type == "register"){
				this.showFunds();
				this.exitMenu();
			}
		}

		this.register = {
			money: 0
		}

		this.showFunds = function(){
			console.log("There are "+this.register.money+ " dollars in the register.");			
		}

	
		}
	return Game
})()