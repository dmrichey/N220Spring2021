let questions = [];
questions.push(document.querySelector("#question1"));
questions.push(document.querySelector("#question2"));
questions.push(document.querySelector("#question3"));
let answer = document.querySelector("#answer");

for (let i = 0; i < questions.length; i++) {
  questions[i].addEventListener("click", onMouseClick);
}

function onMouseClick(event) {
  let value = event.target.getAttribute("data-answer");
  answer.innerHTML = value;
}
