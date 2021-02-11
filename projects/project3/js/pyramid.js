function setup() {
    createCanvas(400,400);

    noStroke();
    fill('red');

    xStart = 10;
    xPos = xStart;
    yPos = 10;

    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= i; j++) {
            square(xPos, yPos, 20);
            xPos += 25;
        }
        xPos = xStart;
        yPos += 25;
    }
}