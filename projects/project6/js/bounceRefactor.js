var ball = {
    xSpeed: 5,
    ySpeed: 5,
    xPos: 0,
    yPos: 300,
    size: 25,
    color: 0
}

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(255);
    
    fill(ball.color);
    
    circle(ball.xPos, ball.yPos, ball.size);
    
    if (ball.xPos >= 800 || ball.xPos < 0) {
        ball.xSpeed = -ball.xSpeed;
    }
    
    if (ball.yPos >= 600 || ball.yPos < 0) {
        ball.ySpeed = -ball.ySpeed;
    }

    ball.xPos += ball.xSpeed;
    ball.yPos += ball.ySpeed;
}