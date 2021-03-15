var ball = {
    size: 25,
    startX: 400,
    startY: 300,
    currentX: 400,
    currentY: 300,
    startVelocityX: -5,
    velocityX: -5,
    velocityY: 5
};

var paddle = {
    currentX: 700,
    currentY: 300,
    paddleW: 25,
    paddleH: 150
};

function setup() {
    createCanvas(800, 600);
    
}

function draw() {
    // Reset Canvas
    fill(255);
    background(0);

    // Draw Shapes
    rect(paddle.currentX, paddle.currentY, paddle.paddleW, paddle.paddleH);
    circle(ball.currentX, ball.currentY, ball.size);
    
    // Check Collision with Edge of Canvas
    if (ball.currentX < 0 || collision(ball,paddle)) {
        ball.velocityX = -ball.velocityX;
    }
    if (ball.currentY < 0 || ball.currentY > 600) {
        ball.velocityY = -ball.velocityY;
    }
    
    // Update Circle Position
    if (ball.currentX > 800) {
        ball.currentX = ball.startX;
        ball.currentY = ball.startY;
        ball.velocityX = ball.startVelocityX;
    } else {
        ball.currentX += ball.velocityX;
        ball.currentY += ball.velocityY;
        paddle.currentY = mouseY;
    }
  
}

function collision(ball, paddle) {

    if(ball.currentX > paddle.currentX && ball.currentX < paddle.currentX + paddle.paddleW) {

        if(ball.currentY > paddle.currentY && ball.currentY < paddle.currentY + paddle.paddleH) {

              return true;

        }

   }

   return false;

}