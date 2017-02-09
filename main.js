window.onload = function(){
	var foreground = document.getElementById("foreground");
	var forContext = foreground.getContext("2d");
	var background = document.getElementById("background");
	var backContext = background.getContext("2d");

	var brick = new Image();
	brick.src = ("./assets/brick.png");

	brick.onload = function(){
		var xCur = 0;
		var yCur = 0;
		_.each(Game.map, function(row){
			_.each(row, function(cell){
				//if cell has a 1, place a wall
				if (cell==1){
					backContext.drawImage(brick, xCur, yCur);
					xCur+=50;
				//0 is walkable terrain	
				// } else if (cell==0){
				// 	xCur+=50;
				// }
				} else {
					xCur+=50;
				}				
				if (xCur == 500){
					xCur=0;
					yCur+=50;
				}
			})
		})
	}

	var worker = new Image();
	worker.src = ("./assets/hero.png");
	worker.onload = function(){
		forContext.drawImage(worker, Game.hero.xPOS, Game.hero.yPOS);
	}

	var money = new Image();
	money.src = ("./assets/money.png");
	money.onload=function(){
		forContext.drawImage(money, 250, 200);
	}


	window.addEventListener('keydown', function(e){
		if (e.keyCode == 87 || e.keyCode == 83 || e.keyCode == 65 || e.keyCode == 68){
			Game.repos(e, worker)
		} else if (e.keyCode == 32){
			Game.interact(e);
		}}, true)
}