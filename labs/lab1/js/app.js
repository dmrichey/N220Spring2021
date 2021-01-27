function setup() {
    createCanvas(800, 600);

    background(235,210,135);
    strokeWeight(10);
    var x = 0;
    while (x <= 800) {
        line(x, 0, 400, 600);
        line(x, 600, 400, 0);
        x = x + 50;
    }

    var y = 0;
    while (y <= 600) {
        line(0, y, 800, 300);
        line(800, y, 0, 300);
        y = y + 50;
    }
    
    strokeWeight(5);
    fill(35,35,35);
    rect(175,75, 450,450);
    fill(145,15,15)
    ellipse(400,300,500,500);

    strokeWeight(5);
    noFill();
    line(300,200, 525,200);
    line(500,200, 500,425);
    line(500,400, 275,400);
    line(300,400, 300,175);
    line(225,275, 400,100);
    line(425,125, 600,300);
    line(575,325, 400,500);
    line(375,475, 200,300);
    arc(413,175,225,45,0,PI);
    arc(525,313,45,225,PI/2,3*PI/2);
    arc(387,425,225,45,PI,0);
    arc(275,287,45,225,3*PI/2,PI/2)

    fill(0,0,0);
    circle(400,275,5);
    circle(400,325,5);
    circle(375,300,5);
    circle(425,300,5);
    

}
