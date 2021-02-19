var colors = ['#fffcf8', '#ffc0cb', '#7e3f12'];
var yPos = 0;

function setup() {
    createCanvas(800, 600);
}

function draw() {
    for (let i = 0; i < colors.length; i++) {
        fill(colors[i]);
        rect(0,yPos,800,200);
        yPos += 200;        
    }   
}