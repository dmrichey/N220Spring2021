var circleX1 = 15;
var circleY1 = 300;
var circleX2 = 785;
var circleY2 = 300;
var xSpeed1 = 5;
var ySpeed1 = 5;
var xSpeed2 = -5;
var ySpeed2 = -5;
var direction = 0;

function setup() {
    createCanvas(800, 600);
}

function draw() {
    // If near, circles are red and move parallel
    if (close(circleX1, circleX2, circleY1, circleY2)) {     
        fill('#b21c0e');
        circle(circleX1,circleY1,25);
        circle(circleX2,circleY2,25);
        if (direction == 0) {
            circleY1 += 5;
            circleY2 -= 5;
        } else if (direction == 1) {
            circleY1 -= 5;
            circleY2 += 5;
        } else if (direction == 2) {
            circleX1 += 5;
            circleX2 -= 5;
        } else {
            circleX1 -= 5;
            circleX2 += 5;
        }
    }
    // If far move diagonal, bouncing off walls 
    else {
        fill('#009040');
        circle(circleX1,circleY1,25);
        circle(circleX2,circleY2,25);
        if (circleX1 >= 800 || circleX1 < 0) {
            xSpeed1 = -xSpeed1;
        }
        if (circleY1 >= 600 || circleY1 < 0) {
            ySpeed1 = -ySpeed1;
        }
        if (circleX2 >= 800 || circleX2 < 0) {
            xSpeed2 = -xSpeed2;
        }
        if (circleY2 >= 600 || circleY2 < 0) {
            ySpeed2 = -ySpeed2;
        }
        circleX1 += xSpeed1;
        circleY1 += ySpeed1;
        circleX2 += xSpeed2;
        circleY2 += ySpeed2;
    }
}

// Determines if Circles are Near Each Other
function close(circleX1, circleX2, circleY1, circleY2) {
    let distanceX = Math.abs(circleX1 - circleX2);
    let distanceY = Math.abs(circleY1 - circleY2);
    let distance;

    if (distanceX > distanceY) {
        distance = distanceX;
    } else {
        distance = distanceY;
    }

    if (distance < 250) {
        return true;
    } else {
        return false;
    }
}

// Clicking Modifies Direction Moved When Near
function mouseClicked() {
    if (direction < 3) {
        direction++;
    } else {
        direction = 0;
    }
}