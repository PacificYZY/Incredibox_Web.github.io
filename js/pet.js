//move
var pet = document.querySelector("#pet");
var x = 0;
var y = 0;
var startX = 0;
var startY = 0;
var leaveGround = 0;
var leaveHeight = 0;
var pet_down = 0 ;
var inertia_startX = 0;
var inertia_startY = 0;
var inertia_startX_X = 0;
var inertia_startY_Y = 0;
var inertia_x = 0;
var inertia_y = 0;
var inertia_x_x = 0;
var inertia_y_y = 0;
pet.addEventListener("touchstart", function (e) {
    startX = e.targetTouches[0].pageX;
    startY = e.targetTouches[0].pageY;
    x = this.offsetLeft;
    y = this.offsetTop;
    leaveGround = 0;
    pet_down = 0;
    inertia_x = 0;
    inertia_y = 0;
});
pet.addEventListener("touchmove", function (e) {
    var moveX = e.targetTouches[0].pageX - startX;
    var moveY = e.targetTouches[0].pageY - startY;
    pet.style.left = x + moveX + "px";
    pet.style.top = y + moveY + "px";
    e.preventDefault();
    inertia_x = inertia_startX_X*0.5;
    inertia_y = inertia_startY_Y*0.5;
    if(inertia_x<-5){
        direction=0;
    }
    if(inertia_x>5){
        direction=1;
    }
});
pet.addEventListener("touchend", function () {
    leaveGround = 1;
    inertia_x_x = inertia_x;
    inertia_y_y = inertia_y;
    leaveHeight = window.innerHeight - (pet.offsetTop - window.pageYOffset) - pet.offsetHeight;
});
//state
var direction = 1;
var texture_x = 0;
var texture_y = 0;
var x_move = 0;
var action = 0;
var state = 0;
var action_state = "stand";
var action_state_time = 0;
var action_state_list = ["stand","walk","sleep","fall"];
sum();
function sum(){
    //action
	if(action<50){
		action++;
    }
    else{
    	action=0;
    }
    //state
    if(state<action_state_time){
		state++;
    }
    else{
    	state=0;
        action_state=action_state_list[Math.round(Math.random()*(2-0)+0)];
        direction=Math.round(Math.random());
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
        if(action<25){
            texture_x = texture_x - 400;
        }
        x_move = 0;
    }
    else{
        if(leaveGround==1){
            leaveGround = 0;
            if(leaveHeight>600 || inertia_x_x>50 || inertia_x_x<-50 || inertia_y_y>50){
                action_state = "fall";
            }
            state=0;
        }
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
            if(state==0){
                action_state_time = Math.round(Math.random()*(500-25)+25);
            }
        }
        if(action_state=="walk"){
            if(direction==1){
                texture_y = -400;
                texture_x = 0;
                x_move = 2;
            }
            else{
                texture_y = -400;
                texture_x = -800;
                x_move = -2;
            }
            if(action<25){
                texture_x = texture_x - 400;
            }
            if(state==0){
                action_state_time = Math.round(Math.random()*(1000-50)+50);
            }
        }
        if(action_state=="sleep"){
            texture_y = -1600;
            texture_x = 0;
            if(action<25){
                texture_x = texture_x - 400;
            }
            x_move = 0;
            if(state==0){
                action_state_time = Math.round(Math.random()*(1500-500)+500);
            }
        }
        if(action_state=="fall"){
            if(direction==1){
                texture_y = 0;
                texture_x = -800;
            }
            else{
                texture_y = 0;
                texture_x = -1200;
            }
            x_move = 0;
            if(state==0){
                action_state_time = 50;
            }
        }
        pet_down = 0;
        inertia_y_y = 0;
        pet.style.top = window.innerHeight - pet.offsetHeight;
    }
    if(leaveGround==1){
        pet_down++;
        texture_y = texture_y - 400;
    }
    
    inertia_startX_X=pet.offsetLeft-inertia_startX;
    inertia_startY_Y=pet.offsetTop-window.innerHeight-inertia_startY;
    inertia_startX=pet.offsetLeft;
    inertia_startY=pet.offsetTop-window.innerHeight;
    if(inertia_x_x!=0){
        inertia_x_x=inertia_x_x-inertia_x_x/10;
    }
    if(inertia_y_y!=0){
        inertia_y_y=inertia_y_y-inertia_y_y/10;
    }
    
    if(pet.offsetLeft<-400){
        pet.style.left = window.innerWidth;
    }
    if(pet.offsetLeft>window.innerWidth){
        pet.style.left = "-400px";
    }
    
    document.documentElement.style.setProperty("--pet_img_x",texture_x+"px");
    document.documentElement.style.setProperty("--pet_img_y",texture_y+"px");
    pet.style.top=pet.offsetTop+pet_down+inertia_y_y+"px";
    pet.style.left=pet.offsetLeft+x_move+inertia_x_x+"px";
	setTimeout(sum,20);
}