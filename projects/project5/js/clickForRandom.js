var colors = ['#6B2D5c', '#f0386b', '#f8C0c8', '#e2c290'];

function setup() {
    createCanvas(600, 800);
}

function draw() {
    circle(300, 400, 150);
}

function mouseClicked() {
    let num = Math.random() * 4;
    if (num < 1) {
        fill(colors[0]);
    } else if (num < 2) {
        fill(colors[1]);
    } else if (num < 3) {
        fill(colors[2]);
    } else {
        fill(colors[3]);
    }
    
}