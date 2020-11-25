//capturar elementos del html
let [ul] = document.getElementsByTagName("ul");


//eventos

//cuando puerde el foco
ul.addEventListener("mouseout", eventType);
//cuando tiene el foco
ul.addEventListener("mouseover", eventType);


//funcion
function eventType(event) {
  switch (event.type) {
    case "mouseout":
      event.target.style.color = "green";
      break;
    case "mouseover":
      event.target.style.color = "blue";
      break;

  }
}