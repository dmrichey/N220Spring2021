var colors = ['#008450', '#efb700', '#b81d13'];
var posYs = [450, 300, 150];

function setup() {
    createCanvas(600,600);
}

function draw() {
    fill('#1B1D1F');
    rect(200, 50, 200, 500);

    for (let i=0; i < colors.length; i++) {
        fill(colors[i]);
        circle(300, posYs[i], 50);
    }
}