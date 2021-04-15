var input = document.querySelector("#input");
var content = document.querySelector(".content");
var words = [];

function collectText() {
  var inputString = input.value;
  var numBadWords = 0;

  words = inputString.split(" ");

  //   for (let i = 0; i < words.length; i++) {
  //     if (words[i] == "clear" || words[i] == "water" || words[i] == "tires") {
  //       numBadWords++;
  //     }
  //   }

  if (numBadWords > 0) {
    content.innerHTML = "<p>FOUND " + numBadWords + " Bad Words</p>";
  } else {
    content.innerHTML = "<p>Bad Words were NOT FOUND</p>";
  }

  input.value = "";
}
