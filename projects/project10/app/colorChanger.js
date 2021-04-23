let divs = [];
divs.push(document.querySelector("#red"));
divs.push(document.querySelector("#green"));
divs.push(document.querySelector("#blue"));

for (let i = 0; i < divs.length; i++) {
  divs[i].style.height = "200px";
  divs[i].style.width = "200px";
  divs[i].style.float = "left";
  divs[i].style.margin = "5px";
  divs[i].style.backgroundColor = "gray";
  divs[i].addEventListener("click", onMouseClick);
}

function onMouseClick(event) {
  let newColor = event.target.getAttribute("data-color");
  event.target.style.backgroundColor = newColor;
}
