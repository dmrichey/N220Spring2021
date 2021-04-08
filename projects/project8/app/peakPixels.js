let dvToStyle = document.querySelector("#content");
let dvHeight = 100;
let dvWidth = 100;
let dvColor = "#00FF00";

dvToStyle.style.height = dvHeight + "px";
dvToStyle.style.width = dvWidth + "px";
dvToStyle.style.backgroundColor = dvColor;

function grow() {
    dvHeight = dvHeight * 1.1;
    dvWidth = dvWidth * 1.1;

    dvToStyle.style.height = dvHeight + "px";
    dvToStyle.style.width = dvWidth + "px";
}