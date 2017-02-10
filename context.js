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

		this.customer_select = new Image();
		this.customer_select.src = ("./assets/customer_select.png");
		this.register_select = new Image();
		this.register_select.src = ("./assets/register_select.png");
		this.exit_select = new Image();
		this.exit_select.src = ("./assets/exit_select.png");

		this.menuImage = new Image();
		this.menuImage.src = ("./assets/menutemplate.png");
		this.createMenu = function(type, image, x, y){			
			type.drawImage(image, x, y);
			type.drawImage(this.customer_select, x+50, y+50);
			type.drawImage(this.register_select, x+50, y+100);
			type.drawImage(this.exit_select, x+150, y+50);
		}

		this.removeImage = function(context, x, y, w, h){
			context.clearRect(x,y,w,h);
		}




	}
	return Context;
})()