"use strict";

let canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 600;
let ctx = canvas.getContext("2d");
ctx.lineWidth = 1;
ctx.shadowColor = "black";
let timerhtml = document.getElementById("timerhtml");
let pausemenu = document.getElementById("pausemenu");

let timeshtml = document.getElementById("timeshtml");
timeshtml.value = " Current Level Times:  ";
let keyshtml = document.getElementById("keyshtml");
keyshtml.value = " Current Keys Collected:  ";
let levelhtml = document.getElementById("levelhtml");


let clicks = 0;
let selector = {};
const spawnpoint = {x:150,y:10}
let TIMES = [];



const keys = {};
let GAMEOBJECTS = [];
let KEYSCOLLECTED = [];
let level = 1;
let textFile = null;
let style = true;

let LEVELS = [

    {
        name:"Edit Level",
        spawn:{x:150,y:100},
        content:[
            {x:100,y:150,w:100,h:40},
        ],
    },

    {"content":[{"x":0,"y":580,"w":800,"h":20,"t":"platform"},{"x":40,"y":430,"w":130,"h":30,"t":"platform"},{"x":200,"y":520,"w":40,"h":40,"t":"platform"},{"x":250,"y":520,"w":40,"h":40,"t":"platform"},{"x":300,"y":500,"w":40,"h":40,"t":"platform"},{"x":350,"y":460,"w":60,"h":60,"t":"platform"},{"x":420,"y":480,"w":40,"h":80,"t":"lava"},{"x":470,"y":440,"w":60,"h":80,"t":"platform"},{"x":200,"y":420,"w":40,"h":40,"t":"platform"},{"x":150,"y":380,"w":20,"h":20,"t":"goal"}],"spawn":{"x":220,"y":480},"name":"Tutorial"},

    {"content":[{"x":320,"y":560,"w":330,"h":20,"t":"lava"},{"x":190,"y":500,"w":10,"h":20,"t":"lava"},{"x":100,"y":500,"w":10,"h":20,"t":"lava"},{"x":20,"y":500,"w":80,"h":20,"t":"platform"},{"x":200,"y":500,"w":100,"h":20,"t":"platform"},{"x":300,"y":500,"w":20,"h":100,"t":"platform"},{"x":0,"y":500,"w":20,"h":100,"t":"platform"},{"x":0,"y":350,"w":250,"h":80,"t":"platform"},{"x":400,"y":350,"w":20,"h":235,"t":"platform"},{"x":480,"y":300,"w":20,"h":300,"t":"platform"},{"x":660,"y":500,"w":140,"h":20,"t":"platform"},{"x":640,"y":500,"w":20,"h":100,"t":"platform"},{"x":700,"y":350,"w":100,"h":80,"t":"platform"},{"x":550,"y":440,"w":40,"h":40,"t":"platform"},{"x":0,"y":200,"w":230,"h":20,"t":"platform"},{"x":230,"y":200,"w":20,"h":130,"t":"platform"},{"x":350,"y":220,"w":40,"h":40,"t":"platform"},{"x":100,"y":140,"w":40,"h":40,"t":"goal"},{"x":0,"y":580,"w":800,"h":20,"t":"platform"}],"spawn":{"x":20,"y":550},"name":"Tricky Start"},


    {"content":[{"x":120,"y":560,"w":800,"h":40,"t":"lava"},{"x":300,"y":130,"w":20,"h":450,"t":"lava"},{"x":82,"y":120,"w":98,"h":20,"t":"platform"},{"x":80,"y":0,"w":20,"h":450,"t":"platform"},{"x":20,"y":520,"w":100,"h":80,"t":"platform"},{"x":180,"y":460,"w":40,"h":40,"t":"platform"},{"x":120,"y":350,"w":40,"h":40,"t":"platform"},{"x":220,"y":300,"w":40,"h":40,"t":"platform"},{"x":180,"y":200,"w":20,"h":40,"t":"platform"},{"x":0,"y":0,"w":20,"h":600,"t":"lava"},{"x":470,"y":480,"w":240,"h":20,"t":"platform"},{"x":480,"y":380,"w":80,"h":20,"t":"lava"},{"x":560,"y":160,"w":20,"h":260,"t":"platform"},{"x":520,"y":160,"w":90,"h":20,"t":"platform"},{"x":660,"y":400,"w":20,"h":40,"t":"platform"},{"x":700,"y":300,"w":20,"h":40,"t":"platform"},{"x":620,"y":280,"w":20,"h":40,"t":"platform"},{"x":740,"y":200,"w":20,"h":40,"t":"platform"},{"x":500,"y":100,"w":20,"h":40,"t":"platform"},{"x":440,"y":40,"w":20,"h":20,"t":"goal"}],"spawn":{"x":50,"y":10},"name":"Big Jump"},

    {"content":[{"x":510,"y":160,"w":70,"h":40,"t":"platform","e":"none"},{"x":500,"y":0,"w":20,"h":380,"t":"lava","e":"none"},{"x":100,"y":100,"w":100,"h":20,"t":"platform","e":"none"},{"x":200,"y":0,"w":20,"h":370,"t":"lava","e":"none"},{"x":180,"y":520,"w":40,"h":40,"t":"bounce","e":"none"},{"x":470,"y":520,"w":40,"h":40,"t":"bounce","e":"none"},{"x":740,"y":240,"w":40,"h":40,"t":"platform","e":"none"},{"x":700,"y":80,"w":80,"h":40,"t":"platform","e":"none"},{"x":740,"y":40,"w":20,"h":20,"t":"goal","e":"none"},{"x":780,"y":0,"w":20,"h":440,"t":"lava","e":"none"},{"x":180,"y":560,"w":640,"h":40,"t":"lava","e":"none"},{"x":340,"y":340,"w":70,"h":40,"t":"platform","e":"none"},{"x":620,"y":340,"w":70,"h":30,"t":"platform","e":"none"},{"x":520,"y":350,"w":30,"h":30,"t":"platform","e":"none"}],"spawn":{"x":150,"y":20},"name":"Bouncy"},

    {"content":[{"x":520,"y":0,"w":20,"h":160,"t":"lava"},{"x":400,"y":100,"w":20,"h":100,"t":"lava"},{"x":400,"y":200,"w":80,"h":20,"t":"lava"},{"x":460,"y":200,"w":20,"h":80,"t":"lava"},{"x":280,"y":120,"w":20,"h":350,"t":"lava"},{"x":280,"y":470,"w":180,"h":20,"t":"lava"},{"x":600,"y":200,"w":20,"h":80,"t":"lava"},{"x":720,"y":200,"w":80,"h":20,"t":"lava"},{"x":780,"y":210,"w":20,"h":70,"t":"lava"},{"x":100,"y":200,"w":20,"h":40,"t":"lava"},{"x":200,"y":380,"w":80,"h":20,"t":"lava"},{"x":80,"y":380,"w":60,"h":20,"t":"lava"},{"x":100,"y":420,"w":60,"h":20,"t":"lava"},{"x":190,"y":460,"w":20,"h":50,"t":"lava"},{"x":0,"y":460,"w":40,"h":20,"t":"lava"},{"x":390,"y":480,"w":20,"h":60,"t":"lava"},{"x":405,"y":290,"w":20,"h":40,"t":"lava"},{"x":460,"y":410,"w":20,"h":80,"t":"lava"},{"x":80,"y":400,"w":200,"h":20,"t":"platform"},{"x":500,"y":100,"w":300,"h":20,"t":"platform"},{"x":0,"y":100,"w":310,"h":20,"t":"platform"},{"x":0,"y":240,"w":200,"h":20,"t":"platform"},{"x":780,"y":280,"w":20,"h":200,"t":"platform"},{"x":780,"y":280,"w":20,"h":200,"t":"platform"},{"x":0,"y":480,"w":220,"h":20,"t":"platform"},{"x":600,"y":440,"w":40,"h":40,"t":"platform"},{"x":480,"y":340,"w":20,"h":20,"t":"goal"},{"x":455,"y":390,"w":80,"h":20,"t":"platform"},{"x":400,"y":280,"w":400,"h":20,"t":"platform"},{"x":0,"y":540,"w":800,"h":20,"t":"platform"}],"spawn":{"x":50,"y":50},"name":"Moving Faster"},

    {"content":[{"x":100,"y":300,"w":600,"h":160,"t":"water"},{"x":550,"y":460,"w":150,"h":120,"t":"water"},{"x":100,"y":460,"w":250,"h":20,"t":"lava"},{"x":350,"y":460,"w":200,"h":20,"t":"platform"},{"x":20,"y":100,"w":100,"h":20,"t":"platform"},{"x":500,"y":140,"w":80,"h":20,"t":"platform"},{"x":80,"y":300,"w":20,"h":300,"t":"platform"},{"x":700,"y":300,"w":80,"h":300,"t":"platform"},{"x":350,"y":580,"w":350,"h":20,"t":"platform"},{"x":600,"y":200,"w":50,"h":20,"t":"platform"},{"x":230,"y":520,"w":20,"h":20,"t":"goal"}],"spawn":{"x":50,"y":10},"name":"Full Force"},

    {"content":[{"x":0,"y":530,"w":160,"h":20,"t":"platform"},{"x":320,"y":450,"w":30,"h":150,"t":"platform"},{"x":520,"y":400,"w":40,"h":200,"t":"platform"},{"x":710,"y":370,"w":40,"h":230,"t":"platform"},{"x":0,"y":550,"w":810,"h":60,"t":"lava"},{"x":560,"y":260,"w":150,"h":30,"t":"platform"},{"x":0,"y":420,"w":40,"h":150,"t":"lava"},{"x":150,"y":260,"w":140,"h":40,"t":"platform"},{"x":770,"y":260,"w":30,"h":30,"t":"platform"},{"x":0,"y":260,"w":120,"h":40,"t":"platform"},{"x":120,"y":70,"w":30,"h":250,"t":"lava"},{"x":110,"y":60,"w":50,"h":30,"t":"platform"},{"x":190,"y":230,"w":30,"h":30,"t":"platform"},{"x":250,"y":130,"w":40,"h":40,"t":"platform"},{"x":440,"y":100,"w":50,"h":30,"t":"platform"},{"x":450,"y":50,"w":20,"h":20,"t":"goal"}],"spawn":{"x":80,"y":500},"name":"Windup"},

    {"content":[{"x":290,"y":0,"w":20,"h":100,"t":"platform"},{"x":440,"y":120,"w":50,"h":120,"t":"lava"},{"x":430,"y":240,"w":50,"h":110,"t":"lava"},{"x":420,"y":350,"w":50,"h":100,"t":"lava"},{"x":420,"y":450,"w":50,"h":150,"t":"platform"},{"x":280,"y":120,"w":40,"h":130,"t":"lava"},{"x":330,"y":280,"w":30,"h":80,"t":"lava"},{"x":360,"y":470,"w":30,"h":70,"t":"lava"},{"x":290,"y":590,"w":20,"h":20,"t":"lava"},{"x":200,"y":410,"w":40,"h":190,"t":"lava"},{"x":280,"y":440,"w":20,"h":30,"t":"platform"},{"x":190,"y":400,"w":60,"h":20,"t":"platform"},{"x":160,"y":290,"w":80,"h":30,"t":"lava"},{"x":230,"y":220,"w":30,"h":100,"t":"lava"},{"x":60,"y":290,"w":80,"h":30,"t":"platform"},{"x":60,"y":330,"w":30,"h":260,"t":"lava"},{"x":150,"y":440,"w":60,"h":30,"t":"lava"},{"x":80,"y":560,"w":50,"h":30,"t":"lava"},{"x":220,"y":210,"w":50,"h":20,"t":"platform"},{"x":250,"y":530,"w":40,"h":70,"t":"platform"},{"x":310,"y":570,"w":110,"h":40,"t":"platform"},{"x":140,"y":90,"w":40,"h":140,"t":"lava"},{"x":130,"y":70,"w":60,"h":30,"t":"platform"},{"x":80,"y":200,"w":70,"h":30,"t":"lava"},{"x":0,"y":0,"w":30,"h":190,"t":"lava"},{"x":0,"y":180,"w":40,"h":30,"t":"platform"},{"x":0,"y":370,"w":70,"h":30,"t":"lava"},{"x":650,"y":0,"w":40,"h":250,"t":"platform"},{"x":650,"y":490,"w":40,"h":120,"t":"platform"},{"x":640,"y":470,"w":60,"h":30,"t":"lava"},{"x":640,"y":240,"w":60,"h":30,"t":"lava"},{"x":760,"y":390,"w":30,"h":210,"t":"platform"},{"x":740,"y":360,"w":60,"h":30,"t":"lava"},{"x":540,"y":540,"w":30,"h":60,"t":"platform"},{"x":520,"y":520,"w":70,"h":30,"t":"platform"},{"x":470,"y":450,"w":40,"h":30,"t":"platform"},{"x":530,"y":360,"w":30,"h":30,"t":"platform"},{"x":590,"y":300,"w":30,"h":30,"t":"platform"},{"x":500,"y":210,"w":30,"h":30,"t":"platform"},{"x":600,"y":150,"w":30,"h":30,"t":"platform"},{"x":370,"y":80,"w":160,"h":20,"t":"platform"},{"x":460,"y":0,"w":20,"h":100,"t":"platform"},{"x":500,"y":40,"w":20,"h":20,"t":"goal"}],"spawn":{"x":410,"y":40},"name":"Falling Pain"},

    {"content":[{"x":490,"y":320,"w":50,"h":110,"t":"platform","e":"castle key"},{"x":40,"y":350,"w":20,"h":140,"t":"lava","e":"castle key"},{"x":40,"y":520,"w":20,"h":80,"t":"lava","e":"castle key"},{"x":0,"y":310,"w":90,"h":40,"t":"platform","e":"castle key"},{"x":620,"y":490,"w":180,"h":40,"t":"platform","e":"castle key"},{"x":370,"y":380,"w":20,"h":20,"t":"platform","e":"castle key"},{"x":520,"y":230,"w":20,"h":90,"t":"platform","e":"castle key"},{"x":520,"y":110,"w":20,"h":90,"t":"platform","e":"castle key"},{"x":520,"y":90,"w":280,"h":20,"t":"platform","e":"castle key"},{"x":360,"y":400,"w":40,"h":30,"t":"lava","e":"castle key"},{"x":360,"y":430,"w":40,"h":20,"t":"platform","e":"castle key"},{"x":366,"y":320,"w":40,"h":20,"t":"moving_horizontal_platform","e":[250,440]},{"x":500,"y":430,"w":30,"h":60,"t":"keydoor","e":"key 1"},{"x":30,"y":490,"w":510,"h":40,"t":"platform","e":"key 1"},{"x":250,"y":450,"w":20,"h":20,"t":"platform","e":"key 1"},{"x":270,"y":200,"w":270,"h":30,"t":"platform","e":"key 1"},{"x":90,"y":330,"w":210,"h":20,"t":"platform","e":"key 1"},{"x":90,"y":310,"w":210,"h":20,"t":"lava","e":"key 1"},{"x":190,"y":290,"w":20,"h":20,"t":"platform","e":"key 1"},{"x":60,"y":200,"w":110,"h":30,"t":"platform","e":"key 1"},{"x":320,"y":180,"w":200,"h":20,"t":"lava","e":"key 1"},{"x":400,"y":120,"w":30,"h":20,"t":"platform","e":"key 1"},{"x":520,"y":70,"w":40,"h":20,"t":"lava","e":"key 1"},{"x":630,"y":70,"w":50,"h":20,"t":"lava","e":"key 1"},{"x":167,"y":80,"w":40,"h":20,"t":"moving_horizontal_platform","e":[140,320]},{"x":60,"y":70,"w":60,"h":30,"t":"platform","e":[140,320]},{"x":80,"y":40,"w":20,"h":20,"t":"key","e":"key 1"},{"x":720,"y":110,"w":20,"h":380,"t":"lava","e":"key 1"},{"x":620,"y":470,"w":100,"h":20,"t":"lava","e":"key 1"},{"x":660,"y":430,"w":30,"h":20,"t":"platform","e":"key 1"},{"x":540,"y":360,"w":30,"h":20,"t":"platform","e":"key 1"},{"x":650,"y":280,"w":60,"h":20,"t":"platform","e":"key 1"},{"x":540,"y":200,"w":80,"h":30,"t":"platform","e":"key 1"},{"x":600,"y":110,"w":20,"h":90,"t":"keydoor","e":"key 2"},{"x":760,"y":460,"w":20,"h":20,"t":"key","e":"key 2"},{"x":550,"y":160,"w":20,"h":20,"t":"goal","e":"key 2"},{"x":40,"y":0,"w":20,"h":250,"t":"lava","e":"key 2"}],"spawn":{"x":100,"y":450},"name":"freedom key"},
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

    constructor(x,y,width,height,type = "platform",extra = "none"){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.extra = extra;
        this.setcolors();
        if(this.type === "moving_horizontal_platform" || this.type === "moving_vertical_platform" ){
            this.dir = 1;
            if(this.type === "moving_horizontal_platform"){this.x = this.extra[2];}else{this.y = this.extra[2]}
        }

    }

    update(){
        if(this.type === "moving_horizontal_platform"){
            this.x += this.dir;
            if(this.x < this.extra[0]){this.dir *= -1; this.x = this.extra[0]}
            if(this.x > this.extra[1]){this.dir *= -1; this.x = this.extra[1]}
        }
        if(this.type === "moving_vertical_platform"){
            this.y += this.dir;
            if(this.y < this.extra[0]){this.dir *= -1; this.y = this.extra[0]}
            if(this.y > this.extra[1]){this.dir *= -1; this.y = this.extra[1]}
        }
    }

    render(){
        ctx.shadowBlur = 8;
        ctx.lineWidth = 2;


        ctx.beginPath();
        ctx.globalAlpha = this.opac;
        ctx.strokeStyle = this.strokecolor;
        ctx.fillStyle = this.fillcolor;
        ctx.shadowColor = this.shadowcolor;

        if(style){
            ctx.strokeRect(this.x,this.y,this.width,this.height);
            ctx.fillRect(this.x,this.y,this.width,this.height);

        }else{
            ctx.fillRect(this.x,this.y,this.width,this.height);
            ctx.strokeRect(this.x,this.y,this.width,this.height);
        }
        
        
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

        let coltopin = (coltop && (colleft || colright) &&  !colbottom);
        let colbottomin = (colbottom && (colleft || colright) &&  !coltop);
        let colleftin = (colleft && (colbottom && coltop));
        let colrightin = (colright && (colbottom && coltop));

        
        let col = (colright || colleft) && (coltop || colbottom) 


        return {col,coltop,colbottom,colright,colleft,coltopin,colbottomin,colleftin,colrightin};
    }

    setcolors(){
        if(this.type === "platform"){
            this.strokecolor = "black"
            this.fillcolor = "white";
            this.shadowcolor = "black";
            this.opac = 1;
            ;
        }
        else if(this.type === "moving_horizontal_platform"){
            this.strokecolor = "black";
            this.fillcolor = "grey";
            this.shadowcolor = "black";
            this.opac = 1;
        } 
        else if(this.type === "moving_vertical_platform"){
            this.strokecolor = "black";
            this.fillcolor = "grey";
            this.shadowcolor = "black";
            this.opac = 1;
        } 
        else if(this.type === "lava"){
            this.strokecolor = "red";
            this.fillcolor = "red";
            this.shadowcolor = "red";
            this.opac = 1;
        }    
        else if(this.type === "goal"){
            this.strokecolor = "yellow";
            this.fillcolor = "yellow";
            this.shadowcolor = "grey";
            this.opac = 1;
        }    
        else if(this.type === "bounce"){
            this.strokecolor = "#6ec971"
            this.fillcolor = "green";
            this.shadowcolor = "#6ec971";
            this.opac = 1;
        }
        else if(this.type === "water"){
            ctx.globalAlpha = 0.3;
            this.strokecolor = "white"
            this.fillcolor = "#6dccff";
            this.shadowcolor = "#6dccff";
            this.opac = 0.5;
        }
        else if(this.type === "key"){
            this.strokecolor = "#f0dc29"
            this.fillcolor = "#f0dc29";
            this.shadowcolor = "white";
            this.opac = 1;
        }
        else if(this.type === "keydoor"){
            this.strokecolor = "#6c4f38"
            this.fillcolor = "#6c4f38";
            this.shadowcolor = "black";
            this.opac = 1;
        }else{
            this.strokecolor = "white"
            this.fillcolor = "pink";
            this.shadowcolor = "pink";
            this.opac = 1;
        }
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

        if(this.ya> 17 ){this.ya = 17}

        
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
                case "moving_horizontal_platform":
                case "moving_vertical_platform":
                    if(collision.coltopin){
                        this.ya = Math.abs(this.ya)
                        this.ya *=0.4; 
                        this.y = v.y+v.height+this.size+2;
                    }
                    if(collision.colbottomin){
                        this.ya = Math.abs(this.ya)
                        this.ya *=-0.4; 
                        this.y = v.y-this.size-1;
                        this.xa *= 0.8;
                        this.onground = true;
                    }
                    if(collision.colleftin){
                        this.xa *= -0.5; 
                        this.x = v.x+v.width+this.size+1
                    }
                    if(collision.colrightin){
                        this.xa *= -0.5; 
                        this.x = v.x-this.size-1
                    }
                    break;
                case "goal":

                    if (collision.col){
                        if(level !==0){nextlevel()}else{hardreset()}
                    }
                    break;
                case "lava":
                    if (collision.col){
                     this.reset();
                    }
                    break;
                case "bounce":
                    if(collision.coltopin){
                        this.ya = Math.abs(this.ya)
                        this.ya *=1.1; 
                        this.y = v.y+v.height+this.size+2;
                    }
                    if(collision.colbottomin){
                        this.ya = Math.abs(this.ya)
                        this.ya *=-1.1; 
                        this.y = v.y-this.size-1;
                    }
                    if(collision.colleftin){
                        this.xa *= -1.1; 
                        this.x = v.x+v.width+this.size+1
                    }
                    if(collision.colrightin){
                        this.xa *= -1.1; 
                        this.x = v.x-this.size-1
                    }
                    break;
                case "water":

                    if (collision.col){
                        this.ya -= 1.25;
                    }
                    break;
                case "key":

                    if (collision.col){
                        KEYSCOLLECTED.push(v.extra);
                        GAMEOBJECTS.splice(i,1);
                        keyshtml.value = " Current Keys Collected:  \n " + KEYSCOLLECTED.toString();
                    }
                    break;
                case "keydoor":

                    if (collision.col){
                        let indexkey = KEYSCOLLECTED.indexOf(v.extra);
                        if(indexkey !== -1){
                            KEYSCOLLECTED.splice(indexkey,1);
                            GAMEOBJECTS.splice(i,1);
                        }
                        else{
                            if(collision.coltopin){
                                this.ya = Math.abs(this.ya)
                                this.ya *=0.4; 
                                this.y = v.y+v.height+this.size+2;
                            }
                            if(collision.colbottomin){
                                this.ya = Math.abs(this.ya)
                                this.ya *=-0.4; 
                                this.y = v.y-this.size-1;
                                this.xa *= 0.8;
                                this.onground = true;
                            }
                            if(collision.colleftin){
                                this.xa *= -0.5; 
                                this.x = v.x+v.width+this.size+1
                            }
                            if(collision.colrightin){
                                this.xa *= -0.5; 
                                this.x = v.x-this.size-1
                            }
                        }
                        keyshtml.value = " Current Keys Collected:  \n " + KEYSCOLLECTED.toString();

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
        GAMEOBJECTS = [];
        KEYSCOLLECTED = [];
        keyshtml.value = " Current Keys Collected:";
        buildcurrentlevel();

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

if(keys["Escape"]){
    selector.w = 0;
    selector.h = 0;
    removeEventListener("mousemove", mousemove);
    removeEventListener("mouseup", mouseup);
}

}

function render(){

ctx.clearRect(0,0,canvas.width,canvas.height)
player1.render();
GAMEOBJECTS.forEach(v=>{v.render();})
timer.display();
ctx.strokeStyle = "black";

ctx.strokeRect(selector.x,selector.y,selector.w,selector.h)

// ctx.strokeText("Speed : "+Math.abs(Math.round(player1.xa)), 10, 20);
// ctx.strokeText("Level : "+LEVELS[level].name, 80, 20);

if(level === 0){
    ctx.strokeStyle = "green";
    ctx.strokeText("Spawn",spawnpoint.x,spawnpoint.y+10);
}

}

// make gm

function makegm(x,y,w,h,type,extra){
    const newgm = new gameobject(x,y,w,h,type,extra);
    GAMEOBJECTS.push(newgm);
}

function buildcurrentlevel(){

    spawnpoint.x = LEVELS[level].spawn.x;
    spawnpoint.y = LEVELS[level].spawn.y;
    LEVELS[level].content.forEach(v=>{
        makegm(v.x,v.y,v.w,v.h,v.t,v.e);
    })
    timer.stop();
    timer.start();

}



function nextlevel(amount = 1){
    GAMEOBJECTS = [];
    level += amount;
    if (level > LEVELS.length-1){
        level = 1; TIMES = []; 
        timeshtml.value = " Current Level Times: ";
    }
    else{

    if(level !== 0 ){
    timeshtml.value = " Current Level Times: "
    TIMES.push(timer.time);
    TIMES.forEach((v,i)=>{
        timeshtml.value = timeshtml.value + "\n " + " Level: "  + LEVELS[i+1].name + " : " + time(v);

    })
    }}
    levelhtml.value = LEVELS[level].name;
    player1.reset();
    
}

function savelevel(){
    const savedcontent = [];
    const savedlevel = {};
    GAMEOBJECTS.forEach(v=>{
        const savedgm = {}
        savedgm.x = v.x;
        savedgm.y = v.y;
        savedgm.w = v.width;
        savedgm.h = v.height;
        savedgm.t = v.type;
        savedgm.e = v.extra;
        savedcontent.push(savedgm);
    })
    savedlevel.content = savedcontent;
    savedlevel.spawn = spawnpoint;
    savedlevel.name = prompt("Level Name");
    alert(JSON.stringify(savedlevel))

}

function loadlevel(towhere = level){
    if (towhere === LEVELS.length){LEVELS.push(new Object())}
    let loadedlevel = prompt("Enter Level Code !");
    GAMEOBJECTS = [];
    loadedlevel = JSON.parse(loadedlevel);
    LEVELS[towhere].content = loadedlevel.content;
    LEVELS[towhere].name = loadedlevel.name;
    LEVELS[towhere].spawn = loadedlevel.spawn;
    spawnpoint.x = loadedlevel.spawn.x;
    spawnpoint.y = loadedlevel.spawn.y;
    
    player1.reset();

}

function hardreset(){
    document.getElementById("editorbuttons").style.display = "none";
    removeEventListener("click", clicking);
    selector = {}
    GAMEOBJECTS = [];
    TIMES = [];
    level = 1;
    levelhtml.value = LEVELS[level].name;
    timeshtml.value = " Current Level Times: ";
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

// toggle menus n things

function togglePause(){
    document.getElementById("settingsmenu").style.display = "none";
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

function togglestyle(){

    if(style){
        style = false
    }else{
        style = true}

}

// file gen save map

function savemap(){

    let download = document.getElementById("DownloadMap");
    download.href = createFile(JSON.stringify(LEVELS));
    download.style.display = "block";

}

function createFile(levelstxt) {
    let data = new Blob([levelstxt], {type: 'text/plain'});
    
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
  };

// load map

function loadmap(){
    let loadedmap = document.getElementById("loadmap").files[0];
    
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        LEVELS = JSON.parse(event.target.result);
        hardreset();
    });
    reader.readAsText(loadedmap);
    
}

//clear map

function clearmap(){

LEVELS = [{name:"Edit Level",spawn:{x:150,y:100},content:[{x:100,y:150,w:100,h:40}]}]

}


// change input 

function changeinput(self){
    selector.t = self.value;

    if(selector.t === "key"){selector.e = prompt("Enter Key Name !")}
    if(selector.t === "keydoor"){selector.e = prompt("Enter Key Name !")}
    if(selector.t === "moving_horizontal_platform" || selector.t === "moving_vertical_platform"){
        let boundaries = prompt("Enter Boundaries (Two Numbers seperated by a comma) \n and a starting position (also seperated from the others by a comma)").split(",");
        selector.e = [];
        boundaries[0] = Number(boundaries[0]);
        boundaries[1] = Number(boundaries[1]);
        boundaries[2] = Number(boundaries[2]);
        console.log(boundaries)
        selector.e[0] = boundaries[0]; 
        selector.e[1] = boundaries[1]; 
        selector.e[2] = boundaries[2]; 

    }

}

function toggleMenu(id){

    let keybind = document.getElementById(id);
    if(keybind.style.display==="flex"){
        keybind.style.display = "none";
    }else{
        keybind.style.display = "flex";

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
    document.getElementById("editorbuttons").style.display = "flex";
    document.getElementById("DownloadMap").style.display = "none";


    setTimeout(()=>{
        addEventListener("mousedown", clicking); 
    },100)
    


}

function clicking(e){
        
    let rect = canvas.getBoundingClientRect();
    let mouseX = Math.floor((e.clientX- rect.left) /10 )*10;
    let mouseY = Math.floor((e.clientY- rect.top) /10 )*10;
    if(mouseX>=0 && mouseX<800 && mouseY>=0&&mouseY<600){

        if (selector.t === "delete"){

            GAMEOBJECTS.forEach((v,i)=>{
            let collision = v.collision(mouseX,mouseY,mouseX,mouseY);
            if(collision.col){
                GAMEOBJECTS.splice(i,1);
            }
            
            })

        }else if(selector.t === "move_to_top"){

            GAMEOBJECTS.forEach((v,i)=>{
                let collision = v.collision(mouseX,mouseY,mouseX,mouseY);
                if(collision.col){
                    makegm(v.x,v.y,v.width,v.height,v.type,v.extra);
                    GAMEOBJECTS.splice(i,1)}
                }) 

        
        }else if(selector.t === "spawnpoint"){
            spawnpoint.x = mouseX;
            spawnpoint.y = mouseY;
            
            EDITOR.spawn.x = spawnpoint.x ;
            EDITOR.spawn.y = spawnpoint.y ;   

        }
        else{
        addEventListener("mousemove", mousemove); 
        addEventListener("mouseup", mouseup); 

        selector.x1 = mouseX;
        selector.y1 = mouseY;
        selector.x = selector.x1;
        selector.y = selector.y1;
        selector.w = 20;
        selector.h = 20;

        }
    }

}  

function mousemove(e){
    let rect = canvas.getBoundingClientRect();
    let mouseX = Math.floor((e.clientX- rect.left) /10 )*10;
    let mouseY = Math.floor((e.clientY- rect.top) /10 )*10;

    selector.x2 = mouseX;
    selector.y2 = mouseY;
    if(selector.x1 < selector.x2){
        selector.x = selector.x1; selector.w = selector.x2-selector.x1+10;  }
    else if(selector.x1 === selector.x2){
        selector.x = selector.x1; selector.w = 20; 
    }
    else{ 
        selector.x = selector.x2; selector.w = selector.x1-selector.x2+10;   
    }

    if(selector.y1 < selector.y2){
        selector.y = selector.y1; selector.h = selector.y2-selector.y1+10;}
    else if(selector.y1 === selector.y2){
        selector.y = selector.y1; selector.h = 20; 
    }else{
        selector.y = selector.y2; selector.h = selector.y1-selector.y2+10;
        }
}

function mouseup(){

    makegm(selector.x,selector.y,selector.w,selector.h,selector.t,selector.e)
    let typet = selector.t;
    let extrat = selector.e;
    selector = {};
    selector.t = typet;
    selector.e = extrat;
    removeEventListener("mousemove", mousemove);
    removeEventListener("mouseup", mouseup);

}