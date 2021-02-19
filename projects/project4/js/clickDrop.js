var brickXs = [];
var brickYs = [];

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background('#008ac5');
    fill('#8d4f3a');

    // if (mouseIsPressed) {
    //     brickXs.push(mouseX);
    //     brickYs.push(mouseY);
    // }

    for (let i = 0; i < brickXs.length; i++) {
        rect(brickXs[i], brickYs[i], 30, 15);
        if (brickYs[i] < 590){
            brickYs[i] += 5;
        }
    }

}

function mouseClicked() {
    brickXs.push(mouseX);
    brickYs.push(mouseY);
}