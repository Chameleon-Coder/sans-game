 var cookie, cookieimg, ground, groundimg, invi,cloudimg, obs1img,obs2img,obs3,img,obs4img,obs5img,obs6img, count, GAMESTATE, PLAY, END, cloudgroup, obsgroup, cookiefuneralimg, oroborousimg, youkilledcookieimg, oroborous, belial, cordeliacarstairs, annalightwood, jesseblackthorn
 
 function preload() {
   cookieimg= loadAnimation("trex1.png","trex3.png","trex4.png");
   
   groundimg= loadImage("ground2.png");
   
   cloudimg= loadImage("cloud.png");
   
   obs1img= loadImage("obstacle1.png");
   
   obs2img= loadImage("obstacle2.png");
   
   obs3img= loadImage("obstacle3.png");
   
   obs4img= loadImage("obstacle4.png");
                      
   obs5img= loadImage("obstacle5.png");
   
   obs6img= loadImage("obstacle6.png");
   
   cookiefuneralimg= loadImage("trex_collided.png");
   
   youkilledcookieimg= loadImage("gameOver.png");
   
   oroborousimg= loadImage("restart.png");
   
   cordeliacarstairs= loadSound("jump.mp3");
   
   annalightwood= loadSound("checkPoint.mp3");
   
   jesseblackthorn= loadSound("die.mp3");
   
   
 }

function setup() {
  createCanvas(600, 200);
  
  cookie = createSprite(30,162,3,3);
  cookie.addAnimation("trex",cookieimg);
  cookie.addImage("coooo",cookiefuneralimg);
  cookie.scale= 0.5;
  
  ground = createSprite(200,170,400,10);
  ground.velocityX = -2;
  ground.addImage("base",groundimg);
  
  invi = createSprite(200,175,400,10);
  invi.visible= false;
  
  count= 0;
  
  oroborous= createSprite(280,100,3,3);
  oroborous.addImage("hypatiavex",oroborousimg);
  oroborous.scale= 0.5;
  oroborous.visible= false;
  
  belial= createSprite(280,70,3,3);
  belial.addImage("graceblackthorn",youkilledcookieimg);
  belial.scale= 0.5;
  belial.visible= false;
  
  PLAY= 1;
  END= 0;
  GAMESTATE= PLAY;
  
  cloudgroup= new Group();
  obsgroup= new Group();
  
}

function draw() {
  background("skyblue");
  
  cookie.collide(invi);
  
  if(GAMESTATE === PLAY){
    
    ground.velocityX= -(5+2*count/100);
    
    if(keyDown("space")&& cookie.y>119 ){
    cookie.velocityY= -10;
    
      cordeliacarstairs.play();
  }
  
  cookie.velocityY = cookie.velocityY+0.8;
    
    if(count%100===0 && count>0){
      annalightwood.play();
    }
    
  
  if(ground.x<0){
    ground.x= ground.width/2;
  }
  
    count= count+Math.round(getFrameRate()/60);
    
    createcloud();
   createobstacles();
    
    if(cookie.isTouching(obsgroup)){
         GAMESTATE = END;
      
      jesseblackthorn.play();
       }
    
  }
  else
   if(GAMESTATE=== END){
     ground.velocityX= 0;
     cloudgroup.setVelocityXEach(0);
     obsgroup.setVelocityXEach(0);
     cloudgroup.setLifetimeEach(-1);
     obsgroup.setLifetimeEach(-1);
     cookie.velocityY= 0;
     cookie.changeAnimation("coooo", cookiefuneralimg);
     oroborous.visible= true;
     belial.visible= true;
     
     if(mousePressedOver(oroborous)){
       reset();
     }
     
                            
    }
  
  
  text(mouseX+","+mouseY,mouseX,mouseY);
  
  text("SCORE:"+count,500,20);
  
  
  
  
  
  
  drawSprites();
}

function createcloud(){
  if(frameCount%120 === 0){
  var Cloud= createSprite(600,random(21,120),3,3);
  Cloud.velocityX= -3;
  Cloud.addImage("clee",cloudimg);
  Cloud.scale= 0.8;
  Cloud.lifetime= 210;
  cookie.depth= Cloud.depth+1;
    
  cloudgroup.add(Cloud);
   }
}

function createobstacles(){
  
  var randee= Math.round(random(1,6));
  
  if(frameCount%100 === 0){
    var Obstacles= createSprite(600,152,3,3);
    Obstacles.velocityX= -(5+2*count/100);
    switch(randee){
      case 1:Obstacles.addImage("obs1",obs1img);
      break;
      case 2:Obstacles.addImage("obs2",obs2img);
      break;
      case 3:Obstacles.addImage("obs3",obs3img);
      break;
      case 4:Obstacles.addImage("obs4",obs4img);
      break;
      case 5:Obstacles.addImage("obs5",obs5img);
      break;
      case 6:Obstacles.addImage("obs6",obs6img);
      break;
      default:break;
    }
    Obstacles.scale= 0.5;
    Obstacles.lifetime= 310;
    
    obsgroup.add(Obstacles);
    
  }
}

function reset(){
  GAMESTATE= PLAY;
  count= 0;
  cookie.changeImage("trex",cookieimg);
  oroborous.visible= false;
  belial.visible= false;
  cloudgroup.destroyEach();
  obsgroup.destroyEach();
  ground.velocityX= -2;
}








