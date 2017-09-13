var Context = (function(game){
	var Context = function(game){
		
		var here = this;
		this.text;
		this.game = game;
		this.audio;

		this.foreground = document.getElementById("foreground");
		this.forContext = this.foreground.getContext("2d");
		this.background = document.getElementById("background");
		this.backContext = this.background.getContext("2d");
		this.menu = document.getElementById("menuPlace");
		this.menuContext = this.menu.getContext("2d");
		this.textuals = document.getElementById("textLayer");
		this.textContext = this.textuals.getContext("2d");
		this.burgers = document.getElementById("burgerLayer");
		this.burgerContext = this.burgers.getContext("2d");
		this.seasons = document.getElementById("seasonLayer");
		this.seasonContext = this.seasons.getContext("2d");
		this.splash = document.getElementById("splashLayer");
		this.splashContext = this.splash.getContext("2d");

		this.drawMap = function(){
			var xCur = 0;
			var yCur = 0;
			_.each(here.game.map, function(row){
				_.each(row, function(cell){
					if (cell==10){
						here.backContext.drawImage(here.brick, xCur, yCur);
						xCur+=50;
					} else if (cell==20){
						here.backContext.drawImage(here.table, xCur, yCur);
						xCur+=50;
					} else if (cell==09){
						here.backContext.drawImage(here.door, xCur, yCur);
						xCur+=50;
					} else if (cell==40){
						here.backContext.drawImage(here.stovetop, xCur, yCur);
						xCur+=50;
					} else if (cell==50){
						here.backContext.drawImage(here.stovemiddle, xCur, yCur);
						xCur+=50;
					} else if (cell==60){
						here.backContext.drawImage(here.stovebottom, xCur, yCur);
						xCur+=50;
					}else {
						xCur+=50;
					}
					//if xCur reaches 500, draw next row of map array				
					if (xCur == 500){
						xCur=0;
						yCur+=50;
					}
				})
			})
		}		

		this.worker = new Image();
		this.worker.src = "./assets/hero.png";
		this.createWorker = function(){
			here.forContext.drawImage(here.worker, here.game.hero.xPOS, here.game.hero.yPOS);	
		}


		this.money = new Image();
		this.money.src = ("./assets/money.png");

		this.worker.onload = function(){
			here.createWorker();
		}

		this.splashScreen = new Image();
		this.splashScreen.src = "./assets/splash_screen.png"

		this.start = function(){
			here.splashScreen.onload = function(){
				here.splashContext.drawImage(here.splashScreen, 0, 0)
				here.audio.loadSound("./assets/burgerIntro.mp3")
			}
		}

		//fight screen:
		this.fightScreen = new Image();
		this.fightScreen.src = "./assets/fightscreen.png"

		this.hamburger = new Image();
		this.hamburgerGallery = {
			gallery: ["./assets/raw_burger.png",
					"./assets/medium_raw.png",
					"./assets/medium_burger.png",
					"./assets/medium_well.png",
					"./assets/charred_burger.png"],
			xPOS: 75,
			yPOS: 100
		}

		this.seasoning = new Image();
		this.seasoningGallery = {
			gallery: [0,
					"./assets/salt.png",
					"./assets/salt_pepper.png",
					"./assets/pepper_too.png",
					"./assets/seasoned.png"],
			xPOS: 75,
			yPOS: 100
		}

		this.consumerImage = new Image();

		this.door = new Image()
		this.door.src = "./assets/door.png"
		
		this.stovetop = new Image();
		this.stovetop.src =("./assets/stovetop.png");

		this.stovemiddle = new Image();
		this.stovemiddle.src = ("./assets/stovemiddle.png");

		this.stovebottom = new Image();
		this.stovebottom.src = ("./assets/stovebottom.png");	

		this.table = new Image();
		this.table.src = ("./assets/table.png");

		this.brick = new Image();
		this.brick.src = ("./assets/brick.png");

		this.money.onload=function(){
			here.forContext.drawImage(here.money, 250, 200);
		}		

		this.menuImage = new Image();
		this.menuImage.src = ("./assets/menutemplate.png");

		this.createMenu = function(type, contextLayer, image, x, y){
				here.textContext.font="20px Ariel";		
				contextLayer.drawImage(image, x, y);
				_.each(this.text.menus[type], function(value, key){
					if (key == 0){
						here.textContext.fillStyle="#ffff66";
						here.textContext.fillText(value.name, value.xy[0], value.xy[1])
					} else {
						here.textContext.fillStyle="#ffffff";	
						here.textContext.fillText(value.name, value.xy[0], value.xy[1])}
				})
				if (type == "kitchen"){
					here.hamburger.src = here.hamburgerGallery.gallery[here.game.food.cookLevel];
					here.hamburger.onload = function(){
						here.burgerContext.drawImage(here.hamburger, here.hamburgerGallery.xPOS, here.hamburgerGallery.yPOS);
					}				
				}

			}

		this.removeImage = function(context, x, y, w, h){
			context.clearRect(x,y,w,h);
		}

		this.highlightText = function(old, current, menu){
				here.textContext.font = "20px";
				here.textContext.fillStyle = "#ffffff";
				here.textContext.fillText(here.text.menus[menu][old].name,
										   here.text.menus[menu][old].xy[0],
										   here.text.menus[menu][old].xy[1]
										  )
				here.textContext.fillStyle = "#ffff66";
				here.textContext.fillText(here.text.menus[menu][current].name,
										   here.text.menus[menu][current].xy[0],
										   here.text.menus[menu][current].xy[1]
										  )				
		}

		this.welcomeConsumer = function(consumer){
			here.consumerImage.src = consumer.src;
			here.consumerImage.onload = function(){
				here.forContext.drawImage(here.consumerImage, 
										  consumer.xPOS, 
										  consumer.yPOS);				
				here.audio.loadSound("./assets/doorbell.mp3")		
			}
			setTimeout(consumer.moveCustomer, 3000, consumer, 250, 250);			
		}

		this.goHome = function(customer){
			customer.moveCustomer(customer, 250, 500);
			_.findWhere(here.game.seats, {x: customer.xSeat, y: customer.ySeat}).occupied = false;

		}

		this.showDialogue = function(dialogue, x, y){
			var x = x;
			var y = y;
			here.game.inDialogue = true;
			here.menuContext.fillRect(50, 300, 400, 200);
			here.textContext.font = "20px";
			here.textContext.fillStyle = "#ffffff";
			_.each(dialogue, function(value, key){
				here.textContext.fillText(value, x, y);
				y+=20;
			})
		}

	}
	return Context;
})()