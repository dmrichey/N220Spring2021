var shape = {
    "xPos": 100,
    "yPos": 100,
    "size": 25,
}

function setup() {
    createCanvas(800,600);

    console.log(shape);

}

function draw() {
    background("fff");
    
    fill("#000");

    ellipse(shape.xPos, shape.yPos, shape.size, shape.size);

    shape.xPos++;
    shape.yPos++;
}