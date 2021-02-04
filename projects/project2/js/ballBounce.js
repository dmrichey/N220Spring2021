function setup() {
    createCanvas(800, 600);
}

var xSpeed = 5;
var ySpeed = 5;
var xPos = 0;
var yPos = 300;

function draw() {
    fill(0);
    background(255);
    circle(xPos, yPos, 25);
    if (xPos >= 800 || xPos < 0) {
        xSpeed = -xSpeed;
    }
    if (yPos >= 600 || yPos < 0) {
        ySpeed = -ySpeed;
    }
    xPos += xSpeed;
    yPos += ySpeed;
}