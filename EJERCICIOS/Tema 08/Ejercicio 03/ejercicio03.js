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
    indice = undefined;
    reset(lista);
  }

  if (event.target === boton) { //si pulsamos el boton
    agregarElemento(lista);
  }
});

document.addEventListener("keydown", function (event) { //ArrowUp -- ArrowDown

  if (event.key === "ArrowUp" && indice > 0) { //subir una posicion
    let arriba = lista.children[indice - 1].textContent;
    let seleccionado = lista.children[indice].textContent;
    lista.children[indice].textContent = arriba;
    lista.children[indice - 1].textContent = seleccionado;
    indice--;
    reset(lista);
    pintar(lista.children[indice])
    lista.children[indice].style.background = "blue";
    lista.children[indice].style.color = "white";
    lista.children[indice + 1].style = "";

  } else if (event.key === "ArrowDown" && indice < lista.children.length - 1) { //bajar una posicion
    let abajo = lista.children[indice + 1].textContent;
    let seleccionado = lista.children[indice].textContent;
    lista.children[indice].textContent = abajo;
    lista.children[indice + 1].textContent = seleccionado;
    indice++;
    reset(lista);
    pintar(lista.children[indice]);

  } else if (event.key === "r") { //borrar elemento seleccionado de la lista
    borrarElemento(lista.children[indice]);
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

function agregarElemento(lista) {
  let nodoLI = document.createElement("LI"); //creamos el nodo element LI
  lista.appendChild(nodoLI); //lo añadimos al final de la lista
  let texto = document.getElementById("e").value; //obtenemos el valor del input Text
  let nodoText = document.createTextNode(texto); //creamos el nodo texto
  nodoLI.appendChild(nodoText) //lo añadimos dentro del nodo LI anterior
}

function borrarElemento(element) {
  element.remove();
}