function setup() {
    createCanvas(750,500);

    let xPos = 10;

    for (let i = 1; i <= 25; i++) {
        let divByThree = i % 3;
        let divByFive = i % 5;

        if (divByThree == 0 && divByFive == 0) {
            fill('blue');
            square(xPos-10, 240, 20);
        }
        else if (divByThree == 0) {
            fill('purple');
            circle(xPos, 250, 10);
        }
        else if (divByFive == 0) {
            fill('green');
            square(xPos-10, 240, 20);
        }
        else {
            fill('black');
            circle(xPos, 250, 10);
        }

        xPos += 25;
    }
}