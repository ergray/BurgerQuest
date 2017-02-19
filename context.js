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

		this.monster = new Image();
		this.monster.src = "./assets/monster_standin.png"
		this.monsterObj = {
			image: this.monster,
			xLoc: 100,
			yLoc: 50
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
			setTimeout(here.consumerWalk, 3000, here.consumerImage, here.consumers[consumer]);			
		}

		this.consumerWalk = function(consumerImage, consumer){
			var walkInterval = setInterval(function(){
			here.forContext.clearRect(here.game.customer.xPOS,here.game.customer.yPOS,consumerImage.height, consumerImage.width);
			here.game.customer.yPOS-=50;
			here.forContext.drawImage(here.consumerImage, here.game.customer.xPOS, here.game.customer.yPOS);
			if (here.game.customer.yPOS == 250){
				clearInterval(walkInterval);
			}			
			}, 1000)
		}

		this.showDialogue = function(){
			here.menuContext.fillRect(50, 300, 400, 200);
			here.textContext.font = "20px";
			here.textContext.fillStyle = "#ffffff";
			here.textContext.fillText(here.text.dialogue.generic[0], 55, 325);
			here.textContext.fillText(here.text.dialogue.seasoned[0], 55, 345);
			here.textContext.fillText(here.text.dialogue.cooked[0], 55, 365);
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