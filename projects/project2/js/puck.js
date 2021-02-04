function setup() {
    createCanvas(400,300);
}

function draw() {
    background(225);
    if (mouseX > 200) {
        fill('red');
    }
    else {
        fill('blue');
    }
    circle(mouseX, mouseY, 15);
}