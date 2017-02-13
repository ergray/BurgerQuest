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
		this.createMenu = function(contextLayer, image, x, y){			
			contextLayer.drawImage(image, x, y);
			contextLayer.drawImage(here.cSelect.selectImage, here.cSelect.xLoc,here.cSelect.yLoc)
			contextLayer.drawImage(here.eSelect.selectImage, here.eSelect.xLoc,here.eSelect.yLoc);
			contextLayer.drawImage(here.rSelect.selectImage, here.rSelect.xLoc,here.rSelect.yLoc);
			contextLayer.drawImage(here.tSelect.selectImage, here.tSelect.xLoc,here.tSelect.yLoc);
			this.highlight(here.cSelect.selectedImage, here.cSelect.xLoc, here.cSelect.yLoc)
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




	}
	return Context;
})()