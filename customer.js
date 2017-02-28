var Customer = (function(){
	var Customer = function(){

		var here = this;
		this.game,
		this.context,
		this.id,
		this.xSeat = 0,
		this.ySeat = 0,
		this.xPOS= 250,
		this.xOld,
		this.yPOS= 450,
		this.yOld,
		this.money= 10,
		this.hungry= true,
		this.desire= {cooked: 0, seasoned: 0},
		this.src = "./assets/consumer.png",

		this.init = function(id, game, context){
			here.desire.cooked = here.getRandomInt(0, 5);
			here.desire.seasoned = here.getRandomInt(0, 5);
			here.id = id;
			here.game = game;
			here.context = context;	
		},

		this.moveCustomer = function(customer, x, y){
				var walkInterval = setInterval(function(){
					if (customer.yPOS > y){	
						if (here.game.lookAhead("up", customer.xPOS, customer.yPOS) == true){
							here.context.forContext.clearRect(customer.xPOS,customer.yPOS,here.context.consumerImage.height, here.context.consumerImage.width);
							customer.yPOS -= 50;
							here.context.forContext.drawImage(here.context.consumerImage,customer.xPOS,customer.yPOS);
						}
						//draw stuff
					} else if (customer.yPOS < y){
						if (here.game.lookAhead("down", customer.xPOS, customer.yPOS) == true){
							here.context.forContext.clearRect(customer.xPOS,customer.yPOS,here.context.consumerImage.height, here.context.consumerImage.width);	
							customer.yPOS += 50;
							here.context.forContext.drawImage(here.context.consumerImage,customer.xPOS,customer.yPOS);
						}
					}

					if (customer.xPOS < x){
						if (here.game.lookAhead("right", customer.xPOS, customer.yPOS) == true){
							here.context.forContext.clearRect(customer.xPOS,customer.yPOS,here.context.consumerImage.height, here.context.consumerImage.width);
							customer.xPOS += 50;
							here.context.forContext.drawImage(here.context.consumerImage,customer.xPOS,customer.yPOS);
						}
					} else if (customer.xPOS > x){
						if (here.game.lookAhead("left", customer.xPOS, customer.yPOS) == true){
							here.context.forContext.clearRect(customer.xPOS,customer.yPOS,here.context.consumerImage.height, here.context.consumerImage.width);
							customer.xPOS -= 50;
							here.context.forContext.drawImage(here.context.consumerImage,customer.xPOS,customer.yPOS);
						}
					}
					if (customer.xPOS == 250 && customer.yPOS == 500){
						here.context.forContext.clearRect(customer.xPOS,customer.yPOS,here.context.consumerImage.height, here.context.consumerImage.width);
						clearInterval(walkInterval)
					};
					if (customer.xPOS == x && customer.yPOS == y){
						clearInterval(walkInterval)
					}}, 1000
				);		
		}


		this.getRandomInt = function(min, max){
  			min = Math.ceil(min);
  			max = Math.floor(max);
  			return Math.floor(Math.random() * (max - min)) + min;
		}


	}

	return Customer;
	
})()