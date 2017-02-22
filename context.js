var Context = (function(){
	var Context = function(){
		
		var here = this;
		this.text;
		this.game;

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

		this.worker = new Image();
		this.worker.src = "./assets/hero.png";
		this.createWorker = function(){
			here.forContext.drawImage(here.worker, thisGame.hero.xPOS, thisGame.hero.yPOS);			
		}
		this.worker.onload = function(){
			here.createWorker();
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


		this.consumers = [{name: "tony", src: "./assets/consumer.png", xCur: 250, yCur: 450}]
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
		this.brick.onload = function(){
			var xCur = 0;
			var yCur = 0;
			_.each(thisGame.map, function(row){
				_.each(row, function(cell){
					//if cell has a 10, place a wall
					if (cell==10){
						here.backContext.drawImage(here.brick, xCur, yCur);
						xCur+=50;
					} else if (cell==20){
						here.backContext.drawImage(here.table, xCur, yCur);
						xCur+=50;
					} else if (cell==30){
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

		this.money = new Image();
		this.money.src = ("./assets/money.png");
		this.money.onload=function(){
			here.forContext.drawImage(here.money, 250, 200);
		}		

		this.menuImage = new Image();
		this.menuImage.src = ("./assets/menutemplate.png");

		this.createMenu = function(type, contextLayer, image, x, y){
				console.log(type);
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

					console.log(here.game.food.cookLevel);
					console.log(here.hamburgerGallery);
					console.log(here.hamburgerGallery.gallery[here.game.food.cookLevel]);
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
			here.consumerImage.src = here.consumers[consumer].src;
			here.consumerImage.onload = function(){
				here.forContext.drawImage(here.consumerImage, here.game.customer.xPOS, here.game.customer.yPOS);
			}
			setTimeout(here.consumerWalk, 3000, here.consumerImage, 250, 250);			
		}

		this.consumerWalk = function(consumerImage, targetX, targetY){
				var walkInterval = setInterval(function(){
				if (here.game.customer.yPOS != targetY){
					here.forContext.clearRect(here.game.customer.xPOS,here.game.customer.yPOS,consumerImage.height, consumerImage.width);
					if (here.game.customer.yPOS > targetY){
						here.game.customer.yPOS-=50;
					} else if (here.game.customer.yPOS < targetY){
						here.game.customer.yPOS+=50;
					}
					here.forContext.drawImage(here.consumerImage, here.game.customer.xPOS, here.game.customer.yPOS);
				}

				if (here.game.customer.xPOS != targetX){
					here.forContext.clearRect(here.game.customer.xPOS,here.game.customer.yPOS,consumerImage.height, consumerImage.width);
					if (here.game.customer.xPOS > targetX){
						here.game.customer.xPOS-=50;
					} else if (here.game.customer.yPOS < targetX){
						here.game.customer.xPOS+=50;
					}
				here.forContext.drawImage(here.consumerImage, here.game.customer.xPOS, here.game.customer.yPOS);					
				}
				
				if (here.game.customer.yPOS == targetY && here.game.customer.xPOS == targetX){
					clearInterval(walkInterval);
				}			
				}, 1000)
		}

		this.showDialogue = function(dialogue, x, y){
			var x = x;
			var y = y;
			here.menuContext.fillRect(50, 300, 400, 200);
			here.textContext.font = "20px";
			here.textContext.fillStyle = "#ffffff";
			_.each(dialogue, function(value, key){
				here.textContext.fillText(value, x, y);
				y+=20;
			})
		}

		this.clearAll = function(){
			console.log('clearing');
			here.forContext.clearRect(0, 0, 500, 550);
			here.backContext.clearRect(0, 0, 500, 550);
			here.menuContext.clearRect(0, 0, 500, 550);
			here.textContext.clearRect(0, 0, 500, 550);
		}



	}
	return Context;
})()