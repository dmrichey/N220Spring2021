function setup() {
    createCanvas(800, 600);
    
}

var xSpeed = 5;
var ySpeed = 5;
var circleX = 0;
var circleY = 300;
var rectX = 0;
var rectY = 500;
var rectW = 150;
var rectH = 25;
var rectSpeed = 3;

function draw() {
    // Reset Canvas
    fill(0);
    background(255);

    rectX = mouseX;
    // Draw Shapes
    rect(rectX, rectY, rectW, rectH);
    circle(circleX, circleY, 25);
    // Check Collision with Edge of Canvas
    if (circleX >= 800 || circleX < 0) {
        xSpeed = -xSpeed;
    }
    if (circleY < 0 || collideRect(circleX, circleY, rectX, rectY, rectW, rectH)) {
        ySpeed = -ySpeed;
    }
    // Update Circle Position
    circleX += xSpeed;
    circleY += ySpeed;
  
}

function collideRect(circleX, circleY, rectX, rectY, rectW, rectH) {

    //var colliding = false;

    if(circleX > rectX && circleX < rectX + rectW) {

        if(circleY > rectY && circleY < rectY + rectH) {

              return true;

        }

   }

   return false;

}