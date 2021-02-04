function setup() {
    createCanvas (800, 600);
}

var upperLimit = 200;
var diameter = 1;

function draw() {
    fill(0);
    background(255);
    circle(400, 300, diameter);
    if (diameter < upperLimit) {
        diameter++;
    }
    else {
        diameter = 1;
    }
}