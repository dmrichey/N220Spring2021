// CONSTANT VARIABLES
// Colors
let colorUnknown = "#006994";
let colorHit = "#842222";
let colorMiss = "#eeeeee";
let shipColor = "#848482";
let validShipPlacementColor = "#228422";

// CLASS DECLARATIONS
class row {
  constructor() {
    this.div = document.createElement("div");
    this.cells = [];
  }
}

class cell {
  constructor(i, j) {
    this.row = i;
    this.column = j;
    this.div = document.createElement("div");
    this.div.setAttribute("row", i);
    this.div.setAttribute("column", j);
    this.containsShip = false;
    this.shipType = "";
    this.targeted = false;
  }
}

class ship {
  constructor(type, size, index) {
    this.shipType = type;
    this.shipSize = size;
    this.cells = [];
    this.placed = false;
    this.numHits = 0;
    this.sunk = false;
    this.index = index;
    this.div = document.createElement("div");
    this.div.setAttribute("index", index);
  }
}

class shipCells {
  constructor() {
    this.div = document.createElement("div");
  }
}

// GLOBAL VARIABLES
// Containers
let computerGrid = [];
let playerGrid = [];
let computerShips = [];
let playerShips = [];
// Function Toggle
let gameState = "";
// For Use In Placing Ships
let shipHeld = false;
let heldShipSize = 0;
let heldShipDirection = "horizontal";
let heldShipType = "";
let heldShipIndex = -1;
// For Use In Computer Targeting Algorithm (returnFire())
let computerLastHit = null;
let computerSecondLastHit = null;

// DOCUMENT VARIABLES
let computerGridArea = document.querySelector("#computer-grid");
let playerGridArea = document.querySelector("#player-grid");
let computerShipArea = document.querySelector("#computer-ships");
let playerShipArea = document.querySelector("#player-ships");
let buttonArea = document.querySelector(".buttons");
let button = document.querySelector("#state-control");
let rulesText = document.querySelector("#text");
// Event Listener to Adjust Ship Direction - PLACEMENT
playerGridArea.addEventListener("wheel", changeShipDirection);

// Generate Grids
for (let i = 0; i < 10; i++) {
  computerGrid.push(new row());
  playerGrid.push(new row());
  for (let j = 0; j < 10; j++) {
    computerGrid[i].cells.push(new cell(i, j));
    playerGrid[i].cells.push(new cell(i, j));
  }
}

// Style and Add Grids to Page
for (let i = 0; i < 10; i++) {
  computerGrid[i].div.style.width = "300px";
  computerGrid[i].div.style.height = "30px";
  computerGrid[i].div.style.display = "flex";
  computerGrid[i].div.style.alignItems = "center";
  computerGrid[i].div.style.justifyContent = "space-evenly";

  playerGrid[i].div.style.width = "300px";
  playerGrid[i].div.style.height = "30px";
  playerGrid[i].div.style.display = "flex";
  playerGrid[i].div.style.alignItems = "center";
  playerGrid[i].div.style.justifyContent = "space-evenly";

  for (let j = 0; j < 10; j++) {
    computerGrid[i].cells[j].div.style.width = "25px";
    computerGrid[i].cells[j].div.style.height = "25px";
    computerGrid[i].cells[j].div.style.margin = "2.5px";
    computerGrid[i].cells[j].div.style.backgroundColor = colorUnknown;
    computerGrid[i].div.appendChild(computerGrid[i].cells[j].div);
    // Event Listener For Player Targeting - IN_PLAY
    computerGrid[i].cells[j].div.addEventListener("click", fireOnTarget);

    playerGrid[i].cells[j].div.style.width = "25px";
    playerGrid[i].cells[j].div.style.height = "25px";
    playerGrid[i].cells[j].div.style.margin = "2.5px";
    playerGrid[i].cells[j].div.style.backgroundColor = colorUnknown;
    playerGrid[i].div.appendChild(playerGrid[i].cells[j].div);
    // Event Listener For Displaying Ship Placement - PLACEMENT
    playerGrid[i].cells[j].div.addEventListener(
      "mouseover",
      previewShipPlacement
    );
    // Event Listener To Reset Preview Display - PLACEMENT
    // Corrollary to Above Listener
    playerGrid[i].cells[j].div.addEventListener("mouseout", endPreview);
    // Event Listener To Add Player Ship To Grid - PLACEMENT
    playerGrid[i].cells[j].div.addEventListener("click", placeShip);
  }
  computerGridArea.appendChild(computerGrid[i].div);
  playerGridArea.appendChild(playerGrid[i].div);
}

// Generate Ship List
computerShips.push(new ship("Carrier", 5, 0));
computerShips.push(new ship("Battleship", 4, 1));
computerShips.push(new ship("Destroyer", 3, 2));
computerShips.push(new ship("Submarine", 3, 3));
computerShips.push(new ship("Patrol Boat", 2, 4));
for (let i = 0; i < computerShips.length; i++) {
  for (let j = 0; j < computerShips[i].shipSize; j++) {
    computerShips[i].cells.push(new shipCells());
  }
}

playerShips.push(new ship("Carrier", 5, 0));
playerShips.push(new ship("Battleship", 4, 1));
playerShips.push(new ship("Destroyer", 3, 2));
playerShips.push(new ship("Submarine", 3, 3));
playerShips.push(new ship("Patrol Boat", 2, 4));
for (let i = 0; i < playerShips.length; i++) {
  for (let j = 0; j < playerShips[i].shipSize; j++) {
    playerShips[i].cells.push(new shipCells());
  }
}

// Style and Add Ship Lists to Page
for (let i = 0; i < computerShips.length; i++) {
  computerShips[i].div.style.width = "100px";
  computerShips[i].div.style.height = "20px";
  computerShips[i].div.style.display = "flex";
  computerShips[i].div.style.alignItems = "center";
  computerShips[i].div.style.justifyContent = "left";

  playerShips[i].div.style.width = "100px";
  playerShips[i].div.style.height = "20px";
  playerShips[i].div.style.display = "flex";
  playerShips[i].div.style.alignItems = "center";
  playerShips[i].div.style.justifyContent = "left";

  for (let j = 0; j < computerShips[i].shipSize; j++) {
    computerShips[i].cells[j].div.style.width = "15px";
    computerShips[i].cells[j].div.style.height = "15px";
    computerShips[i].cells[j].div.style.margin = "1.5px";
    computerShips[i].cells[j].div.style.backgroundColor = shipColor;
    computerShips[i].div.appendChild(computerShips[i].cells[j].div);

    playerShips[i].cells[j].div.style.width = "15px";
    playerShips[i].cells[j].div.style.height = "15px";
    playerShips[i].cells[j].div.style.margin = "1.5px";
    playerShips[i].cells[j].div.style.backgroundColor = shipColor;
    playerShips[i].div.appendChild(playerShips[i].cells[j].div);
  }
  computerShipArea.appendChild(computerShips[i].div);
  playerShipArea.appendChild(playerShips[i].div);
  // Event Listener To Choose Ship To Place - PLACEMENT
  playerShips[i].div.addEventListener("click", selectShip);
}

// changeState()
// Trigger by Clicking Central Button
// Enables/Disables Other Event Triggers
function changeState() {
  if (gameState == "") {
    // SWITCH TO PLACEMENT
    gameState = "placement";
    button.innerHTML = "Confirm Ship Placement?";
    rulesText.innerHTML =
      "<p>Click on the grey Ships to the right of the Lower Play Area.</p> <p>Then hover over the Lower Play Area.</p> <p>Click when the cells are green to place your Ship.</p> <p>The scroll wheel will allow you to change the direction of your Ship.</p> <p>Click the button when all five Ships have been placed.</p>";
    placeComputerShips();
  } else if (gameState == "placement") {
    // SWITCH TO INPLAY
    let allShipsPlaced = true;
    for (let i = 0; i < playerShips.length; i++) {
      if (playerShips[i].placed == false) {
        allShipsPlaced = false;
      }
    }

    if (allShipsPlaced) {
      // VERIFY ALL SHIPS PLACE BEFORE SWITCH
      gameState = "inPlay";
      button.innerHTML = "";
      rulesText.innerHTML =
        "<p>Click on cells in the Upper Play Area to attack your Enemy.</p> <p>Cells will turn red when you Hit an Enemy Ship.</p> <p>Cells will turn white if you Miss.</p> <p>Try To Sink All Enemy Ships!</p>";
    } else {
      rulesText.innerHTML =
        "<p>You must place ALL ships before continuing.</p>";
    }
  }
} // changeState()

// selectShip()
// Trigger by Clicking Player Ships
// When placing ships, the player clicks on their ships
// to select the next ship to place
function selectShip() {
  let currentShip = playerShips[this.getAttribute("index")];

  if (gameState == "placement") {
    if (!currentShip.placed) {
      // place each ship only once
      shipHeld = true;
      heldShipSize = currentShip.shipSize;
      heldShipType = currentShip.shipType;
      heldShipIndex = currentShip.index;
    }
  }
} // selectShip()

// changeShipDirection()
// Trigger by Scrolling Mouse Wheel over Player Grid Area
// Changes the Orientation of the ship to be placed
// from horizontal to vertical and vice versa
function changeShipDirection() {
  if (gameState == "placement" && shipHeld == true) {
    if (heldShipDirection == "horizontal") {
      heldShipDirection = "vertical";
    } else {
      heldShipDirection = "horizontal";
    }
  }
} // changeShipDirection()

// previewShipPlacement()
// Trigger on Mouse Over Player Grid Cells
// Shows the position of ship to be placed
// Preview shown in green if valid,
// red if invalid
function previewShipPlacement() {
  let validShipPlacement = true;
  let currentCell =
    playerGrid[this.getAttribute("row")].cells[this.getAttribute("column")];
  if (gameState == "placement" && shipHeld == true) {
    if (heldShipDirection == "horizontal") {
      for (let i = 0; i < heldShipSize; i++) {
        if (currentCell.column + i > 9) {
          // Verify That Ship Is In Bounds
          validShipPlacement = false;
        } else if (
          playerGrid[currentCell.row].cells[currentCell.column + i].containsShip
        ) {
          // Prevent Ship Overlap
          validShipPlacement = false;
        }
      }
      for (let i = 0; i < heldShipSize && currentCell.column + i < 10; i++) {
        if (validShipPlacement) {
          // Display Green If Valid
          playerGrid[currentCell.row].cells[
            currentCell.column + i
          ].div.style.backgroundColor = validShipPlacementColor;
        } else {
          // Display Red If Invalid
          playerGrid[currentCell.row].cells[
            currentCell.column + i
          ].div.style.backgroundColor = colorHit;
        }
      }
    } else {
      for (let i = 0; i < heldShipSize; i++) {
        if (currentCell.row + i > 9) {
          // Verify Ship In Bounds
          validShipPlacement = false;
        } else if (
          playerGrid[currentCell.row + i].cells[currentCell.column].containsShip
        ) {
          // Prevent Ship Overlap
          validShipPlacement = false;
        }
      }
      for (let i = 0; i < heldShipSize && currentCell.row + i < 10; i++) {
        if (validShipPlacement) {
          // Display Green If Valid
          playerGrid[currentCell.row + i].cells[
            currentCell.column
          ].div.style.backgroundColor = validShipPlacementColor;
        } else {
          // Display Red If Invalid
          playerGrid[currentCell.row + i].cells[
            currentCell.column
          ].div.style.backgroundColor = colorHit;
        }
      }
    }
  }
} // previewShipPlacement()

// endPreview()
// Trigger when Mouse Moves Off of Player Grid Cell
// Resets Unoccupied Cells to Blue, and Occupied Cells to Grey
function endPreview() {
  if (gameState == "placement") {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (!playerGrid[i].cells[j].containsShip) {
          // Blue Cell If Empty
          playerGrid[i].cells[j].div.style.backgroundColor = colorUnknown;
        } else {
          // Grey Cell If Ship Present
          playerGrid[i].cells[j].div.style.backgroundColor = shipColor;
        }
      }
    }
  }
} // endPreview()

// placeShip()
// Trigger by Clicking Cell in Player Grid
// If Position is Valid, Places Currently Held Ship
function placeShip() {
  let validShipPlacement = true;
  let currentCell =
    playerGrid[this.getAttribute("row")].cells[this.getAttribute("column")];
  if (gameState == "placement" && shipHeld == true) {
    if (heldShipDirection == "horizontal") {
      for (let i = 0; i < heldShipSize; i++) {
        if (
          playerGrid[currentCell.row].cells[currentCell.column + i].containsShip
        ) {
          // Prevent Ship Overlap
          validShipPlacement = false;
        } else if (currentCell.column + i > 9) {
          // Verify Ship In Bounds
          validShipPlacement = false;
        }
      }
      if (validShipPlacement) {
        for (let i = 0; i < heldShipSize; i++) {
          // Add Ship Data To Grid Cell
          playerGrid[currentCell.row].cells[
            currentCell.column + i
          ].containsShip = true;
          playerGrid[currentCell.row].cells[
            currentCell.column + i
          ].shipType = heldShipType;
          playerGrid[currentCell.row].cells[
            currentCell.column + i
          ].div.style.backgroundColor = shipColor;
        }
        playerShips[heldShipIndex].placed = true;
      }
    } else {
      for (let i = 0; i < heldShipSize; i++) {
        if (
          playerGrid[currentCell.row + i].cells[currentCell.column].containsShip
        ) {
          // Prevent Ship Overlap
          validShipPlacement = false;
        } else if (currentCell.row + i > 9) {
          // Verify Ship In Bounds
          validShipPlacement = false;
        }
      }
      if (validShipPlacement) {
        for (let i = 0; i < heldShipSize; i++) {
          // Add Ship Data To Grid Cell
          playerGrid[currentCell.row + i].cells[
            currentCell.column
          ].containsShip = true;
          playerGrid[currentCell.row + i].cells[
            currentCell.column
          ].shipType = heldShipType;
          playerGrid[currentCell.row + i].cells[
            currentCell.column
          ].div.style.backgroundColor = shipColor;
        }
        playerShips[heldShipIndex].placed = true;
      }
    }
    // Reset Placement Variables For Next Ship
    shipHeld = false;
    heldShipSize = 0;
    heldShipDirection = "horizontal";
    heldShipType = "";
    heldShipIndex = -1;
  }
} // placeShip()

// placeComputerShips()
// Triggered when Player Clicks "Begin Play?" button
// Places all Computer Ships in Computer Grid
function placeComputerShips() {
  let issuePlacing = false;
  // Attempts To Place All Ships
  for (let i = 0; i < computerShips.length; i++) {
    let rowIndex;
    let columnIndex;
    // Randomly Determine Ship Direction
    let shipDirection = Math.floor(Math.random() * 2);
    // Randomly Determine Origin Point Within Valid Bounds
    if (shipDirection == 0) {
      heldShipDirection = "horizontal";
      columnIndex = Math.floor(Math.random() * (9 - computerShips[i].shipSize));
      rowIndex = Math.floor(Math.random() * 9);
    } else {
      heldShipDirection = "vertical";
      rowIndex = Math.floor(Math.random() * (9 - computerShips[i].shipSize));
      columnIndex = Math.floor(Math.random() * 9);
    }

    if (!computerShips[i].placed) {
      // Verify That Ship Has Not Been Placed
      let validShipPlacement = true;

      if (heldShipDirection == "horizontal") {
        for (let j = 0; j < computerShips[i].shipSize; j++) {
          if (computerGrid[rowIndex].cells[columnIndex + j].containsShip) {
            // Prevent Ship Overlap
            validShipPlacement = false;
          }
        }
        if (validShipPlacement) {
          // Add Ship Data To Computer Grid Cells
          for (let j = 0; j < computerShips[i].shipSize; j++) {
            computerGrid[rowIndex].cells[columnIndex + j].containsShip = true;
            computerGrid[rowIndex].cells[columnIndex + j].shipType =
              computerShips[i].shipType;
          }
          computerShips[i].placed = true;
        } else {
          // If Issue Placing (Overlap), Flag For Recursion
          issuePlacing = true;
        }
      } else {
        for (let j = 0; j < computerShips[i].shipSize; j++) {
          if (computerGrid[rowIndex + j].cells[columnIndex].containsShip) {
            // Prevent Ship Overlap
            validShipPlacement = false;
          }
        }
        if (validShipPlacement) {
          // Add Ship Data To Computer Grid Cells
          for (let j = 0; j < computerShips[i].shipSize; j++) {
            computerGrid[rowIndex + j].cells[columnIndex].containsShip = true;
            computerGrid[rowIndex + j].cells[columnIndex].shipType =
              computerShips[i].shipType;
          }
          computerShips[i].placed = true;
        } else {
          // If Issue Placing (Overlap), Flag For Recursion
          issuePlacing = true;
        }
      }
    }

    if (issuePlacing) {
      // Recursion To Ensure All Computer Ships Placed
      placeComputerShips();
    }
  }
} // placeComputerShips()

// fireOnTarget()
// Triggered when Player Clicks on Computer Grid Cell
// Turns Cell Red if it Contains a Ship
// Turns Cell White if it Does Not Contain a Ship
function fireOnTarget() {
  if ((gameState = "inPlay")) {
    // Determine Location Targeted
    let rowIndex = this.getAttribute("row");
    let columnIndex = this.getAttribute("column");

    if (!computerGrid[rowIndex].cells[columnIndex].targeted) {
      // Check That The Cell Has Not Already Been Targeted
      if (computerGrid[rowIndex].cells[columnIndex].containsShip) {
        // Check If Hit
        computerGrid[rowIndex].cells[
          columnIndex
        ].div.style.backgroundColor = colorHit;
        // Determine Ship Type
        let shipType = computerGrid[rowIndex].cells[columnIndex].shipType;
        let shipIndex = -1;
        if (shipType == "Carrier") {
          shipIndex = 0;
        } else if (shipType == "Battleship") {
          shipIndex = 1;
        } else if (shipType == "Destroyer") {
          shipIndex = 2;
        } else if (shipType == "Submarine") {
          shipIndex = 3;
        } else if (shipType == "Patrol Boat") {
          shipIndex = 4;
        }
        // Check If Hit Causes Ship To Sink
        computerShips[shipIndex].numHits++;
        if (
          computerShips[shipIndex].numHits == computerShips[shipIndex].shipSize
        ) {
          computerShips[shipIndex].sunk = true;
          for (let i = 0; i < computerShips[shipIndex].shipSize; i++) {
            computerShips[shipIndex].cells[
              i
            ].div.style.backgroundColor = colorHit;
          }
          // Check If All Ships Have Been Sunk
          let allShipsSunk = true;
          for (let i = 0; i < computerShips.length; i++) {
            if (computerShips[i].sunk == false) {
              allShipsSunk = false;
            }
          }

          if (allShipsSunk) {
            rulesText.innerHTML =
              "<p>You Have Sunk All Enemy Ships.</p><p>YOU WIN!</p>";
            gameState = "end";
            button.innerHTML = "Play Again?";
          }
        }
      } else {
        // Shot Missed
        computerGrid[rowIndex].cells[
          columnIndex
        ].div.style.backgroundColor = colorMiss;
      }
      // Set Targeted to True
      computerGrid[rowIndex].cells[columnIndex].targeted = true;
      // Execute Computer Turn
      returnFire();
    }
  }
} // fireOnTarget()

// returnFire()
// The Computer's Turn
function returnFire() {
  let rowIndex;
  let columnIndex;
  // Determine Target
  if (computerLastHit == null) {
    // No Hits or All Known Ships Sunk
    rowIndex = Math.floor(Math.random() * 10);
    columnIndex = Math.floor(Math.random() * 10);
  } else if (computerSecondLastHit == null) {
    // One Hit on Ship
    let lastRow = computerLastHit.row;
    let lastColumn = computerLastHit.column;
    // Target Positions Around Hit Point
    // Each If Statement Verifies That The Next Point
    // has not been targeted and is in bounds
    if (
      lastRow - 1 >= 0 &&
      !playerGrid[lastRow - 1].cells[lastColumn].targeted
    ) {
      rowIndex = lastRow - 1;
      columnIndex = lastColumn;
    } else if (
      lastColumn + 1 < 10 &&
      !playerGrid[lastRow].cells[lastColumn + 1].targeted
    ) {
      rowIndex = lastRow;
      columnIndex = lastColumn + 1;
    } else if (
      lastRow + 1 < 10 &&
      !playerGrid[lastRow + 1].cells[lastColumn].targeted
    ) {
      rowIndex = lastRow + 1;
      columnIndex = lastColumn;
    } else if (
      lastColumn - 1 >= 0 &&
      !playerGrid[lastRow].cells[lastColumn - 1].targeted
    ) {
      rowIndex = lastRow;
      columnIndex = lastColumn - 1;
    } else {
      // This Case Should Never Happen
      rowIndex = Math.floor(Math.random() * 10);
      columnIndex = Math.floor(Math.random() * 10);
    }
  } else {
    // Two Hits on Ship
    if (computerLastHit.column == computerSecondLastHit.column) {
      // If the Two Hits Indicate Ship Is Vertical
      if (
        computerLastHit.row + 1 < 10 &&
        !playerGrid[computerLastHit.row + 1].cells[computerLastHit.column]
          .targeted
      ) {
        rowIndex = computerLastHit.row + 1;
        columnIndex = computerLastHit.column;
      } else if (
        computerLastHit.row - 1 >= 0 &&
        !playerGrid[computerLastHit.row - 1].cells[computerLastHit.column]
          .targeted
      ) {
        rowIndex = computerLastHit.row - 1;
        columnIndex = computerLastHit.column;
      } else if (
        computerLastHit.row + 2 < 10 &&
        !playerGrid[computerLastHit.row + 2].cells[computerLastHit.column]
          .targeted
      ) {
        rowIndex = computerLastHit.row + 2;
        columnIndex = computerLastHit.column;
      } else if (
        computerLastHit.row - 2 >= 0 &&
        !playerGrid[computerLastHit.row - 2].cells[computerLastHit.column]
          .targeted
      ) {
        rowIndex = computerLastHit.row - 2;
        columnIndex = computerLastHit.column;
      }
    } else if (computerLastHit.row == computerSecondLastHit.row) {
      // If the Two Hits Indicate Ship Is Horizontal
      if (
        computerLastHit.column + 1 < 10 &&
        !playerGrid[computerLastHit.row].cells[computerLastHit.column + 1]
          .targeted
      ) {
        rowIndex = computerLastHit.row;
        columnIndex = computerLastHit.column + 1;
      } else if (
        computerLastHit.column - 1 >= 0 &&
        !playerGrid[computerLastHit.row].cells[computerLastHit.column - 1]
          .targeted
      ) {
        rowIndex = computerLastHit.row;
        columnIndex = computerLastHit.column - 1;
      } else if (
        computerLastHit.column + 2 < 10 &&
        !playerGrid[computerLastHit.row].cells[computerLastHit.column + 2]
          .targeted
      ) {
        rowIndex = computerLastHit.row;
        columnIndex = computerLastHit.column + 2;
      } else if (
        computerLastHit.column - 2 >= 0 &&
        !playerGrid[computerLastHit.row].cells[computerLastHit.column - 2]
          .targeted
      ) {
        rowIndex = computerLastHit.row;
        columnIndex = computerLastHit.column - 2;
      }
    } else {
      // This Case Should Never Happen
      rowIndex = Math.floor(Math.random() * 10);
      columnIndex = Math.floor(Math.random() * 10);
    }
  }

  if (!playerGrid[rowIndex].cells[columnIndex].targeted) {
    if (playerGrid[rowIndex].cells[columnIndex].containsShip) {
      // Check If Hit
      playerGrid[rowIndex].cells[
        columnIndex
      ].div.style.backgroundColor = colorHit;
      // Get Ship Type
      let shipType = playerGrid[rowIndex].cells[columnIndex].shipType;
      let shipIndex = -1;
      if (shipType == "Carrier") {
        shipIndex = 0;
      } else if (shipType == "Battleship") {
        shipIndex = 1;
      } else if (shipType == "Destroyer") {
        shipIndex = 2;
      } else if (shipType == "Submarine") {
        shipIndex = 3;
      } else if (shipType == "Patrol Boat") {
        shipIndex = 4;
      }
      // Check If Ship Sunk
      playerShips[shipIndex].numHits++;
      if (playerShips[shipIndex].numHits == playerShips[shipIndex].shipSize) {
        playerShips[shipIndex].sunk = true;
        for (let i = 0; i < playerShips[shipIndex].shipSize; i++) {
          playerShips[shipIndex].cells[i].div.style.backgroundColor = colorHit;
        }
        let allShipsSunk = true;
        for (let i = 0; i < playerShips.length; i++) {
          if (playerShips[i].sunk == false) {
            allShipsSunk = false;
          }
        }
        // Check If All Player Ships Have Sunk
        if (allShipsSunk) {
          rulesText.innerHTML =
            "<p>The Enemy Has Sunk All of Your Ships.</p><p>GAME OVER</p>";
          gameState = "end";
          button.innerHTML = "Play Again?";
        }
        // Reset Hits on Ship Sinking
        computerLastHit = null;
        computerSecondLastHit = null;
      } else {
        // Ship Does Not Sink, Update Last Hits
        computerSecondLastHit = computerLastHit;
        computerLastHit = playerGrid[rowIndex].cells[columnIndex];
      }
    } else {
      // If Shot Misses
      playerGrid[rowIndex].cells[
        columnIndex
      ].div.style.backgroundColor = colorMiss;
    }
    playerGrid[rowIndex].cells[columnIndex].targeted = true;
  }
} // returnFire()
