//Canvas Setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); //2d drawing method
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = "50px Georgia";
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
  console.log(mouse.x, mouse.y); //console logs mouseposition inside of canvas
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
    this.radius = 50;
    this.speed = Math.random() * 5 + 1;
    this.distance;
    this.counted = false;
    this.sound = Math.random()<= 0.5 ? 'sound1' : 'sound2';

  }
  update() {
    this.y -= this.speed;
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }
  draw() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}
const bubblePop1 = document.createElement('audio');
bubblePop1.src = "assets/audio/bubble1.wav";

const bubblePop2 = document.createElement('audio');
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
    if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius) { //collision
      if(!bubblesArray[i].counted){
          if(bubblesArray[i].sound = 'sound1'){
              bubblePop1.play();
          }else {
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
function animate() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  handleBubbles();
  player.update();
  player.draw();
  ctx.fillStyle = "black";
  ctx.fillText("score: " + score, 10, 50);
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
