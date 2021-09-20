const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con1,fruit_con2,fruit_con3;


var bg_img;
var food;
var rabbit,rabbitImg;
var blink;
var eat;
var sad;
var muteButton;
var cutSound;
var bgSound;
var sadSound;
var eatingSound;
var airSound;
var blower;
var button1
var button2
var button3
var rope1,rope2,rope3
var shelf
var bubble

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbitImg = loadImage('Rabbit-01.png');
  eat=loadAnimation('eat_0.png','eat_1.png','eat_2.png','eat_3.png','eat_4.png');
  blink=loadAnimation('blink_1.png','blink_2.png','blink_3.png');
  sad=loadAnimation('sad_1.png','sad_2.png','sad_3.png');
  cut=loadAnimation('cut_btn.png','cut_button.png');
  
  sadSound= loadSound('sad.wav');
  bgSound=loadSound('sound1.mp3');
  cutSound=loadSound('rope_cut.mp3');
  eatingSound=loadSound('eating_sound.mp3');
  airSound=loadSound('air.wav');

  blink.playing=true;
  eat.playing=true;
  eat.looping=false;
  sad.playing=true;
  sad.looping=false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  

  rabbit=createSprite(230,620,100,100);
  rabbit.scale=0.2;

  rope1 = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:30});
  rope3 = new Rope(4,{x:400,y:225});

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope1.body,fruit);
  fruit_con1 = new Link(rope1,fruit);
  fruit_con2= new Link(rope2,fruit);
  fruit_con3= new Link(rope3,fruit);
 

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
  blink.frameDelay=20;
  eat.frameDelay=20;
  sad.frameDelay=20;

  
  rabbit.addAnimation('blinking',blink);
  rabbit.addAnimation('eating',eat);
  rabbit.addAnimation('crying',sad);
  rabbit.changeAnimation('blinking');

bgSound.play();
bgSound.setVolume(0.5);

button1 = createImg('cut_btn.png')
  button1.position(20,30);
  button1.size(50,50);
  button1.mouseClicked(drop1);

  button2=createImg('cut_btn.png')
  button2.position(300,35);
  button2.size(60,60);
  button2.mouseClicked(drop2);

  button3=createImg('cut_btn.png')
  button3.position(360,200);
  button3.size(60,60);
  button3.mouseClicked(drop3);

  muteButton =createImg('mute.png');
  muteButton.position(450,20);
  muteButton.size(50,50);
  muteButton.mouseClicked(mute);
  
  blower = createImg('blower.png');
  blower.position(10,250);
  blower.size(150,100);
  //blower.mouseClicked();

 

}

  
  

function draw() 
{
  background(51);

  image(bg_img,0,0,490,690);
  push()
  imageMode(CENTER)
  if(fruit!=null){
  image(food,fruit.position.x,fruit.position.y,60,70);
  }
  pop()
  rope1.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  if(collide(fruit,rabbit,80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    rabbit.changeAnimation('eating');
    eatingSound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    rabbit.changeAnimation('crying');
    bgSound.stop();
    sadSound.play();
    fruit=null;
   }

   if(collide(fruit,rabbit,80)==true)
   {
     remove_rope();
     bubble.visible=false;
     world.remove(engine.world,fruit);
     fruit=null;
     rabbit.changeAnimation('eating')
   }


  drawSprites();
}



  function drop1()
  {
    rope1.break()
    fruit_con1.detach()
    fruit_con1=null
    cutSound.play();
   }

   function drop2()
  {
    rope2.break()
    fruit_con2.detach()
    fruit_con2=null
    cutSound.play();
  }
    function drop3()
    {
      rope3.break()
      fruit_con3.detach()
      fruit_con3=null
      cutSound.play();
  
  
      
    }
    
  

  function mute ()
  {
    if(bgSound.isPlaying()) {
      bgSound.stop()
    
    }
    else{
      bgSound.play()
    }

  }

  function collide(body,sprite,x)
  {
    if(body!=null)
          {
           var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
            if(d<=x)
              {
                 return true; 
              }
              else{
                return false;
              }
           }
  }
    
   

