//DECLARACION DE VARIABLES
let divRaton = document.getElementById("raton");
let divTeclado = document.getElementById("teclado");


//punto 1
document.addEventListener("mousemove", eventType);

//punto 2
document.addEventListener("keypress", eventType);

//punto 3
divRaton.addEventListener("click", eventType);
divRaton.addEventListener("contextmenu", eventType);

divTeclado.addEventListener("click", eventType);
divTeclado.addEventListener("contextmenu", eventType);

//cuando se pulse la tecla s
body.addEventListener("keydown", eventType);



function eventType(event) {

  switch (event.type) {
    case "mousemove":
      divRaton.innerText = `${event.x},${event.y}`;
      break;

    case "keypress":
      let numCaracter = event.charCode;
      let caracter = String.fromCharCode(numCaracter);

      divTeclado.innerText = `${caracter}`;
      break;

    case "click":
      event.target.style.background = "yellow";
      break;

    case "contextmenu":
      event.target.style.background = "blue";
      break;
  }
}