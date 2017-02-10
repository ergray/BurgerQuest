window.onload = function(){
	thisGame = new Game();
	var context = new Context();
	thisGame.context = context;

	window.addEventListener('keydown', function(e){
		if (thisGame.inMenu == false){
			if (e.keyCode == 87 || e.keyCode == 83 || e.keyCode == 65 || e.keyCode == 68){
				thisGame.repos(e, context.worker)
			} else if (e.keyCode == 32){
				thisGame.interact(e, context.menu, context.menuContext);
			}} else if (thisGame.inMenu == true){
				if (e.keyCode == 27){
					thisGame.exitMenu();
				}
			}
		}, true)

}