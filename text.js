var Text = (function(){

	var Text = function(){

		this.menus = {
			register: [{name: "CUSTOMER", xy: [150, 225]},
					   {name: "TAKE", xy: [275, 225]},
					   {name: "REGISTER", xy: [150, 275]},
					   {name: "EXIT", xy: [275, 275]}],
			
			kitchen: [{name: "PREPARE", xy: [150, 425]},
					  {name: "ITEM", xy: [275, 425]},
					  {name: "COOK", xy: [150, 475]},
					  {name: "WRAP", xy: [275, 475]}]
		},

		this.dialogue = {

		}
	}

	return Text
})()