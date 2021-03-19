// Setup array of possible circle sizes
// Larger circles (Lower Index) are closer to mouseX
var sizes = [30, 27, 24, 21, 18, 15, 12, 9, 6, 3];

// Setup array of possible circle colors
// Brighter colors (Lower Index) are closer to mouseX
var colors = ["#FF0000", "#E60000", "#CD0000", "#B40000", "#9B0000", "#820000", "#690000", "#500000","#370000", "#1e0000"];

// Setup array of circle objects
// Each circle has an xPosition and a yPosition
// xPosition is constant, yPosition is dependent on mouseY
var circles = [{
    xPos: 40,
    yPos: 0,
    size: 0,
    color: ""
}, {
    xPos: 120,
    yPos: 0,
    size: 0,
    color: ""
    
},{
    xPos: 200,
    yPos: 0,
    size: 0,
    color: ""
},{
    xPos: 280,
    yPos: 0,
    size: 0,
    color: ""
},{
    xPos: 360,
    yPos: 0,
    size: 0,
    color: ""
},{
    xPos: 440,
    yPos: 0,
    size: 0,
    color: ""
},{
    xPos: 520,
    yPos: 0,
    size: 0,
    color: ""
},{
    xPos: 600,
    yPos: 0,
    size: 0,
    color: ""
},{
    xPos: 680,
    yPos: 0,
    size: 0,
    color: ""
},{
    xPos: 760,
    yPos: 0,
    size: 0,
    color: ""
}];



function setup() {
    createCanvas(800, 600);
}

function draw() {
    background("#fff");

    // Get mouse position
    let mousePosY = mouseY;
    let mousePosX = mouseX;

    // Determine how many circles left of mouse
        // numLeft is the index of the circle closest to the mouse on the left
        // numLeft defaults to -1 in case no circles are to the left
    let numLeft = -1;
        // mouseIsOn is the index of the circle the mouse is on
        // mouseIsOn defaults to -1 in case no circle is exactly on the mouse
    let mouseIsOn = -1;
    for (let i = 0; i < circles.length; i++) {
        if (circles[i].xPos < mousePosX) {
            numLeft = i;
        } else if (circles[i].xPos == mousePosX) {
            mouseIsOn = i;
        }
    }

    // Draw Circles
        // Set yPosition of all circles        
    for (let i = 0; i < circles.length; i++) {
       if (mousePosY > 50 && mousePosY < 550) { 
           circles[i].yPos = mousePosY;
       } else if (mousePosY > 550){
           circles[i].yPos = 550;
       } else if (mousePosY < 50) {
           circles[i].yPos = 50;
       }
    }

    if (mouseIsOn == -1) {
            // Draw Circles Left of Mouse
        let colorsUsed = 0;
        let sizesUsed = 0;
        for (let i = numLeft; i >= 0; i--) {
            // Set Color
            circles[i].color = colors[colorsUsed]
            fill(circles[i].color);
            colorsUsed++;

            // Set Size
            circles[i].size = sizes[sizesUsed];
            circle(circles[i].xPos, circles[i].yPos, circles[i].size);
            sizesUsed++;
        }
            // Draw Circles Right of Mouse
        colorsUsed = 0;
        sizesUsed = 0;
        for (let i = numLeft+1; i < circles.length; i++) {
            // Set Color
            circles[i].color = colors[colorsUsed]
            fill(circles[i].color);
            colorsUsed++;

            // Set Size
            circles[i].size = sizes[sizesUsed];
            circle(circles[i].xPos, circles[i].yPos, circles[i].size);
            sizesUsed++;
        }
    } else {
            // Draw Circle Mouse is On
        circles[mouseIsOn].color = colors[0];
        fill(circles[mouseIsOn].color);
        circles[mouseIsOn].size = sizes[0];
        circle(circles[mouseIsOn].xPos, circles[mouseIsOn].yPos, circles[mouseIsOn].size);
            // Draw Circles Left of Mouse
        let colorsUsed = 1;
        let sizesUsed = 1;
        for (let i = numLeft; i >= 0; i--) {
            // Set Color
            circles[i].color = colors[colorsUsed]
            fill(circles[i].color);
            colorsUsed++;

            // Set Size
            circles[i].size = sizes[sizesUsed];
            circle(circles[i].xPos, circles[i].yPos, circles[i].size);
            sizesUsed++;
        }
            // Draw Circles Right of Mouse
        colorsUsed = 1;
        sizesUsed = 1;
        for (let i = numLeft+2; i < circles.length; i++) {
            // Set Color
            circles[i].color = colors[colorsUsed]
            fill(circles[i].color);
            colorsUsed++;

            // Set Size
            circles[i].size = sizes[sizesUsed];
            circle(circles[i].xPos, circles[i].yPos, circles[i].size);
            sizesUsed++;
        }

    }

    /*// When the mouse button is pressed down
     // the circles will move down at a rate of 5 pixels per frame
     // until they are against the bottom of the canvas
     while (mouseIsPressed) {
         for (let i = 0; i < circles.length; i++) {
             if (circles[i].yPos + (.5 * circles[i].size) + 5 < 600) {
                 circles[i].yPos += 5;
             }
             fill(circles[i].color);
             circle(circles[i].xPos, circles[i].yPos, circles[i].size);
         }

         if (!mouseIsPressed) {
             break;
         }
        
     }// when released draw will reiterate, placing circles back at mouseY */



    // Clicking the mouse with the above code section uncommented causes the page to crash. Unclear why.


}
