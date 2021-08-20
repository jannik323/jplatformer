"use strict";

let canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 600;
let ctx = canvas.getContext("2d");
ctx.lineWidth = 1;
ctx.shadowColor = "black";
let pausemenu = document.getElementById("pausemenu");

let keyshtml = document.getElementById("keyshtml");
keyshtml.value = " Current Keys Collected:  ";
let levelhtml = document.getElementById("levelhtml");



let selector = {};
const spawnpoint = {x:150,y:10}
let ineditor = false;



const keys = {};
let GAMEOBJECTS = [];
let KEYSCOLLECTED = [];
let level_x = 0;
let level_y = 0;
let textFile = null;
let style = true;

const EDITOR = {
    name:"Edit ",
    spawn:{x:250,y:100},
    content:[
        {x:200,y:150,w:100,h:40},
    ]
}

let LEVELS = [

    [
        {"content":[{"x":430,"y":340,"w":40,"h":180,"t":"keydoor","e":"upper key"},{"x":570,"y":490,"w":20,"h":20,"t":"key","e":"upper key"},{"x":40,"y":400,"w":100,"h":20,"t":"platform","e":"upper key"},{"x":240,"y":470,"w":30,"h":50,"t":"platform","e":"upper key"},{"x":430,"y":150,"w":40,"h":170,"t":"keydoor","e":"goal door"},{"x":600,"y":290,"w":60,"h":30,"t":"platform","e":"goal door"},{"x":140,"y":570,"w":70,"h":30,"t":"platform","e":"none"},{"x":220,"y":320,"w":300,"h":20,"t":"platform","e":"upper key"},{"x":450,"y":520,"w":220,"h":40,"t":"platform","e":"none"},{"x":210,"y":520,"w":240,"h":70,"t":"platform","e":"none"},{"x":110,"y":520,"w":100,"h":50,"t":"platform","e":"none"},{"x":0,"y":320,"w":40,"h":280,"t":"platform","e":"upper key"},{"x":0,"y":150,"w":40,"h":170,"t":"platform","e":null},{"x":0,"y":130,"w":520,"h":20,"t":"platform","e":null}],"spawn":{"x":310,"y":280},"name":"a start and an end"}
    ,   {"content":[{"x":340,"y":270,"w":420,"h":40,"t":"platform","e":"none"},{"x":390,"y":230,"w":30,"h":40,"t":"platform","e":"none"},{"x":40,"y":300,"w":270,"h":30,"t":"platform","e":"none"}],"spawn":{"x":250,"y":100},"name":"test 2"}
    
    ],


    [
        {"content":[{"x":730,"y":210,"w":70,"h":390,"t":"platform","e":"none"},{"x":0,"y":0,"w":40,"h":600,"t":"platform","e":"none"},{"x":40,"y":550,"w":400,"h":50,"t":"platform","e":"none"},{"x":440,"y":560,"w":290,"h":40,"t":"lava","e":"none"},{"x":280,"y":500,"w":30,"h":50,"t":"platform","e":"none"},{"x":140,"y":0,"w":30,"h":160,"t":"platform","e":"none"},{"x":170,"y":0,"w":20,"h":100,"t":"platform","e":"none"},{"x":190,"y":0,"w":20,"h":40,"t":"platform","e":"none"},{"x":40,"y":470,"w":30,"h":80,"t":"platform","e":"none"},{"x":390,"y":440,"w":30,"h":110,"t":"platform","e":"none"},{"x":550,"y":410,"w":40,"h":190,"t":"platform","e":"none"},{"x":650,"y":320,"w":80,"h":30,"t":"platform","e":"none"},{"x":470,"y":270,"w":30,"h":30,"t":"platform","e":"none"},{"x":710,"y":210,"w":20,"h":110,"t":"lava","e":null},{"x":470,"y":140,"w":30,"h":30,"t":"platform","e":null},{"x":360,"y":220,"w":30,"h":30,"t":"platform","e":null}],"spawn":{"x":310,"y":280},"name":"getting up"}
    ,   {"content":[{"x":620,"y":490,"w":180,"h":110,"t":"platform","e":"none"},{"x":470,"y":520,"w":150,"h":80,"t":"platform","e":"none"},{"x":270,"y":540,"w":200,"h":60,"t":"platform","e":"none"},{"x":0,"y":360,"w":270,"h":240,"t":"platform","e":"none"},{"x":360,"y":460,"w":20,"h":20,"t":"platform","e":"none"},{"x":300,"y":390,"w":20,"h":20,"t":"platform","e":"none"},{"x":420,"y":340,"w":100,"h":20,"t":"platform","e":"none"},{"x":660,"y":280,"w":20,"h":130,"t":"platform","e":"none"},{"x":660,"y":260,"w":20,"h":20,"t":"lava","e":"none"},{"x":0,"y":270,"w":140,"h":90,"t":"platform","e":"none"},{"x":0,"y":210,"w":50,"h":60,"t":"platform","e":"none"},{"x":680,"y":330,"w":120,"h":80,"t":"platform","e":"none"}],"spawn":{"x":310,"y":280},"name":"getting up"}
    ,   {"content":[{"x":280,"y":330,"w":80,"h":90,"t":"platform","e":"none"},{"x":390,"y":330,"w":50,"h":90,"t":"platform","e":"none"},{"x":280,"y":500,"w":160,"h":100,"t":"platform","e":"none"},{"x":130,"y":550,"w":150,"h":50,"t":"platform","e":"none"},{"x":440,"y":470,"w":150,"h":130,"t":"platform","e":"none"},{"x":590,"y":300,"w":210,"h":300,"t":"platform","e":"none"},{"x":420,"y":300,"w":20,"h":30,"t":"platform","e":"none"},{"x":0,"y":500,"w":130,"h":100,"t":"platform","e":"none"},{"x":0,"y":330,"w":130,"h":90,"t":"platform","e":"none"},{"x":770,"y":0,"w":30,"h":300,"t":"platform","e":"none"}],"spawn":{"x":310,"y":280},"name":"underground"}
    ],
 
    
]




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
            buildcurrentlevel();

        }

        //walls

        if( this.x > canvas.width-this.size){nextlevel(1); this.x = 0 }
        if( this.x < 0){nextlevel(-1); this.x = canvas.width-this.size;}

        if(this.y > canvas.height-this.size){nextlevel(0,1); this.y = 0}
        if(this.y < 0){nextlevel(0,-1); this.y = canvas.height-this.size}
        
        
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
                case "lava":
                    if (collision.col){
                     this.reset();
                    buildcurrentlevel();

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

        if(ineditor){
        this.x = EDITOR.spawn.x;
        this.y = EDITOR.spawn.y;
        }else{
        this.x = LEVELS[level_y][level_x].spawn.x;
        this.y = LEVELS[level_y][level_x].spawn.y;
        KEYSCOLLECTED = [];
        keyshtml.value = " Current Keys Collected:";
    }

        this.health = 100;
        this.xa = 0;
        this.ya = 0;
        this.onground = false;

    }

}



// make players

const player1 = new player(LEVELS[level_y][level_x].spawn.x,LEVELS[level_y][level_x].spawn.y,9)

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
ctx.strokeStyle = "black";

ctx.strokeRect(selector.x,selector.y,selector.w,selector.h)


if(ineditor){
    ctx.strokeStyle = "green";
    ctx.strokeText("Spawn",spawnpoint.x,spawnpoint.y+10);
}

}

// make gm

function makegm(x,y,w,h,type,extra){
    const newgm = new gameobject(x,y,w,h,type,extra);
    GAMEOBJECTS.push(newgm);
}

function buildcurrentlevel(hardreset = false){
    if(ineditor && hardreset === false){buildeditorlevel();}{
    GAMEOBJECTS = []
    spawnpoint.x = LEVELS[level_y][level_x].spawn.x;
    spawnpoint.y = LEVELS[level_y][level_x].spawn.y;
    LEVELS[level_y][level_x].content.forEach(v=>{
        makegm(v.x,v.y,v.w,v.h,v.t,v.e);
    })}

}

function buildeditorlevel(){
    spawnpoint.x = EDITOR.spawn.x;
    spawnpoint.y = EDITOR.spawn.y;
    EDITOR.content.forEach(v=>{
        makegm(v.x,v.y,v.w,v.h,v.t,v.e);
    })
}



function nextlevel(x = 0,y = 0){
    
    if(!ineditor){
    level_x += x;
    level_y += y;
    GAMEOBJECTS = [];
    
    if (level_y < 0){level_y = LEVELS.length-1; }
    if (level_y > LEVELS.length-1){level_y = 0; }

    if (level_x > LEVELS[[level_y]].length-1){level_x = 0; }
    if (level_x < 0){level_x = LEVELS[[level_y]].length-1; }

    buildcurrentlevel();
    }
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

function loadlevel(towherex = level_x, towherey = level_y){
    if (towherex === LEVELS[towherey].length){LEVELS[towherey].push(new Object())}
    let loadedlevel = prompt("Enter Level Code !");
    GAMEOBJECTS = [];
    loadedlevel = JSON.parse(loadedlevel);

    if(!ineditor){
        LEVELS[towherey][towherex].content = loadedlevel.content;
        LEVELS[towherey][towherex].name = loadedlevel.name;
        LEVELS[towherey][towherex].spawn = loadedlevel.spawn;
        buildcurrentlevel();
    }else{
        EDITOR.content = loadedlevel.content;
        EDITOR.name = loadedlevel.name;
        EDITOR.spawn = loadedlevel.spawn;
        buildeditorlevel();
    }
    
    spawnpoint.x = loadedlevel.spawn.x;
    spawnpoint.y = loadedlevel.spawn.y;
    player1.reset();
}

function hardreset(){
    document.getElementById("editorbuttons").style.display = "none";
    removeEventListener("click", clicking);
    selector = {}
    GAMEOBJECTS = [];
    level_x = 0;
    player1.reset();
    buildcurrentlevel(true);
    ineditor = false;

}

//distance

function distance(x1,x2,y1,y2){

return Math.sqrt(((x2-x1)**2)+((y2-y1)**2));

}


function randomrange(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


// toggle menus n things

function togglePause(){
    document.getElementById("settingsmenu").style.display = "none";
    if(GameSpeed === 0){
        pausemenu.style.display = "none";
        canvas.style.filter = "none"
        GameSpeed = lastGameSpeed; 


    }else{
        pausemenu.style.display = "flex";
        canvas.style.filter = "blur(10px)";
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

LEVELS = [[]]

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
    
    ineditor = true;
    GAMEOBJECTS = [];
    buildeditorlevel();
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

        }else if(selector.t === "nove_to_top"){

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