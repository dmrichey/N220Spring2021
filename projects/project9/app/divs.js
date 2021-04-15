let objects = [
  { color: "#FF0000", height: 100, width: 300 },
  { color: "#FFFF00", height: 200, width: 200 },
  { color: "#ff0000", height: 300, width: 100 },
];

for (let i = 0; i < objects.length; i++) {
  let div = document.createElement("div");
  div.style.height = objects[i].height + "px";
  div.style.width = objects[i].width + "px";
  div.style.backgroundColor = objects[i].color;
  console.log(objects[i].color);

  document.body.appendChild(div);
}
