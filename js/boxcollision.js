function game(number,parent,){
	this.number = number;
	this.parent = parent;
	var x;
	var y;
	var box;
	var speed;

	var parentElement = document.querySelector('.'+parent);
	parentElement.style.position = 'relative';

	function box(){
		for(var i= 0; i<number; i++){
			speed = randomNumber(1,5);
			x = randomNumber(0,490);
			y = randomNumber(0,490);      
			box[i] = document.createElement('div');
			parentElement.appendChild(box[i]);
			box[i].setAttribute('style','width:10px;height:10px;background:red;position:absolute');
			position(box[i],x,y);
			
		}
		boxCollision();
		movement(randomNumber(-speed,speed),randomNumber(-speed,speed));
	}


	function boxCollision(){
		for(var i = 0; i<number; i++){
			for (var j = 0;j<i;j++){
				if(i!=j){
					if(parseInt(box[i].style.left)<parseInt(box[j].style.left)+parseInt(box[j].style.width)&&parseInt(box[j].style.left)<parseInt(box[i].style.left)+parseInt(box[i].style.width)&&parseInt(box[i].style.top)<parseInt(box[j].style.top)+parseInt(box[j].style.height)&&parseInt(box[j].style.top)<parseInt(box[i].style.top)+parseInt(box[i].style.height)){
						position(box[i],randomNumber(0,490),randomNumber(0,490));
						console.log("collide");
						boxCollision();
					}
				}
			}
		}
	}


	box(this.number);

	function randomNumber(min, max) {
    	return Math.random() * (max - min) + min;
  		}

  	
  	function position(box,x,y){
		box.style.left = x+'px';
		box.style.top = y+'px'; 
	}

	function movement(x,y){
		for (var i =0; i<number;i++){
			var up = parseInt(box[i].style.top);
			var left = parseInt(box[i].style.left);
			setInterval(function(){
				console.log(i);
				// if(collisionCheck(box[i])=='rightCol'||collisionCheck(box[i])=='leftCol'){
				// 	x = x*-1;
				// }
				// else if(collisionCheck(box[i])=='topCol'||collisionCheck(box[i])=='botCol'){
				// 	y = y*-1;
				// }
				// up+=y;
				// left+=x;
				// box[i].style.left = left+'px';
				// box[i].style.top = up+'px';
			},10);
		}
	}

	function collisionCheck(box){
		//for boundary
		console.log(box);
		// if(parseInt(box.style.left)>490){
		// 	return 'rightCol';
		// }
		// else if(parseInt(box.style.left)<0)
		// 	return 'leftCol';
		// else if(parseInt(box.style.top)>490)
		// 	return 'botCol';
		// else if(parseInt(box.style.top)<0)
		// 	return 'topCol';

	}
}

var game1 = new game(20,'game');