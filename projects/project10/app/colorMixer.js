let colorPool = document.querySelector("#colorPool");
let currentColor = document.querySelector("#currentColor");
let buttons = [];
buttons.push(document.querySelector("#red1"));
buttons.push(document.querySelector("#red5"));
buttons.push(document.querySelector("#red10"));
buttons.push(document.querySelector("#green1"));
buttons.push(document.querySelector("#green5"));
buttons.push(document.querySelector("#green10"));
buttons.push(document.querySelector("#blue1"));
buttons.push(document.querySelector("#blue5"));
buttons.push(document.querySelector("#blue10"));

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onMouseClick);
}

let redValue = 0;
let greenValue = 0;
let blueValue = 0;

colorPool.style.backgroundColor =
  "rgb(" + redValue + "," + greenValue + "," + blueValue + ")";
currentColor.innerHTML =
  "current color: rgb(" + redValue + "," + greenValue + "," + blueValue + ")";

function onMouseClick(event) {
  let color = event.target.getAttribute("data-color");
  let valueStr = event.target.getAttribute("data-value");
  let value = Number(valueStr);

  if (color == "red") {
    redValue += value;
  } else if (color == "green") {
    greenValue += value;
  } else if (color == "blue") {
    blueValue += value;
  }

  colorPool.style.backgroundColor =
    "rgb(" + redValue + "," + greenValue + "," + blueValue + ")";
  currentColor.innerHTML =
    "current color: rgb(" + redValue + "," + greenValue + "," + blueValue + ")";
}
