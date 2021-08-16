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

let mouseX = 0;
let mouseY = 0;
let clicks = 0;
let  selector = {};


let TIMES = [];

const keys = {};
let GAMEOBJECTS = [];
let level = 1;

const LEVELS = [

    {
        name:"Edit Level",
        spawn:{x:150,y:10},
        content:[


        ],
    },

    {
        name:"Tutorial",
        spawn:{x:220,y:480},
        content:[
            {x:0,y:580,w:800,h:20,t:"platform"},
            {x:40,y:430,w:130,h:30,t:"platform"},

            {x:200,y:520,w:40,h:40,t:"platform"},
            {x:250,y:520,w:40,h:40,t:"platform"},
            {x:300,y:500,w:40,h:40,t:"platform"},
            {x:350,y:460,w:60,h:60,t:"platform"},
            {x:420,y:480,w:40,h:80,t:"lava"},
            {x:470,y:440,w:60,h:80,t:"platform"},
            {x:200,y:420,w:40,h:40,t:"platform"},
            {x:150,y:380,w:20,h:20,t:"goal"},

        ],
    },

    {
        name:"Tricky Start",
        spawn:{x:20,y:550},
        content:[
            {x:320,y:560,w:330,h:20,t:"lava"},

            {x:190,y:500,w:10,h:20,t:"lava"},
            {x:100,y:500,w:10,h:20,t:"lava"},
            {x:20,y:500,w:80,h:20,t:"platform"},
            {x:200,y:500,w:100,h:20,t:"platform"},
            {x:300,y:500,w:20,h:100,t:"platform"},
            {x:0,y:500,w:20,h:100,t:"platform"},
            
            {x:0,y:350,w:250,h:80,t:"platform"},
            {x:400,y:350,w:20,h:235,t:"platform"},
            {x:480,y:300,w:20,h:300,t:"platform"},

            
            {x:660,y:500,w:140,h:20,t:"platform"},
            {x:640,y:500,w:20,h:100,t:"platform"},
            {x:700,y:350,w:100,h:80,t:"platform"},

            {x:550,y:440,w:40,h:40,t:"platform"},
            {x:0,y:200,w:230,h:20,t:"platform"},
            {x:230,y:200,w:20,h:130,t:"platform"},
            
            {x:350,y:220,w:40,h:40,t:"platform"},

            {x:100,y:140,w:40,h:40,t:"goal"},
            {x:0,y:580,w:800,h:20,t:"platform"},

        ],
    },


    {
        name:"Big Jump",
        spawn:{x:50,y:10},
        content:[
            
            {x:120,y:560,w:800,h:40,t:"lava"},
            {x:300,y:130,w:20,h:450,t:"lava"},
            
            {x:82,y:120,w:98,h:20,t:"platform"},
            {x:80,y:0,w:20,h:450,t:"platform"},
            {x:20,y:520,w:100,h:80,t:"platform"},
            {x:180,y:460,w:40,h:40,t:"platform"},
            {x:120,y:350,w:40,h:40,t:"platform"},
            {x:220,y:300,w:40,h:40,t:"platform"},
            {x:180,y:200,w:20,h:40,t:"platform"},

            

            {x:0,y:0,w:20,h:600,t:"lava"},
            
            {x:470,y:480,w:240,h:20,t:"platform"},
            {x:480,y:380,w:80,h:20,t:"lava"},
            {x:560,y:160,w:20,h:260,t:"platform"},
            {x:520,y:160,w:90,h:20,t:"platform"},
            {x:660,y:400,w:20,h:40,t:"platform"},
            {x:700,y:300,w:20,h:40,t:"platform"},
            {x:620,y:280,w:20,h:40,t:"platform"},
            {x:740,y:200,w:20,h:40,t:"platform"},
            {x:500,y:100,w:20,h:40,t:"platform"},
            {x:440,y:40,w:20,h:20,t:"goal"},
            






        ],
    },

    {
        name:"bouncy",
        spawn:{x:150,y:20},
        content:[
            {x:510,y:160,w:70,h:40,t:"platform"},
            {x:500,y:0,w:20,h:380,t:"lava"},
            
            
            
            {x:100,y:100,w:100,h:20,t:"platform"},
            {x:200,y:0,w:20,h:370,t:"lava"},
            {x:40,y:520,w:40,h:40,t:"bounce"},
            {x:180,y:520,w:40,h:40,t:"bounce"},
            {x:340,y:320,w:60,h:40,t:"platform"},
            {x:470,y:520,w:40,h:40,t:"bounce"},
            {x:620,y:300,w:60,h:40,t:"platform"},
            {x:740,y:240,w:40,h:40,t:"platform"},
            {x:700,y:80,w:80,h:40,t:"platform"},
            {x:740,y:40,w:20,h:20,t:"goal"},
            
            
            {x:780,y:0,w:20,h:440,t:"lava"},
            {x:0,y:560,w:80,h:40,t:"lava"},
            {x:180,y:560,w:640,h:40,t:"lava"},
            


        ],
    },

    {
        name:"moving faster",
        spawn:{x:50,y:50},
        content:[
            
            {x:520,y:0,w:20,h:160,t:"lava"},
            
            {x:400,y:100,w:20,h:100,t:"lava"},
            {x:400,y:200,w:80,h:20,t:"lava"},
            {x:460,y:200,w:20,h:80,t:"lava"},
            {x:280,y:120,w:20,h:350,t:"lava"},
            {x:280,y:120+350,w:180,h:20,t:"lava"},
            
            {x:600,y:200,w:20,h:80,t:"lava"},
            {x:720,y:200,w:80,h:20,t:"lava"},
            {x:780,y:210,w:20,h:70,t:"lava"},
            
            {x:100,y:200,w:20,h:40,t:"lava"},
            
            {x:200,y:380,w:80,h:20,t:"lava"},
            {x:80,y:380,w:60,h:20,t:"lava"},
            {x:100,y:420,w:60,h:20,t:"lava"},
            {x:190,y:460,w:20,h:50,t:"lava"},
            {x:0,y:460,w:40,h:20,t:"lava"},
            {x:390,y:480,w:20,h:60,t:"lava"},
            {x:405,y:290,w:20,h:40,t:"lava"},
            {x:280+180,y:120+290,w:20,h:80,t:"lava"},
            {x:80,y:400,w:200,h:20,t:"platform"},
            {x:500,y:100,w:300,h:20,t:"platform"},
            {x:0,y:100,w:310,h:20,t:"platform"},
            {x:0,y:240,w:200,h:20,t:"platform"},
            
            {x:780,y:280,w:20,h:200,t:"platform"},
            {x:780,y:280,w:20,h:200,t:"platform"},

            {x:0,y:480,w:220,h:20,t:"platform"},

            {x:600,y:440,w:40,h:40,t:"platform"},
            {x:480,y:340,w:20,h:20,t:"goal"},
            {x:280+175,y:120+270,w:80,h:20,t:"platform"},


            {x:400,y:280,w:400,h:20,t:"platform"},

            {x:0,y:540,w:800,h:20,t:"platform"},

        ],
    },

    {
        name:"full force",
        spawn:{x:50,y:10},
        content:[
            
            {x:100,y:300,w:600,h:160,t:"water"},
            {x:550,y:460,w:150,h:120,t:"water"},
            {x:100,y:460,w:250,h:20,t:"lava"},
            {x:350,y:460,w:200,h:20,t:"platform"},
            {x:20,y:100,w:100,h:20,t:"platform"},
            {x:500,y:140,w:80,h:20,t:"platform"},
            {x:80,y:300,w:20,h:300,t:"platform"},
            {x:700,y:300,w:80,h:300,t:"platform"},
            {x:350,y:580,w:350,h:20,t:"platform"},
            {x:600,y:200,w:50,h:20,t:"platform"},
            {x:230,y:520,w:20,h:20,t:"goal"},

            


        ],
    },

    
    {
        name:"NULL",
        spawn:{x:150,y:10},
        content:[
            
            {x:100,y:100,w:100,h:20,t:"platform"},


        ],
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

if(level === 0){
if(keys["1"]){
    selector.t = "platform";
}
if(keys["2"]){
    selector.t = "lava";
}
if(keys["3"]){
    selector.t = "bounce";
}
if(keys["4"]){
    selector.t = "goal";
}
if(keys["5"]){
    selector.t = "delete";
}}



}

function render(){

ctx.clearRect(0,0,canvas.width,canvas.height)
player1.render();
GAMEOBJECTS.forEach(v=>{v.render();})
timer.display();
ctx.strokeStyle = "black";

ctx.strokeRect(selector.x,selector.y,selector.w,selector.h)

ctx.strokeText("Speed : "+Math.abs(Math.round(player1.xa)), 10, 20);
ctx.strokeText("Level : "+LEVELS[level].name, 80, 20);
if(level === 0){ctx.strokeText("input type (1-5) : "+selector.t, 10, 40);}


}

// make gm

function makegm(x,y,w,h,type){
    const newgm = new gameobject(x,y,w,h,type);
    GAMEOBJECTS.push(newgm);
}

function buildcurrentlevel(){

    // LEVELS[level].build();
    LEVELS[level].content.forEach(v=>{
        makegm(v.x,v.y,v.w,v.h,v.t);
    })
    timer.stop();
    timer.start();

}



function nextlevel(amount = 1){
    GAMEOBJECTS = [];
    level += amount;
    timeshtml.value = " Current Level Times: "
    TIMES.push(timer.time);
    TIMES.forEach((v,i)=>{
        timeshtml.value = timeshtml.value + "\n " + " Level: "  + LEVELS[i+1].name + " : " + time(v);

    })
    buildcurrentlevel();
    player1.reset();
    
}

function hardreset(){
    GAMEOBJECTS = [];
    TIMES = [];
    level = 1;
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

function starteditor(){
    level=0; 
    nextlevel(0);
    selector.t = "platform";

    setTimeout(()=>{
        onclick = function(e){
        
            let rect = canvas.getBoundingClientRect();
            mouseX = Math.floor((e.clientX- rect.left) /10 )*10;
            mouseY = Math.floor((e.clientY- rect.top) /10 )*10;
            if(mouseX>=0 && mouseX<800 && mouseY>=0&&mouseY<600){
    
                if (selector.t === "delete"){
    
                    GAMEOBJECTS.forEach((v,i)=>{
                    let collision = v.collision(mouseX,mouseY,mouseX,mouseY);
                    if(collision.col){GAMEOBJECTS.splice(i,1)}
                    })
    
                }else{
                clicks ++;
                switch(clicks){
                    case 1:
                        selector.x1 = mouseX;
                        selector.y1 = mouseY;
                        selector.x = selector.x1;
                        selector.y = selector.y1;
                        selector.w = 20;
                        selector.h = 20;
                        break;
                    case 2:
                        selector.x2 = mouseX;
                        selector.y2 = mouseY;
                        if(selector.x1 < selector.x2){
                            selector.x = selector.x1; selector.w = selector.x2-selector.x1+20;  }
                        else if(selector.x1 === selector.x2){
                            selector.x = selector.x1; selector.w = 20; 
                        }
                        else{ 
                            selector.x = selector.x2; selector.w = selector.x1-selector.x2+20;   }
    
                        if(selector.y1 < selector.y2){
                            selector.y = selector.y1; selector.h = selector.y2-selector.y1+20;}
                        else if(selector.y1 === selector.y2){
                            selector.x = selector.x1; selector.h = 20; 
                        }else{
                            selector.y = selector.y2; selector.h = selector.y1-selector.y2+20;
                            }
                        break;
                    case 3:
                        makegm(selector.x,selector.y,selector.w,selector.h,selector.t)
                        selector = {}
                        selector.t = "platform"
                        clicks = 0;
                        break;
                    }
                }
            }
        
        }  
    },100)
    


}
