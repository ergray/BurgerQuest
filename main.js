window.onload = function(){
	thisGame = new Game();
	var context = new Context();
	thisGame.context = context;

	window.addEventListener('keydown', function(e){
		if (thisGame.inMenu == false){
			if (e.keyCode == 87 || e.keyCode == 83 || e.keyCode == 65 || e.keyCode == 68){
				thisGame.repos(e, context.worker)
			} else if (e.keyCode == 74){
				context.saveAll();
			} else if (e.keyCode == 75){
				context.restoreAll();
			} else if (e.keyCode == 76){
				context.clearAll();
			} else if (e.keyCode == 32){//space
				thisGame.interact(e, context.menu, context.menuContext);
			}} else if (thisGame.inMenu == true){
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
					context.removeImage(context.highContext,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].xLoc,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].yLoc,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].selectedImage.width,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].selectedImage.height);
					thisGame.exitMenu();
					return;
				} else if (e.keyCode == 32){//space
					thisGame.menuCall(context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].type)
					context.removeImage(context.highContext,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].xLoc,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].yLoc,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].selectedImage.width,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].selectedImage.height);
					
					thisGame.exitMenu();
					thisGame.menuCall(context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].type)
					return;
				}
				if (thisGame.atSelection.selected < 0){
					thisGame.atSelection.selected = 4-Math.abs(thisGame.atSelection.selected);
				} else if (thisGame.atSelection.selected > 3){
					thisGame.atSelection.selected = 0+(thisGame.atSelection.selected-4);
				}
				//remove highlight from old selection
				context.removeImage(context.highContext,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.prevSelected].xLoc,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.prevSelected].yLoc,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.prevSelected].selectedImage.width,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.prevSelected].selectedImage.height);
				//add highlight to new selection
				context.menuSelect(context.highContext,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].selectedImage,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].xLoc,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].yLoc,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].selectedImage.width,
										context.menuChoices[thisGame.currentMenu][thisGame.atSelection.selected].selectedImage.height);
			}
		}, true)

	setTimeout(context.welcomeConsumer, 5000, thisGame.currentConsumer);

}