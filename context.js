var Context = (function(){
	var Context = function(){
		
		var here = this;

		this.foreground = document.getElementById("foreground");
		this.forContext = this.foreground.getContext("2d");
		this.background = document.getElementById("background");
		this.backContext = this.background.getContext("2d");
		this.menu = document.getElementById("menuPlace");
		this.menuContext = this.menu.getContext("2d");

		this.worker = new Image();
		this.worker.src = "./assets/hero.png";
		this.createWorker = function(){
			here.forContext.drawImage(here.worker, thisGame.hero.xPOS, thisGame.hero.yPOS);			
		}
		this.worker.onload = function(){
			here.createWorker();
		}
		// this.worker.onload = function(){
		// 	here.forContext.drawImage(here.worker, thisGame.hero.xPOS, thisGame.hero.yPOS);
		// }

		this.brick = new Image();
		this.brick.src = ("./assets/brick.png");
		this.brick.onload = function(){
			var xCur = 0;
			var yCur = 0;
			_.each(thisGame.map, function(row){
				_.each(row, function(cell){
					//if cell has a 1, place a wall
					if (cell==1){
						here.backContext.drawImage(here.brick, xCur, yCur);
						xCur+=50;
					} else {
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
		this.createMenu = function(type, image, x, y){			
			type.drawImage(image, x, y)
		}

		this.removeImage = function(context, x, y, w, h){
			context.clearRect(x,y,w,h);
		}




	}
	return Context;
})()