// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, height,
 *    mouseX, mouseY, noStroke, random, rect, round, sqrt, text, width
 *    frameRate, stroke, noFill, keyCode, UP_ARROW, DOWN_ARROW
 *    RIGHT_ARROW, LEFT_ARROW, fill, collideRectRect, noLoop, textAlign, textSize, CENTER, loop, LEFT, collideLineRect,keyIsDown,loadImage,strokeWeight,rectMode,image,song,loadSound,soundLoop,delay,duration,Time,loadFont,textFont,mouseIsPressed,imageMode,millis,int
 */
let coin,girlpic, clouds, jumpSound, coinSound,villian,lifeSound, deadSound, winSound, themeSound;
var stage = 0;//game start
//counters
var score = 0;
var lives = 2;
var totalTime;//total time of game run
var timeLimit = 15;//how much time do you have to succeed
var splashTime;//amount of time of splashscreen only
var gameTime;//amount of time in game only
//player
var pX = 400;
var pY = 375;
var pW = 50;
var pH = 80;
//platforms
var bX = 200;
var bY = 300;
var b2X = 600;
var b2Y = 300;
var b3X = 500;
var b3Y = 150;
var bW = 200;
var bH = 40;

//gems
var cX = 600;
var cY = 410;
var c2X = 600;
var c2Y = 250;
var c3X = 500;
var c3Y = 100;
var c4X = 200
var c4Y = 250;
var cW = 30;
var cH = 30;

//villian
var gX = 200;
var gY = 375;
var gW = 50;
var gH = 80;
var g2X = 550;
var g2Y = 50;

//villian movement
var gPosition = 200;
var g2Position = 500;
var gSpeed = 2; // how fast goombas move
var gDirection = 1;//1 moves right and -1 moves left
var gDistance = 100;//how far can they go
var g2Direction = -1;//1 moves right and -1 moves left
var g2Distance = 40;//how far can they go

//gravity
var jump = false; //are we jumping
var direction = 1; //the force of gravity
var velocity = 2; //the speed of the player
var jumpPower = 15; //the energy or strength of the player
var fallingSpeed = 2; //equal to velocity
var minHeight = 375; //height of the ground
var maxHeight = 50; //height of the ceiling
var jumpCounter = 0; //keeps track of how much we jump
var maxwidth = 800;
var girlFont;

function splash (){
  background(clouds);
  textFont(girlFont);
  splashTime = totalTime;//begin splash screen.00
  fill(255);
  stroke(0);
  stroke(10);
  textSize(100);
  text('UNIVERSITIA', width / 2, 350, width, height);
  textSize(40);
  text('By: DOROTHY MONTROSE', width/2, 440, width, height);
  
  //instructions
  textSize(20);
  text('HOW TO PLAY:', width/2, 480, width, height);
  text('USE THE ARROW KEYS TO MOVE LEFT AND RIGHT', width/2, 520, width, height);
  text('PRESS J TO JUMP', width/2, 560, width, height);
  text('CLICK THE SCREEN TO START', width/2, 580);
  text('WATCH OUT FOR VILLIANS', width/2, 600, width, height);
  text('OBTAIN ALL COINS BEFORE TIME RUNS OUT', width/2, 640, width, height);
}

function preload() {
  clouds = loadImage('https://cdn.glitch.com/a1d42110-66cd-418c-97ef-a864b1474001%2Fs4m_ur4i-bg_clouds.png?v=1627504155709');
  girlpic = loadImage('https://cdn.glitch.com/a1d42110-66cd-418c-97ef-a864b1474001%2Favatar.png?v=1627503630789');
  villian = loadImage('https://cdn.glitch.com/a1d42110-66cd-418c-97ef-a864b1474001%2Fevilman.png?v=1627618969553')
  coin = loadImage('https://cdn.glitch.com/a1d42110-66cd-418c-97ef-a864b1474001%2Fgem.gif?v=1627618553660');
  jumpSound = loadSound('https://cdn.glitch.com/a1d42110-66cd-418c-97ef-a864b1474001%2Fmixkit-player-jumping-in-a-video-game-2043.wav?v=1627542031335');
  girlFont = loadFont('https://cdn.glitch.com/a1d42110-66cd-418c-97ef-a864b1474001%2FMinecraft.ttf?v=1627594173310'); 
  coinSound = loadSound('https://cdn.glitch.com/a1d42110-66cd-418c-97ef-a864b1474001%2Fmixkit-arcade-game-jump-coin-216.wav?v=1627627280082');
  lifeSound = loadSound('https://cdn.glitch.com/a1d42110-66cd-418c-97ef-a864b1474001%2Fsfx-pop2.mp3?v=1627780628810')
  deadSound = loadSound('https://cdn.glitch.com/a1d42110-66cd-418c-97ef-a864b1474001%2Fsfx-defeat3.mp3?v=1627762576264')
  winSound = loadSound('https://cdn.glitch.com/a1d42110-66cd-418c-97ef-a864b1474001%2Fgame-win-sound-effect.mp3?v=1628398928858')
  themeSound = loadSound('https://cdn.glitch.com/a1d42110-66cd-418c-97ef-a864b1474001%2FFriends.ogg?v=1627619176701')
}
//setup

function setup() {
  createCanvas(800, 500);
  rectMode(CENTER);
  textAlign(CENTER);
  
  themeSound.play();
}

function draw() {
  keyPressed();
  gravity();
  if (stage == 0) {
    splash();
  }
  if(stage == 1) {
    Game();
  }
  if(stage == 2) {
    winScreen();
  }
  if(stage == 3) {
    loseScreen();
  }
  if (mouseIsPressed == true) {
    stage = 1;
  }//starts the game
  totalTime = millis();// start time
  
}
function Game() {
  background(clouds);
 
  //window frame
  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width / 2, height / 2, width, height)
  //grass
  noStroke();
  fill(255, 179, 245);
  rect(width / 2, 500, width, 100);
  
  //draw platforms
  stroke(0);
  strokeWeight(3);
  fill(255,179,255);
  rect(bX, bY, bW, bH);
  rect(b2X, b2Y, bW, bH);
  rect(b3X, b3Y, bW, bH);

  
  //collisions
  if (pX >= bX - bW / 2 && pX <= bX + bW / 2 && pY + pH >= bY - bH / 2 && pY + pH <= bY + bH / 2 && jump == false) {
    pY = pY;//don't fall
    velocity = 0; //no speed because we aren't falling
    jumpCounter = 0;//allows up to jump again 
}
   if (pX >= b2X - bW / 2 && pX <= b2X + bW / 2 && pY + pH >= b2Y - bH / 2 && pY + pH <= b2Y + bH / 2 && jump == false) {
    pY = pY;//don't fall
    velocity = 0; //no speed because we aren't falling
    jumpCounter = 0;//allows up to jump again
 }
   
  if (pX >= b3X - bW / 2 && pX <= b3X + bW / 2 && pY + pH >= b3Y - bH / 2 && pY + pH <= b3Y + bH / 2 && jump == false) {
    pY = pY;//don't fall
    velocity = 0; //no speed because we aren't falling
    jumpCounter = 0;//allows up to jump again
}
  image(coin, cX, cY, cW, cH);
  if (pX >= cX - cW / 2 && pX <= cX + cW / 2 && pY <= cY - cH / 2 && pY <= cY + cH / 2) {
    score = score + 1; //gets points > girl hits gem
    cX = -1000; //gem disappears
    coinSound.play();
 }
  image(coin, c2X, c2Y, cW, cH);
  if (pX >= c2X - cW / 2 && pX <= c2X + cW / 2 && pY <= c2Y - cH / 2 && pY <= c2Y + cH / 2) {
    score = score + 1; //gets points > girl hits gem
    c2X = -1000; //gem disappears
    coinSound.play();
 }
  image(coin, c3X, c3Y, cW, cH);
  if (pX >= c3X - cW / 2 && pX <= c3X + cW / 2 && pY <= c3Y - cH / 2 && pY <= c3Y + cH / 2) {
    score = score + 1; //gets points > girl hits gem
    c3X = -1000; //gem disappears
    coinSound.play();
 }
  image(coin, c4X, c4Y, cW, cH);
  if (pX >= c4X - cW / 2 && pX <= c4X + cW / 2 && pY <= c4Y - cH / 2 && pY <= c4Y + cH / 2) {
    score = score + 1; //gets points > girl hits gem
    c4X = -1000; //gem disappears
    coinSound.play();
 }
  //villian
  image(villian, gX, gY, gW, gH);
  if (pX >= gX - gW / 2 && pX <= gX + gW / 2 && pY >= gY - gH / 2 && pY <= gY + gH / 2) {
    lifeSound.play();
    lives -= 1;
    pX = 400;
    pY = 375;
  }
   if (gX >= gPosition + gDistance || gX <= gPosition - gDistance)
    {
      gDirection *= -1;
    }
 
  gX = gX + (gSpeed * gDirection)
//villian 2
  image(villian, g2X, g2Y, gW, gH);
  if (pX >= g2X - gW / 2 && pX <= g2X + gW / 2 && pY >= g2Y - gH / 2 && pY <= g2Y + gH / 2) {
    lifeSound.play();
    lives -= 1;
    pX = 400;
    pY = 375;
  }
  if (g2X >= g2Position + g2Distance || g2X <= g2Position - g2Distance)
    {
      g2Direction *= -1;
    }
 
  g2X = g2X + (gSpeed * gDirection)

  //girl
  stroke(0);
  strokeWeight(5);
  image(girlpic,pX, pY, pW, pH);

  //scoreboard
  textFont(girlFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(20);
  text('POINTS:', 50, 50);
  text(score, 100, 50);
  //lives
  textFont(girlFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(20);
  text('LIVES:', 150, 50);
  text(lives, 200, 50);
 //timer
  splashTime = splashTime;//stop counting time on splashscreen
  gameTime = int((totalTime - splashTime)/ 1000);
  textFont(girlFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(20);
  text('TIME REMAINING:', 600, 50);
  text(timeLimit-gameTime, 700, 50);
  
  
  if(score >= 4) {
    winSound.play();
    stage = 2;
  }
  
  if(lives <= 0) {
    deadSound.play();
    stage = 3;
  }
  if(gameTime >= timeLimit) {
    deadSound.play();
    stage = 3;
  }
}//close game
function winScreen() {
  background(clouds);
  textFont(girlFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(150);
  text('YOU WIN', width / 2, height / 2)
}
function loseScreen() {
  background(clouds);
  textFont(girlFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(150);
  text('YOU LOSE', width / 2, height / 2)
}

function gravity() {
  if (pY >= minHeight && jump == false) {
    //stop falling on the ground
    pY = pY;
    jumpCounter = 0; //reset jump counter when land
  }
  else{
    pY = pY + (direction * velocity); //the code that makes gravity works
  }
  if (jump == true) {
    if(pY <= maxHeight || jumpCounter >= jumpPower){
      if(pY >= minHeight) {
        pY = minHeight;
      }
      else{
      velocity = fallingSpeed; //fall at maxheight
      }
    }
    else{
      jumpSound.play();
      velocity = -jumpPower; //jumping
      jumpCounter += 1; //add to jumpcounter
    }
  }
  else{
    velocity = fallingSpeed;
    jumpSound.stop();
  }
  if (pX > maxwidth || pX < 0) {
    pX /= pX;
  }
  }

  function keyPressed(){
    if (keyIsDown(LEFT_ARROW)) {
        pX -= 5; //move left
    }
    if (keyIsDown(RIGHT_ARROW)) {
        pX += 5; //move RIGHT
  }
  //if (keyIsDown(DOWN_ARROW)) {
       //velocity = 4; 
 // }
    if (keyCode == 74) {
      jump = true;
    }
    else{
      jump = false;
    }
  }
