//move
var pet = document.querySelector("#pet");
var x = 0;
var y = 0;
var startX = 0;
var startY = 0;
var leaveGround = 0;
var pet_down = 10 ;
pet.addEventListener("touchstart", function (e) {
    startX = e.targetTouches[0].pageX;
    startY = e.targetTouches[0].pageY;
    x = this.offsetLeft;
    y = this.offsetTop;
});
pet.addEventListener("touchmove", function (e) {
    var moveX = e.targetTouches[0].pageX - startX;
    var moveY = e.targetTouches[0].pageY - startY;
    pet.style.left = x + moveX + "px";
    pet.style.top = y + moveY + "px";
    e.preventDefault();
});
pet.addEventListener("touchend", function () {
    leaveGround = 1;
});
//state
var direction = 1;
var texture_x = 0;
var texture_y = 0;
var state = 0;
sum();
function sum(){
	if(state<100){
		state++;
    }
    else{
    	state=0;
    }
    
    var pet_height = window.innerHeight - (pet.offsetTop - window.pageYOffset) - pet.offsetHeight;
    if(pet_height>0){
        if(direction==1){
           texture_y = -800;
           texture_x = 0;
        }
        else{
            texture_y = -800;
            texture_x = -800;
        }
        if(state<51){
            texture_x = texture_x - 400;
        }
    }
    else{
        if(direction==1){
            texture_y = 0;
            texture_x = 0;
        }
        else{
            texture_y = 0;
            texture_x = -400;
        }
        leaveGround = 0;
        pet_down = 0;
    }
    if(leaveGround==1){
        pet_down++;
    }
    document.documentElement.style.setProperty("--pet_img_x",texture_x+"px");
    document.documentElement.style.setProperty("--pet_img_y",texture_y+"px");
    pet.style.top=pet.offsetTop+pet_down+"px";
	setTimeout(sum,10);
}
