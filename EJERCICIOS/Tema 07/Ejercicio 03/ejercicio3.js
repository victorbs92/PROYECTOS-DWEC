/** Ejercicio 3
 * Variante del anterior.
 * Al hacer click sobre un elemento de la lista, se aplicará el estilo A.
 * Para desplazarnos por los elementos de la lista, utilizar las teclas flecha arriba y abajo.
 */
const lista = document.querySelector("ul");

lista.addEventListener("click", function ({ target }) {
  target.classList.replace("B", "A");
  const nHijos = this.children.length;
  let index = [...this.children].indexOf(target.parentElement);

  this.addEventListener("keydown", function ({ keyCode }) {
    this.children[index].children[0].classList.replace("A", "B");

    switch (keyCode) {
      case 38:
        index = index <= 0 ? nHijos - 1 : --index;
        break;
      case 40:
        index = (index + 1) % nHijos;
        break;
    }

    this.children[index].children[0].classList.replace("B", "A");
  });
});
