var Customer = (function(){
	var Customer = function(){

		var here = this;
		this.id,
		this.xPOS= 250,
		this.yPOS= 450,
		this.money= 10,
		this.hungry= true,
		this.desire= {cooked: 0, seasoned: 0},
		this.src = "./assets/consumer.png",

		this.init = function(id){
			here.desire.cooked = here.getRandomInt(0, 5);
			here.desire.seasoned = here.getRandomInt(0, 5);
			here.id = id;
		},


		this.getRandomInt = function(min, max){
  			min = Math.ceil(min);
  			max = Math.floor(max);
  			return Math.floor(Math.random() * (max - min)) + min;
		}


	}

	return Customer;
	
})()