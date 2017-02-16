var Context = (function(){
	var Context = function(){
		
		var here = this;

		this.foreground = document.getElementById("foreground");
		this.forContext = this.foreground.getContext("2d");
		this.background = document.getElementById("background");
		this.backContext = this.background.getContext("2d");
		this.menu = document.getElementById("menuPlace");
		this.menuContext = this.menu.getContext("2d");
		this.highlights = document.getElementById("highlights");
		this.highContext = this.highlights.getContext("2d");

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
		this.cook_select = new Image();
		this.cook_select.src = "./assets/cook_select.png"
		this.cook_selected = new Image();
		this.cook_selected.src = "./assets/cook_selected.png"
		this.cookSelect = {
			selectImage: this.cook_select,
			selectedImage: this.cook_selected,
			xLoc: 100,
			yLoc: 425
		}
		this.item_select = new Image();
		this.item_select.src = "./assets/item_select.png"
		this.item_selected = new Image();
		this.item_selected.src = "./assets/item_selected.png"
		this.itemSelect = {
			selectImage: this.item_select,
			selectedImage: this.item_selected,
			xLoc: 250,
			yLoc: 375
		}
		this.attack_select = new Image();
		this.attack_select.src = "./assets/attack_select.png"
		this.attack_selected = new Image();
		this.attack_selected.src = "./assets/attack_selected.png"
		this.attackSelect = {
			selectImage: this.attack_select,
			selectedImage: this.attack_selected,
			xLoc: 100,
			yLoc: 375
		}
		this.flee_select = new Image();
		this.flee_select.src = "./assets/flee_select.png"
		this.flee_selected = new Image();
		this.flee_selected.src = "./assets/flee_selected.png"
		this.fleeSelect = {
			selectImage: this.flee_select,
			selectedImage: this.flee_selected,
			xLoc: 250,
			yLoc: 425
		}
		this.monster = new Image();
		this.monster.src = "./assets/monster_standin.png"		

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




		this.register_select = new Image();
		this.register_select.src = ("./assets/register_select.png");
		this.register_selected = new Image();
		this.register_selected.src = ("./assets/register_selected.png");
		this.rSelect = {
			selectImage: this.register_select,
			selectedImage: this.register_selected,
			xLoc: 150,
			yLoc: 250,
			type: "register"
		}		

		this.exit_select = new Image();
		this.exit_select.src = ("./assets/exit_select.png");
		this.exit_selected = new Image();
		this.exit_selected.src = ("./assets/exit_selected.png");
		this.eSelect = {
			selectImage: this.exit_select,
			selectedImage: this.exit_selected,
			xLoc: 250,
			yLoc: 250,
			type: "exit"
		}

		this.customer_select = new Image();
		this.customer_select.src = ("./assets/customer_select.png");		
		this.customer_selected = new Image();
		this.customer_selected.src = ("./assets/customer_selected.png");
		this.cSelect = {
			selectImage: this.customer_select,
			selectedImage: this.customer_selected,
			xLoc: 150,
			yLoc: 200,
			type: "customer"
		}

		this.take_selected = new Image();
		this.take_selected.src = ("./assets/take_selected.png");
		this.take_select = new Image();
		this.take_select.src = ("./assets/take_select.png");
		this.tSelect = {
			selectImage: this.take_select,
			selectedImage: this.take_selected,
			xLoc: 250,
			yLoc: 200,
			type: "take"
		}		

		this.menuImage = new Image();
		this.menuImage.src = ("./assets/menutemplate.png");

		this.createMenu = function(type, contextLayer, image, x, y){
			if (type == 'register'){			
				contextLayer.drawImage(image, x, y);
				contextLayer.drawImage(here.cSelect.selectImage, here.cSelect.xLoc,here.cSelect.yLoc)
				contextLayer.drawImage(here.eSelect.selectImage, here.eSelect.xLoc,here.eSelect.yLoc);
				contextLayer.drawImage(here.rSelect.selectImage, here.rSelect.xLoc,here.rSelect.yLoc);
				contextLayer.drawImage(here.tSelect.selectImage, here.tSelect.xLoc,here.tSelect.yLoc);
				this.highlight(here.cSelect.selectedImage, here.cSelect.xLoc, here.cSelect.yLoc)
			} else if (type == 'kitchen'){			
				contextLayer.drawImage(image, x, y);
				contextLayer.drawImage(here.attackSelect.selectImage, here.attackSelect.xLoc,here.attackSelect.yLoc)
				contextLayer.drawImage(here.cookSelect.selectImage, here.cookSelect.xLoc,here.cookSelect.yLoc);
				contextLayer.drawImage(here.fleeSelect.selectImage, here.fleeSelect.xLoc,here.fleeSelect.yLoc);
				contextLayer.drawImage(here.itemSelect.selectImage, here.itemSelect.xLoc,here.itemSelect.yLoc);
				this.highlight(here.attackSelect.selectedImage, here.attackSelect.xLoc, here.attackSelect.yLoc)

			}
		}

		this.highlight = function(image, x, y){
			here.highContext.drawImage(image, x, y)
		}

		this.menuSelect = function(context, image, x, y){
			context.drawImage(image, x, y, image.width, image.height)
		}

		this.removeImage = function(context, x, y, w, h){
			context.clearRect(x,y,w,h);
		}

		this.welcomeConsumer = function(consumer){
			here.consumerImage.src = here.consumers[consumer].src;
			here.consumerImage.onload = function(){
				here.forContext.drawImage(here.consumerImage, 250, 450);
			}
			setTimeout(here.consumerWalk, 3000, here.consumerImage, here.consumers[consumer]);			
		}

		this.consumerWalk = function(consumerImage, consumer){
			var walkInterval = setInterval(function(){
			here.forContext.clearRect(consumer.xCur,consumer.yCur,consumerImage.height, consumerImage.width);
			consumer.yCur-=50;
			here.forContext.drawImage(here.consumerImage, consumer.xCur, consumer.yCur);
			if (consumer.yCur == 250){
				clearInterval(walkInterval);
			}			
			}, 1000)
		}

		this.saveAll = function(){
			console.log('saving');
			here.forContext.save();
			here.backContext.save();
			here.menuContext.save();
			here.highContext.save();
		}

		this.restoreAll = function(){
			console.log('restoring');
			here.forContext.restore();
			here.backContext.restore();
			here.menuContext.restore();
			here.highContext.restore();
		}

		this.clearAll = function(){
			console.log('clearing');
			here.forContext.clearRect(0, 0, 500, 550);
			here.backContext.clearRect(0, 0, 500, 550);
			here.menuContext.clearRect(0, 0, 500, 550);
			here.highContext.clearRect(0, 0, 500, 550);
		}

		this.menuChoices = {
			register: [here.cSelect, here.tSelect, here.rSelect, here.eSelect],
			kitchen: [here.attackSelect, here.itemSelect, here.cookSelect, here.fleeSelect]
		}



	}
	return Context;
})()