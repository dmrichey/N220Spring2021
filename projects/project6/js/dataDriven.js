var shape = {
    "width": 200,
    "height": 100,
    "color": "#23f4",
    "xPos": 250,
    "yPos": 300 
};

function setup() {

    createCanvas(800, 600);
    console.log(shape);
}


function draw() {

    fill(shape.color);

    rect(shape.xPos, shape.yPos, shape.width, shape.height);

}