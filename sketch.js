const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var wall1, wall2;
var stones = [];
var bridge, link, jointPoint;
var ground;
var zombie1, zombie2, zombie3, zombie4, zombie;
var breakButton, zombie5;
var collided = false;

function preload() {
  zombie1 = loadImage("zombie1.png");
  zombie2 = loadImage("zombie2.png");
  
  zombie3 = loadImage("zombie3.png");
  zombie4 = loadImage("zombie4.png");
  
  zombie5 = loadImage("sad_zombie.png")
  backgroundImage = loadImage("background.png")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  ground = new Base(0, height -10, width*2, 20);
  wall1 = new Base(200, height/2+50, 300, 100);
  wall2 = new Base(width-200, height/2+50,300,100);
  bridge = new Bridge(17, { x: width / 2 - 400, y: height / 2 });
  jointPoint = new Base(width-300, height/2 + 10 , 40, 20);
  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link (bridge, jointPoint)
   for (var i = 0; i<=8; i++){
     var x = random(width/2 -200, width/2 + 300)
     var y = random(-10, 140);
     var stone = new Stone(x,y,40,40);
    stones.push(stone);
  
  }

  zombie= createSprite(width/2, height-110);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4,zombie3);
  zombie.scale = 0.1;
  zombie.velocity = 10;

  breakbutton = createButton("");
  breakButton.position(width-200, height/2 - 50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);

}

function draw() {
  background(51);
  Engine.update(engine);

  ground.show();
  wall1.show();
  wall2.show();
  bridge.show();
  for (var stone of stones){
    stone.display();
  }
  var pos = stone.body.postion;
  var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y);
  if (distance<=50){
    zombie.velocityX = 0;
    Matter.Body.setVelocity(stone.body, {x : 10, y : -10});
    zombie.changeImage("sad");
    collided = true;
  }

}


function handleButtonPress(){
  jointLink.detach();
  setTimeout(() =>{
    bridge.break();
  }, 1500);
}
