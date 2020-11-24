/** Ejercicio 2
 * Al desplazarnos con el puntero del ratón por encima de la lista,
 * el color de las letras de los items cambiará.
 *
 * Al entrar estilo A al salir estilo B. Al cargarse la página el
 * estilo predeterminado de la letra de los items será el B.
 *
 * Utilizar la delegación de eventos para realizar el ejercicio.
 */
const lista = document.querySelector("ul");

function coloreaLi({ type, target }) {
  if (target.tagName === "A") {
    switch (type) {
      case "mouseover": {
        target.classList.replace("B", "A");
        break;
      }
      case "mouseout": {
        target.classList.replace("A", "B");
        break;
      }
    }
  }
}

lista.addEventListener("mouseover", coloreaLi);
lista.addEventListener("mouseout", coloreaLi);
