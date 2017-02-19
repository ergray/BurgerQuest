var Game = (function(){

	var Game = function(){
		here = this;
		this.inMenu = false;
		this.context;
		this.text;
		this.selected;
		this.newSelection;
		this.currentConsumer = 0;
		this.currentMenu = "empty";
		this.inDialogue = false;


		//Map assets
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

		this.checkMap = function(y, x){
			return this.map[y][x]
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

		//Game Objects
		this.hero = {
			oldX: 100,
			olxY: 100,
			xPOS: 100,
			yPOS: 100,
			hasFood: false
		}

		this.food = {
			seasonLevel: 0,
			cookLevel: 0
		}

		this.customer = {
			oldX: 0,
			oldY: 0,
			xPOS: 250,
			yPOS: 450,
			money: 10,
			hungry: true,
			desire: {cooked: 0, seasoned: 0}
		}

		this.register = {
			money: 0
		}

		//Menu methods
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

		this.atSelection = {
			selected: 0,
			prevSelected: 0
		}

		this.exitMenu = function(){
			this.context.menuContext.clearRect(0, 0, 500, 550);
			this.context.textContext.clearRect(0, 0, 500, 550);
			this.inMenu = false;
			this.inDialogue = false;
			this.atSelection.selected = 0;
			this.atSelection.prevSelected = 0;
		}

		this.menuCall = function(type){
			console.log("menu call actived with type: " +type)
			if (type == "REGISTER"){
				this.showFunds();
				this.exitMenu();
			} else if (type == "CUSTOMER"){
				console.log(here.customer.yPOS);
				if (here.customer.yPOS == 250){
					this.exitMenu();
					this.customerOrder();
					this.inDialogue = true
				}
			} else if (type == "COOK"){
					here.cookFood();
				} else if (type == "SEASON"){
					here.seasonFood();
				}
		}
		

		//Register Methods

		this.customerOrder = function(){
			here.context.showDialogue();
		}

		this.showFunds = function(){
			console.log("There are "+this.register.money+ " dollars in the register.");			
		}

		//Combat Methods

		this.cookFood = function(){
			if (here.food.cookLevel < 5){
				here.food.cookLevel +=1;
			} else {
				console.log("This food is wayyyy overcooked.")
			}
		}

		this.seasonFood = function(){
			if (here.food.seasonLevel < 5){
				here.food.seasonLevel +=1;
			} else {
				console.log("This food is wayyyy overseasoned.")
			}
		}

	
		}
	return Game
})()