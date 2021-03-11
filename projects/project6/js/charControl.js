var shape = {
    "xPos": 400,
    "yPos": 300
}

function update(shape) {
    if (keyCode === LEFT_ARROW) {
        shape.xPos -= 2;
    } else if (keyCode === UP_ARROW) {
        shape.yPos -= 2;
    } else if (keyCode === RIGHT_ARROW) {
        shape.xPos += 2;
    } else if (keyCode === DOWN_ARROW) {
        shape.yPos += 2;
    }

    keyCode = 0;
}

function setup() {
    createCanvas(800, 600);
    console.log(shape);
}

function draw() {
    background("#fff");

    fill("#000");

    circle(shape.xPos, shape.yPos, 15);

    update(shape);
}