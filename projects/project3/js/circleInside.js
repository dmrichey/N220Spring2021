function setup () {
    createCanvas(400,400);

    strokeWeight(2);
    stroke('black');
    noFill();

    let diameter = 5;
    for (let i = 0; i < 40; i++){
        circle(200,200,diameter);
        diameter += 5;
    }
}