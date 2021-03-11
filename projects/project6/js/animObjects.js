var shapes = [{
    "xPos": 100,
    "yPos": 100,
    "size": 25,
    "color": "#145017"
}, {
    "xPos": 500,
    "yPos": 300,
    "size": 55,
    "color": "#097261"
}, {
    "xPos": 150,
    "yPos": 0,
    "size": 90,
    "color": "#f76a97"
}];


function setup() {
    createCanvas(800, 600);
    console.log(shapes);
}

function draw() {
    background("#fff");

    for (let i = 0; i < shapes.length; i++) {
        fill(shapes[i].color);
        circle(shapes[i].xPos, shapes[i].yPos, shapes[i].size);

        if (i % 2 == 0) {
            shapes[i].xPos++;
            shapes[i].yPos++;
        } else {
            shapes[i].xPos--;
            shapes[i].yPos--;
        }
    }


}