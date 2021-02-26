var circleX = 400;
var circleY = 300;
var circleSpeed = 3; 

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background('#ffffff');

    fill(mouseDistance(circleX, circleY));
    
    circle(circleX, circleY, 25);

    let direction = mouseDirection(circleX, circleY);

    if (direction == 0) {
        circleY += circleSpeed;
    } else if (direction == 1) {
        circleX -= circleSpeed;
    } else if (direction == 2) {
        circleY -= circleSpeed;
    } else {
        circleX += circleSpeed;
    }
}

function mouseDistance(circleX, circleY) {
    let distanceX = Math.abs(mouseX - circleX);
    let distanceY = Math.abs(mouseY - circleY);

    let distance = 0;
    if (distanceX > distanceY) {
        distance = distanceX;
    } else {
        distance = distanceY;
    }

    if (distance > 7) {
        return '#ff0000'
    } else {
        return '#000000'
    }
}

function mouseDirection(circleX, circleY) {
    let distanceX = mouseX - circleX;
    let distanceY = mouseY - circleY;

    if (Math.abs(distanceX) > Math.abs(distanceY)) {
        if (distanceX > 0) {
            return 3;
        } else {
            return 1;
        }
    } else {
        if (distanceY > 0) {
            return 0;
        } else {
            return 2;
        }
    }
}