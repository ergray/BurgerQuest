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
				thisGame.registerMenu.prevSelected = thisGame.registerMenu.selected;
				var selections = [[thisGame.context.cSelect],
				 				  [thisGame.context.tSelect],
				  				  [thisGame.context.rSelect],
				   				  [thisGame.context.eSelect]];
				if (e.keyCode == 87){//w up
					thisGame.registerMenu.selected-=2;
				} else if (e.keyCode == 65){//a Left
					thisGame.registerMenu.selected-=1;
				} else if (e.keyCode == 83){//s down
					thisGame.registerMenu.selected-=2;
				} else if (e.keyCode == 68){//d Right
					thisGame.registerMenu.selected+=1;
				} else if (e.keyCode == 27){
					thisGame.exitMenu();
				}
				if (thisGame.registerMenu.selected < 0){
					thisGame.registerMenu.selected = 4-Math.abs(thisGame.registerMenu.selected);
				} else if (thisGame.registerMenu.selected > 3){
					thisGame.registerMenu.selected = 0+(thisGame.registerMenu.selected-4);
				}
				//remove highlight from old selection
				console.log(thisGame.registerMenu.selected);
				console.log(thisGame.registerMenu.prevSelected);
				context.removeImage(context.highContext,
				 					selections[thisGame.registerMenu.prevSelected][0].xLoc,
				 					selections[thisGame.registerMenu.prevSelected][0].yLoc, 
				 					selections[thisGame.registerMenu.prevSelected][0].selectedImage.width, 
				 					selections[thisGame.registerMenu.prevSelected][0].selectedImage.height);
				//add highlight to new selection
				context.menuSelect(context.highContext,
								   selections[thisGame.registerMenu.selected][0].selectedImage,
								   selections[thisGame.registerMenu.selected][0].xLoc,
								   selections[thisGame.registerMenu.selected][0].yLoc,
								   selections[thisGame.registerMenu.selected][0].selectedImage.width,
								   selections[thisGame.registerMenu.selected][0].selectedImage.height
								   )
				//redaw original item, unhighlighted (merge with step 1?)
				//not necessary with multiple layers
			}
		}, true)

}