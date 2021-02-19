var posXs = [];
var posYs = [];

function setup() {
    createCanvas(800,600);
    frameRate(30);
}

function draw() {
    background('#ff1632')
    fill('#5c9a63')

    if (posXs.length < 11) {
        posXs.push(mouseX);
        posYs.push(mouseY);
    } else {
        posXs.shift();
        posXs.push(mouseX);
        posYs.shift();
        posYs.push(mouseY);
    }

    for (let i=0; i < posXs.length; i++) {
        circle(posXs[i],posYs[i],15);
    }
}