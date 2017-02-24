var Game = (function(){

	var Game = function(){
		here = this;
		this.inMenu = false;
		this.context;
		this.text;
		this.selected;
		this.customerTemplate;
		this.newSelection;
		this.currentConsumer = 0;
		this.servedCustomer;
		this.currentMenu = "empty";
		this.inDialogue = false;
		this.inSplash = true;


		//Map assets
		this.map = [
			[10,10,10,10,10,10,10,10,10,10],
			[10,00,00,00,00,00,00,00,40,10],
			[10,00,00,00,00,00,00,03,50,10],
			[10,00,00,00,00,02,00,00,60,10],
			[10,10,10,10,10,10,10,10,10,10],
			[10,20,00,00,00,00,00,20,00,10],
			[10,00,00,00,00,00,00,00,00,10],
			[10,00,00,00,00,00,00,00,00,10],
			[10,20,00,00,00,00,00,20,00,10],
			[10,00,00,00,00,00,00,00,00,10],	
			[10,10,10,10,10,30,10,10,10,10]
		]

		this.consumers = [],
		this.seats = [{occupied: false, x: 50, y: 350}, 
					  {occupied: false, x: 150, y: 350}, 
					  {occupied: false, x: 350, y: 350}, 
					  {occupied: false, x: 400, y: 350}]

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

		// this.customer = {
		// 	init: function(){
		// 		this.customer.desire.cooked = this.getRandomInt(0, 5);
		// 		this.customer.desire.seasoned = this.getRandomInt(0, 5);
		// 		console.log(this.customer.desire.cooked + " " + this.customer.desire.seasoned)
		// 	},
		// 	oldX: 0,
		// 	oldY: 0,
		// 	xPOS: 250,
		// 	yPOS: 450,
		// 	money: 10,
		// 	hungry: true,
		// 	desire: {cooked: 0, seasoned: 0}
		// }

		this.register = {
			money: 0
		}

		//Menu methods
		this.interact = function(e, context){
			var mapCoords = this.map[this.hero.yPOS/50][this.hero.xPOS/50];

			if (mapCoords == 2){
				console.log("creating register")
				this.currentMenu = 'register'
				this.context.createMenu(this.currentMenu, this.context.menuContext, this.context.menuImage, 100, 150);
				this.inMenu = true;
			} else if (mapCoords == 3){
				console.log("creating kitchen")
				this.currentMenu = 'kitchen';				
				this.context.createMenu(this.currentMenu, this.context.menuContext, this.context.fightScreen, 0, 0);
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
			this.context.burgerContext.clearRect(0, 0, 500, 550);
			this.context.seasonContext.clearRect(0, 0, 500, 550);
			this.context.splashContext.clearRect(0, 0, 500, 550);
			this.inSplash = false;
			this.inMenu = false;
			this.inDialogue = false;
			this.atSelection.selected = 0;
			this.atSelection.prevSelected = 0;
		}

		this.menuCall = function(type){
			console.log(this);
			console.log(this);
			console.log("menu call actived with type: " +type)
			if (type == "REGISTER"){
				this.showFunds();
				this.exitMenu();
			} else if (type == "CUSTOMER"){
				// console.log(this);
				// console.log(this.consumers);
				// console.log(this.currentConsumer);
				// console.log(this.consumers[this.currentConsumer].yPOS);
				console.log(this);
				if (this.consumers[this.currentConsumer].yPOS == 250){
					this.exitMenu();
					this.customerOrder();
					this.inDialogue = true
				}
			} else if (type == "SERVE"){
				if (this.consumers[this.currentConsumer].yPOS == 250 && this.hero.hasFood == true){
					this.exitMenu();
					this.serveFood()
				}
			}  
			  else if (type == "EXIT"){
				this.exitMenu();
				}
			  else if (type == "COOK"){
					this.cookFood();
				} else if (type == "SEASON"){
					this.seasonFood();
				} else if (type == "PREPARE"){
					console.log("Sorry, this doesn't actually do anything")
				} else if (type == "WRAP"){
					this.wrapFood();
				}
		}
		

		//Register Methods

		this.customerOrder = function(){
			this.context.showDialogue([this.text.dialogue.generic[0],
									   this.text.dialogue.seasoned[this.consumers[this.currentConsumer].desire.seasoned],
									   this.text.dialogue.cooked[this.consumers[this.currentConsumer].desire.cooked]],
									   55, 325);
		}

		this.showFunds = function(){
			console.log("There are "+this.register.money+ " dollars in the register.");			
		}

		this.checkSatisfaction = function(){
			var actual = this.food.cookLevel + this.food.seasonLevel
			var goal = this.consumers[this.currentConsumer].desire.seasoned + this.consumers[this.currentConsumer].desire.cooked;
			if (goal == actual){
				return 0;
			} else if (actual == goal+1 || actual == goal-1){
				return 1;
			} else if (actual == goal+2 || actual == goal-2){
				return 2;
			} else {
				return 3;
			}
		}

		//Combat Methods

		this.cookFood = function(){
			if (this.food.cookLevel < 5){
				this.food.cookLevel +=1;
				this.context.hamburger.src = this.context.hamburgerGallery.gallery[this.food.cookLevel]
				this.context.hamburger.onload = function(){
					here.context.burgerContext.drawImage(here.context.hamburger, here.context.hamburgerGallery.xPOS, here.context.hamburgerGallery.yPOS)
				}
			} else {
				console.log("This food is wayyyy overcooked.")
			}
		}

		this.seasonFood = function(){
			if (this.food.seasonLevel < 5){
				this.food.seasonLevel +=1;
				this.context.seasoning.src = this.context.seasoningGallery.gallery[this.food.seasonLevel]
				this.context.seasoning.onload = function(){
					here.context.seasonContext.drawImage(here.context.seasoning, here.context.seasoningGallery.xPOS, here.context.seasoningGallery.yPOS)
				}
			} else {
				console.log("This food is wayyyy overseasoned.")
			}
		}

		this.wrapFood = function(){
			this.hero.hasFood = true;
			this.exitMenu();
		}

		this.serveFood = function(){
			var availSeats = _.where(this.seats, {occupied: false})
			this.context.showDialogue([this.text.dialogue.customerSatisfaction[this.checkSatisfaction()]], 55, 325);
			this.hero.hasFood = false;
			this.food.seasonLevel = 0;
			this.food.cookLevel = 0;
			this.consumers[this.currentConsumer].hungry = false;
			this.servedCustomer = this.consumers[this.currentConsumer].id;
			this.currentConsumer += 1;
			this.context.consumerWalk(this.consumers[this.servedCustomer], this.context.consumerImage, availSeats[0].x, availSeats[0].y);
			setTimeout(here.context.welcomeConsumer, 3000, here.consumers[here.currentConsumer]);	
			availSeats[0].occupied = true;													
		}

		//misc method (random numbers, etc)
		this.getRandomInt = function(min, max){
  			min = Math.ceil(min);
  			max = Math.floor(max);
  			return Math.floor(Math.random() * (max - min)) + min;
		}		

		this.fillConsumers = function(){
			for (var i = 0; i < 10; i++){
				this.consumers[i] = new Customer()
				this.consumers[i].init(i);
				}
			}

		this.showFreeSeats = function(){
			return _.where(this.seats, {occupied: false})
		}
		// }

	
		}
	return Game
})()