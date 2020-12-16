let indice; //se declara la variable como global para poder usarla en distintos metodos

let lista = document.querySelector("ul"); //guarda el elemento ul en una variable

let boton = document.getElementById("boton");

document.addEventListener("click", function (event) {

  if (event.target.nodeName === "LI") { //si pinchamos en un elemento LI

    reset(lista);

    pintar(event.target);

    //se guarda aqui el indice del elemento al que pinchamos (que sera el que tenga el target)
    //lo hacemos aqui porque en el listener "keydown" el target es el body (es quien llama al evento)
    //tambien lo hacemos aqui porque hacerlo en el listener "keydown" sería ilogico, ya que no se tendria porque poder mover nada si aun no se tiene nada seleccionado.
    indice = [...event.target.parentNode.children].indexOf(event.target);

  } else { //si pinchamos en cualquier sitio que no sea un LI

    indice = 0;

    reset(lista);

  }

  if (event.target === boton) { //si pulsamos el boton
    console.log("AAAAAAAA");
  }

});

document.addEventListener("keydown", function (event) { //ArrowUp -- ArrowDown

  //let seleccionado = lista.children[indice].textContent;

  if (event.key === "ArrowUp" && indice > 0) { //subir una posicion
    indice--;
    console.log(indice);

  } else if (event.key === "ArrowDown" && indice < lista.children.length - 1) { //bajar una posicion
    indice++;
    console.log(indice);

  } else if (event.key === "r") { //borrar elemento seleccionado de la lista
    console.log("BBBBBBBBBBB");
  }

});

function reset(lista) {

  let elementosLista = lista.querySelectorAll("LI");

  elementosLista.forEach(element => {
    element.style.backgroundColor = "white";
    element.style.color = "black";
  });

}

function pintar(element) {
  element.style.background = "blue";
  element.style.color = "white";
}









function ascensor(ev) {
  console.log(ev.keyCode);
  if (ev.keyCode == "40") {
    if (indice < 3) {
      let bajae = lista.children[indice + 1].textContent;
      let seleccionado = lista.children[indice].textContent;
      lista.children[indice].textContent = bajae;
      lista.children[indice + 1].textContent = seleccionado;
      indice = indice + 1;
      lista.children[indice].style.background = "blue";
      lista.children[indice].style.color = "white";
      lista.children[indice - 1].style = "";
    }
  } else if (ev.keyCode == "38") {
    if (indice != 0) {
      let arribae = lista.children[indice - 1].textContent;
      let seleccionado = lista.children[indice].textContent;
      lista.children[indice].textContent = arribae;
      lista.children[indice - 1].textContent = seleccionado;
      indice = indice - 1;
      lista.children[indice].style.background = "blue";
      lista.children[indice].style.color = "white";
      lista.children[indice + 1].style = "";
    }
  }
}