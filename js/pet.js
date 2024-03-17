//move
var pet = document.querySelector("#pet");
var x = 0;
var y = 0;
var startX = 0;
var startY = 0;
var leaveGround = 0;
var pet_down = 0 ;
pet.addEventListener("touchstart", function (e) {
    startX = e.targetTouches[0].pageX;
    startY = e.targetTouches[0].pageY;
    x = this.offsetLeft;
    y = this.offsetTop;
    leaveGround = 0;
    pet_down = 0;
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
var x_move = 0;
var action = 0;
var state = 0;
var action_state = "stand";
var action_state_time = Math.round(Math.random()*(500-50)+50);
var action_state_list = ["stand","walk","sleep"];
sum();
function sum(){
    //action
	if(action<100){
		action++;
    }
    else{
    	action=0;
    }
    //state
    if(state<1000){
		state++;
    }
    else{
    	state=0;
    }
    if(state==action_state_time){
        action_state=action_state_list[Math.round(Math.random()*(2-0)+0)];
        direction=Math.round(Math.random());
        action_state_time = Math.round(Math.random()*(1000-50)+50);
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
        if(action<51){
            texture_x = texture_x - 400;
        }
        x_move = 0;
    }
    else{
        if(action_state=="stand"){
            if(direction==1){
                texture_y = 0;
                texture_x = 0;
            }
            else{
                texture_y = 0;
                texture_x = -400;
            }
            x_move = 0;
        }
        if(action_state=="walk"){
            if(direction==1){
                texture_y = -400;
                texture_x = 0;
                x_move = 1;
            }
            else{
                texture_y = -400;
                texture_x = -800;
                x_move = -1;
            }
            if(action<51){
                texture_x = texture_x - 400;
            }
        }
        if(action_state=="sleep"){
            texture_y = -1600;
            texture_x = 0;
            if(action<51){
                texture_x = texture_x - 400;
            }
            x_move = 0;
        }
        leaveGround = 0;
        pet_down = 0;
        pet.style.top = window.innerHeight - pet.offsetHeight;
    }
    if(leaveGround==1){
        pet_down++;
        texture_y = texture_y - 400;
    }
    if(pet.offsetLeft<-400){
        pet.style.left = window.innerWidth;
    }
    if(pet.offsetLeft>window.innerWidth){
        pet.style.left = "-400px";
    }
    document.documentElement.style.setProperty("--pet_img_x",texture_x+"px");
    document.documentElement.style.setProperty("--pet_img_y",texture_y+"px");
    pet.style.top=pet.offsetTop+pet_down+"px";
    pet.style.left=pet.offsetLeft+x_move+"px";
	setTimeout(sum,10);
}