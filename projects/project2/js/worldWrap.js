function setup() {
    createCanvas(800, 600);
}

var diameter = 50;
var xPos = -diameter;

function draw() {
    fill(0);
    background(255);
    circle(xPos, 300, diameter);
    if (xPos-diameter < 800) {
        xPos += 5;
    }
    else {
        xPos = -diameter;
    }
}