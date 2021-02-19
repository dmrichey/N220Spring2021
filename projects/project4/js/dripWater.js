var circlePositions = [0];

function setup() {
    createCanvas(800,600);
}

function draw() {
    fill('#000000');
    background('#ffffff');
    let remainder = frameCount % 10;
    console.log(remainder);
    if (remainder == 0) {
        circlePositions.push(-5);
        console.log(circlePositions.length)
    }
    for (let i = 0; i < circlePositions.length; i++) {
        circlePositions[i] += 5;
        circle(400, circlePositions[i], 25);
    }    
}