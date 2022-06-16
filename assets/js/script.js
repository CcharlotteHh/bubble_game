//Canvas Setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); //2d drawing method
canvas.width = 800;
canvas.height = 500;

let playerName = prompt('Player, what is your name?')
let score = 0;
let gameFrame = 0;
ctx.font = "50px Georgia";

let startTime = null;


///Mouse Interactivity
let canvasPosition = canvas.getBoundingClientRect(); //messaure current size and position of canvas element
const mouse = {
  x: canvas.width / 2, //middle of screen horizontally
  y: canvas.height / 2, //middle of screen vertically
  click: false,
  
};
canvas.addEventListener("mousedown", function (event) {
  mouse.click = true;
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
  
});
canvas.addEventListener("mouseup", function () {
  mouse.click = false;
});
//Player
class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.radius = 50;
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 498;
    this.spriteHeight = 327;
  }
  update() {
    const dx = this.x - mouse.x; //distance x
    const dy = this.y - mouse.y; //distance y
    if (mouse.x != this.x) {
      this.x -= dx / 30;
    }
    if (mouse.y != this.y) {
      this.y -= dy / 30;
    }
  }
  draw() {
    if (mouse.click) {
      ctx.lineWidth = 0;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

const player = new Player();
//bubbles
const bubblesArray = [];
class Bubble {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 100;
    this.radius = Math.random() * 100;
    this.speed = Math.random() * 5 + 1;
    this.distance;
    this.counted = false;
    this.sound = Math.random() <= 0.5 ? "sound1" : "sound2";
    this.color = colorArray[Math.floor(Math.random()*3)];
  }
  update() {
    this.y -= this.speed;
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}

const colorArray = ["rgba(0,255,255,0.5)","rgba(0,0,255,0.5)","rgb(128,255,170,0.5)"];


const bubblePop1 = document.createElement("audio");
bubblePop1.src = "assets/audio/bubble1.wav";

const bubblePop2 = document.createElement("audio");
bubblePop2.src = "assets/audio/bubble2.ogg";

function handleBubbles() {
  if (gameFrame % 50 == 0) {
    bubblesArray.push(new Bubble());
  }
  for (let i = 0; i < bubblesArray.length; i++) {
    bubblesArray[i].update();
    bubblesArray[i].draw();
  }

  for (let i = 0; i < bubblesArray.length; i++) {
    if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2) {
      bubblesArray.splice(i, 1);
    }
    if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius) {
      //collision
      if (!bubblesArray[i].counted) {
        if (bubblesArray[i].sound == "sound1") {
          bubblePop1.play();
        } else {
          bubblePop2.play();
        }
        score++;
        bubblesArray[i].counted = true;
        bubblesArray.splice(i, 1);
      }
    }
  }
}

//animation loop
function animate(timeStamp) {
  if(!startTime){
    startTime = timeStamp;
  }

  const runTime = timeStamp - startTime;
  const seconds = Number.parseInt(runTime /1000);
  if (seconds === 5 ){
    	document.getElementById("overlay").style.display = "block";
      document.getElementById('restartButton').addEventListener('click', startGame);
      
      var scoreBoard = document.getElementById('scoreBoard')
      scoreBoard.innerHTML = `score: ${score}`;

      var highScore = document.getElementById('highScore')
      highScore.innerHTML = `Highscore: ${score}`;
     
      
  }
  else{

  }


  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  handleBubbles();
  player.update();
  player.draw();
  ctx.fillStyle = "black";
  ctx.fillText("score: " + score, 10, 50);
  ctx.fillText("time: " + (60 - seconds) , 450, 50);
  gameFrame++;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);



function startGame(){
  startTime = null;
  score = 0;
  gameFrame = 0;
  document.getElementById('restartButton').removeEventListener('click', startGame);
  document.getElementById("overlay").style.display = "none";
}

save_score = () => {
  if (document.getElementById("highScore").value === "") {
      document.getElementById("highScore").style.border = "1px solid red";
      document.getElementById("highScore").placeholder = "Vul een naam in aub";
      return false;
  }
}

