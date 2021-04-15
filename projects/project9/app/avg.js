var numbersAsStrings = [];
var numbersAsNumbers = [];
var content = document.querySelector(".content");
var input = document.querySelector("#numList");

function collectNums() {
  var inputString = input.value;
  var sum = 0;
  var avg = 0;

  numbersAsStrings = inputString.split(",");

  for (let i = 0; i < numbersAsStrings.length; i++) {
    numbersAsNumbers.push(parseInt(numbersAsStrings[i], 10));
    console.log(numbersAsNumbers);
  }

  for (let i = 0; i < numbersAsNumbers.length; i++) {
    sum += numbersAsNumbers[i];
  }

  avg = sum / numbersAsNumbers.length;

  content.innerHTML =
    "<p>The Average of Your Numbers: " +
    avg +
    "</p><p>The Sum of Your Numbers: " +
    sum +
    "</p>";
  input.value = "";
  sum = 0;
  avg = 0;
  numbersAsStrings = [];
  numbersAsNumbers = [];
}
