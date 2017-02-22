window.onload = function(){
	thisGame = new Game();
	var context = new Context();
	var text = new Text();
	thisGame.context = context;
	thisGame.text = text;
	context.text = text;
	context.game = thisGame;

	window.addEventListener('keydown', function(e){
		if (thisGame.inMenu == false && thisGame.inDialogue == false){
			if (e.keyCode == 87 || e.keyCode == 83 || e.keyCode == 65 || e.keyCode == 68){
				thisGame.repos(e, context.worker)
			} else if (e.keyCode == 74){
				context.saveAll();
			} else if (e.keyCode == 75){
				context.restoreAll();
			} else if (e.keyCode == 76){
				context.clearAll();
			} else if (e.keyCode == 32){//space
				console.log("calling space")
				thisGame.interact(e, context.menu, context.menuContext);
			}} else if (thisGame.inMenu == true){
				var currentMenu = thisGame.currentMenu
				thisGame.atSelection.prevSelected = thisGame.atSelection.selected;
				if (e.keyCode == 87){//w up
					thisGame.atSelection.selected-=2;
				} else if (e.keyCode == 65){//a Left
					thisGame.atSelection.selected-=1;
				} else if (e.keyCode == 83){//s down
					thisGame.atSelection.selected-=2;
				} else if (e.keyCode == 68){//d Right
					thisGame.atSelection.selected+=1;
				} else if (e.keyCode == 27){//escape
					thisGame.exitMenu();
					return;
				} else if (e.keyCode == 32){//space	
					console.log("calling space")	
					thisGame.menuCall(text.menus[currentMenu][thisGame.atSelection.selected].name)
					return;
				}
				if (thisGame.atSelection.selected < 0){
					thisGame.atSelection.selected = 4-Math.abs(thisGame.atSelection.selected);
				} else if (thisGame.atSelection.selected > 3){
					thisGame.atSelection.selected = 0+(thisGame.atSelection.selected-4);
				}
				context.highlightText(thisGame.atSelection.prevSelected, thisGame.atSelection.selected, thisGame.currentMenu)
				} else if (thisGame.inDialogue == true){
					if (e.keyCode == 27){//escape
						thisGame.exitMenu();
						return;
				}
			}
		}, true)

	setTimeout(context.welcomeConsumer, 5000, thisGame.currentConsumer);
	thisGame.customer.init();

}