"use strict";

let canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 600;
let ctx = canvas.getContext("2d");
ctx.lineWidth = 1;
ctx.shadowColor = "black";
let timerhtml = document.getElementById("timerhtml");
let timeshtml = document.getElementById("timeshtml");
let pausemenu = document.getElementById("pausemenu");
timeshtml.value = " Current Level Times:  ";
let TIMES = [];

const keys = {};
let GAMEOBJECTS = [];
let level = 5;

const LEVELS = [

    {
        name:"Tutorial",
        spawn:{x:220,y:480},
        build: function(){
            
            makegm(0,600-20,800,20);

            makegm(40,430,130,30);

            makegm(200,520,40,40);
            makegm(250,520,40,40);
            makegm(300,500,40,40);
            makegm(350,460,60,60);
            makegm(420,480,40,80,"lava");
            makegm(470,440,60,80);
            makegm(200,420,40,40);
            makegm(150,380,20,20,"goal");

        }
    },
    {
        name:"Tricky Start",
        spawn:{x:20,y:550},
        build: function(){
            
            
            makegm(320,560,330,20,"lava");

            makegm(190,500,10,20,"lava");
            makegm(100,500,10,20,"lava");
            makegm(20,500,80,20);
            makegm(200,500,100,20);
            makegm(300,500,20,100);
            makegm(0,500,20,100);
            
            makegm(0,350,250,80);
            makegm(400,350,20,235);
            makegm(480,300,20,300);

            
            makegm(660,500,140,20);
            makegm(640,500,20,100);
            makegm(700,350,100,80);

            makegm(550,440,40,40);
            makegm(0,200,230,20);
            makegm(230,200,20,130);
            
            makegm(350,220,40,40);

            makegm(100,140,40,40,"goal");



            
            
            makegm(0,600-20,800,20);

        }
    },


    {
        name:"Big Jump",
        spawn:{x:50,y:10},
        build: function(){
            
            makegm(120,600-40,800,40,"lava");
            makegm(300,130,20,450,"lava");
            
            makegm(82,120,98,20);
            makegm(80,0,20,450);
            makegm(20,520,100,80);
            makegm(180,460,40,40);
            makegm(120,350,40,40);
            makegm(220,300,40,40);
            makegm(180,200,20,40);

            

            makegm(0,0,20,600,"lava");
            
            makegm(470,480,240,20);
            makegm(480,380,80,20,"lava");
            makegm(560,160,20,260);
            makegm(520,160,90,20);
            makegm(660,400,20,40);
            makegm(700,300,20,40);
            makegm(620,280,20,40);
            makegm(740,200,20,40);
            makegm(500,100,20,40);
            makegm(440,40,20,20,"goal");
            






        }
    },

    {
        name:"bouncy",
        spawn:{x:150,y:20},
        build: function(){
            makegm(510,160,70,40);
            makegm(500,0,20,380,"lava");
            
            
            
            makegm(100,100,100,20);
            makegm(200,0,20,370,"lava");
            makegm(40,520,40,40,"bounce");
            makegm(180,520,40,40,"bounce");
            makegm(340,320,60,40);
            makegm(470,520,40,40,"bounce");
            makegm(620,300,60,40);
            makegm(740,240,40,40);
            makegm(700,80,80,40);
            makegm(740,40,20,20,"goal");
            
            
            makegm(780,0,20,440,"lava");
            makegm(0,600-40,80,40,"lava");
            makegm(180,600-40,640,40,"lava");
            


        }
    },

    {
        name:"moving faster",
        spawn:{x:50,y:50},
        build: function(){
            
            makegm(520,0,20,160,"lava");
            
            makegm(400,100,20,100,"lava");
            makegm(400,200,80,20,"lava");
            makegm(460,200,20,80,"lava");
            makegm(280,120,20,350,"lava");
            makegm(280,120+350,180,20,"lava");
            
            makegm(600,200,20,80,"lava");
            makegm(720,200,80,20,"lava");
            makegm(780,210,20,70,"lava");
            
            makegm(100,200,20,40,"lava");
            
            makegm(200,380,80,20,"lava");
            makegm(80,380,60,20,"lava");
            makegm(100,420,60,20,"lava");
            makegm(190,460,20,50,"lava");
            makegm(0,460,40,20,"lava");
            makegm(390,480,20,60,"lava");
            makegm(405,290,20,40,"lava");
            makegm(280+180,120+290,20,80,"lava");
            makegm(80,400,200,20);
            makegm(500,100,300,20);
            makegm(0,100,310,20);
            makegm(0,240,200,20);
            
            makegm(780,280,20,200);
            makegm(780,280,20,200);

            makegm(0,480,220,20);

            makegm(600,440,40,40);
            makegm(480,340,20,20,"goal");
            makegm(280+175,120+270,80,20);


            makegm(400,280,400,20);

            makegm(0,540,800,20);

        }
    },

    {
        name:"full force",
        spawn:{x:50,y:10},
        build: function(){
            
            makegm(100,300,600,160,"water");
            makegm(550,460,150,120,"water");
            makegm(100,460,250,20,"lava");
            makegm(350,460,200,20);
            makegm(20,100,100,20);
            makegm(500,140,80,20);
            makegm(80,300,20,300);
            makegm(700,300,80,300);
            makegm(350,580,350,20);
            makegm(600,200,50,20);
            makegm(230,520,20,20,"goal");

            


        }
    },

    
    {
        name:"NULL",
        spawn:{x:150,y:10},
        build: function(){
            
            makegm(100,100,100,20);


        }
    },





]


// timer

const timer = {
    time:0,
    reset: function(set=0){this.time = set},
    start: function(){this.timer = setInterval(() => {
        this.time += 100;
    }, 100);},
    stop: function(){clearInterval(this.timer)},
    display: function(){
        timerhtml.value = time(this.time);
    
    }


}


// gameobject class

class gameobject{

    constructor(x,y,width,height,type = "platform"){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
    }

    update(){

    }

    render(){
        ctx.shadowBlur = 8;
        ctx.lineWidth = 3;

        ctx.beginPath();
        if(this.type === "platform"){
            ctx.strokeStyle = "black"
            ctx.fillStyle = "white";
            ctx.shadowColor = "black";

            ;
        }
        else if(this.type === "lava"){
            ctx.strokeStyle = "red";
            ctx.fillStyle = "red";
            ctx.shadowColor = "red";

        }    
        else if(this.type === "goal"){
            ctx.strokeStyle = "yellow";
            ctx.fillStyle = "yellow";
            ctx.shadowColor = "grey";
        
        }    
        else if(this.type === "bounce"){
            ctx.strokeStyle = "#6ec971"
            ctx.fillStyle = "green";
            ctx.shadowColor = "#6ec971";
        
        }else if(this.type === "water"){
            ctx.globalAlpha = 0.3;
            ctx.strokeStyle = "white"
            ctx.fillStyle = "#6dccff";
            ctx.shadowColor = "#6dccff";
        
        }        

        ctx.strokeRect(this.x,this.y,this.width,this.height);
        
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.fill()
        ctx.stroke(); 
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 1;


    }

    collision(x1,y1,x2,y2){
        let colleft = (x1 > this.x && x1 < this.x+this.width);
        let colright =  (x2 > this.x && x2 < this.x+this.width);

        let coltop = (y1 > this.y && y1 < this.y+this.height);
        let colbottom = (y2 > this.y && y2 < this.y+this.height);
        
        let col = (colright || colleft) && (coltop || colbottom) 


        return {col,coltop,colbottom,colright,colleft};
    }

}



// player class

class player{

    constructor(x,y,size){

        this.x = x;
        this.y = y;
        this.size = size;
        this.health = 100;
        this.xa = 0;
        this.ya = 0;
        this.onground = false;

    }

    update(){

        this.ya += 0.8;
        this.ya *= 0.99;
        this.x += this.xa;
        this.y += this.ya;

        if(this.ya> 20 ){this.ya = 19}

        
        if(keys["a"]){
            this.xa -= 1;
        }
        if(keys["d"]){
            this.xa += 1;
        }

        if(keys["w"] && this.onground){
            this.ya -=10;

        }
        if(keys["r"] ){
            this.reset();
        }

        //walls

        if( this.x > canvas.width-this.size){this.x = 0}
        if( this.x < 0){this.x = canvas.width-this.size}

        if(this.y > canvas.height-this.size){this.y = 0}
        if(this.y < 0){this.y = canvas.height-this.size}
        
        
        this.onground = false;

        // gm collision 
        
        GAMEOBJECTS.forEach((v,i)=>{
            let collision = v.collision(this.x-this.size,this.y-this.size,this.x+this.size,this.y+this.size) ;

            switch(v.type){

                case "platform":
                    if((collision.coltop && (collision.colleft || collision.colright) &&  !collision.colbottom) ){
                        this.ya = Math.abs(this.ya)
                        this.ya *=0.4; 
                        this.y = v.y+v.height+this.size+2;

                    }
                    if((collision.colbottom && (collision.colleft || collision.colright) &&  !collision.coltop) ){
                        this.ya = Math.abs(this.ya)
                        this.ya *=-0.4; 
                        this.y = v.y-this.size-1;
                        this.xa *= 0.8;
                        this.onground = true;


                    }
                    if(collision.colleft && (collision.colbottom && collision.coltop)){
                        this.xa *= -0.5; 
                        this.x = v.x+v.width+this.size+1


                    }
                    if(collision.colright && (collision.colbottom && collision.coltop)){
                        this.xa *= -0.5; 
                        this.x = v.x-this.size-1


                    }
                    break;
                case "goal":

                    if (collision.col){
                        nextlevel();
                    }
                    break;
                case "lava":
                    if (collision.col){
                    
                    this.reset();
                    }
                    break;
                case "bounce":
                    if((collision.coltop && (collision.colleft || collision.colright) &&  !collision.colbottom) ){
                        this.ya *=-1.1; 
                        this.y = v.y+v.height+this.size+1

                    }
                    if((collision.colbottom && (collision.colleft || collision.colright) &&  !collision.coltop) ){
                        this.ya *=-1.1; 
                        this.y = v.y-this.size-1 ;



                    }
                    if(collision.colleft && (collision.colbottom && collision.coltop)){
                        this.xa *= -1; 
                        this.x = v.x+v.width+this.size+1


                    }
                    if(collision.colright && (collision.colbottom && collision.coltop)){
                        this.xa *= -1; 
                        this.x = v.x-this.size-1


                    }
                    break;
                case "water":

                    if (collision.col){
                        this.ya -= 1.25;

                    }
                    break;

            }

        })


        if(this.onground){this.xa *= 0.8}else{this.xa *= 0.9}
      
    }

    render(){
        
        ctx.shadowBlur = 4;
        ctx.shadowColor = "black";

        ctx.beginPath()
        ctx.fillStyle = "lightblue";
        ctx.fillRect(this.x-this.size,this.y-this.size,this.size*2,this.size*2);
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x-this.size,this.y-this.size,this.size*2,this.size*2);
        ctx.fill()
        ctx.stroke(); 
        ctx.shadowBlur = 0;


        ctx.beginPath();
        ctx.moveTo(this.x-this.size,this.y-this.size);
        ctx.lineTo(this.x+this.size,this.y+this.size);
        ctx.moveTo(this.x-this.size,this.y+this.size);
        ctx.lineTo(this.x+this.size,this.y-this.size);
        ctx.stroke();

        

    }

    reset(){

        this.x = LEVELS[level].spawn.x;
        this.y = LEVELS[level].spawn.y;
        this.health = 100;
        this.xa = 0;
        this.ya = 0;
        this.onground = false;
        timer.reset();

    }

}



// make players

const player1 = new player(LEVELS[level].spawn.x,LEVELS[level].spawn.y,9)

//  build level 

buildcurrentlevel();



// game loop 

window.requestAnimationFrame(main); 

let lastRenderTime = 0;
let GameSpeed = 60;
let lastGameSpeed = 60

function main(currentTime){
    window.requestAnimationFrame(main);
    const sslr = (currentTime- lastRenderTime)/1000
    if (sslr < 1 / GameSpeed) {return}
    lastRenderTime = currentTime;  
    render();
    update();
}



function update(){
player1.update();
GAMEOBJECTS.forEach(v=>{v.update();})
}

function render(){

ctx.clearRect(0,0,canvas.width,canvas.height)
player1.render();
GAMEOBJECTS.forEach(v=>{v.render();})
timer.display();


ctx.strokeStyle = "black";
ctx.strokeText("Speed : "+Math.abs(Math.round(player1.xa)), 10, 20);
ctx.strokeText("Level : "+LEVELS[level].name, 80, 20);


}

// make gm

function makegm(x,y,w,h,type){
    const newgm = new gameobject(x,y,w,h,type);
    GAMEOBJECTS.push(newgm);
}

function buildcurrentlevel(){

    LEVELS[level].build();
    timer.stop();
    timer.start();

}

function nextlevel(amount = 1){
    GAMEOBJECTS = [];
    level += amount;
    timeshtml.value = " Current Level Times: "
    TIMES.push(timer.time);
    TIMES.forEach((v,i)=>{
        timeshtml.value = timeshtml.value + "\n " + " Level: "  + LEVELS[i].name + " : " + time(v);

    })
    buildcurrentlevel();
    player1.reset();
    
}

function hardreset(){
    GAMEOBJECTS = [];
    TIMES = [];
    level = 0;
    timeshtml.value = " Current Level Times: "
    buildcurrentlevel();
    timer.reset();
    player1.reset();


}

//distance

function distance(x1,x2,y1,y2){

return Math.sqrt(((x2-x1)**2)+((y2-y1)**2));

}


function randomrange(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function time(ms) {
    return new Date(ms).toISOString().slice(14, -1);
}



function togglePause(){
    if(GameSpeed === 0){
        pausemenu.style.display = "none";
        canvas.style.filter = "none"
        GameSpeed = lastGameSpeed; 
        timer.start();


    }else{
        pausemenu.style.display = "flex";
        canvas.style.filter = "blur(10px)";
        timer.stop();

        
        GameSpeed = 0; 
    }

}


addEventListener("keydown", e => {
    // console.log(e.key);
    keys[e.key] = true;
});

addEventListener("keyup", e => {
    keys[e.key] = false;
});

addEventListener("keypress",e=>{
    switch(e.key){
        case "p":
            togglePause();
            break;
    }

})