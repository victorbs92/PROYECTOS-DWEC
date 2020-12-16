let lista = document.querySelector("ul");

lista.addEventListener("click", function (event) {

  if (event.target.nodeName === "LI") {

    reset(lista);

    pintar(event.target);

  }

});

document.addEventListener("keydown", function (event) { //ArrowUp -- ArrowDown

  console.log(event.tar);
  if (event.key == "ArrowUp") {

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



/*
//Obtenemos la lista entera para poder trabajar sobre ella
let lista = document.getElementsByTagName("ul")[0];
let clases = document.getElementsByTagName("li");

//Añadimos los eventos a la lista
lista.addEventListener("mousedown", pintar);
document.addEventListener("keydown", ascensor);

*/