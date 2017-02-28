var Text = (function(){

	var Text = function(){

		this.menus = {
			register: [{name: "CUSTOMER", xy: [150, 225]},
					   {name: "SERVE", xy: [275, 225]},
					   {name: "REGISTER", xy: [150, 275]},
					   {name: "EXIT", xy: [275, 275]}],
			
			kitchen: [{name: "PREPARE", xy: [150, 425]},
					  {name: "SEASON", xy: [275, 425]},
					  {name: "COOK", xy: [150, 475]},
					  {name: "WRAP", xy: [275, 475]}]
		},

		this.dialogue = {
			generic: ["Yeah uh can I get, you know, a hamburger?"],
			seasoned: ["Not too seasoned.", "Lightly salted, please.", "Salt and pepper.", "Heavy on the pepper, okay?", "I want more seasoning than hamburger."],
			cooked: ["Just as raw as you can make it.", "Slightly pink, please.", "Just cook it medium.", "Cook it medium well.", "I just want the charred remains of meat."],
			customerSatisfaction: ["Wow, this is exactly what I wanted!", 
								   "Yeah this is okay.", 
								   "This was not great.", 
								   "I am never coming here again."],
			tips: ["Enjoy your tip!",
				   "Here's a small bonus.",
				   "",
				   "I am not paying for this."]					   
		}
	}

	return Text
})()