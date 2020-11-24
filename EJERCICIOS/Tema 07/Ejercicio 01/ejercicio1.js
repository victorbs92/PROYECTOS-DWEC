const divRaton = document.getElementById("raton");
const divTeclado = document.getElementById("teclado");

/** Punto 1
 * Al mover el ratón en cualquier punto de la ventana del navegador,
 * se mostrará en el área Ratón la posición del puntero respecto de la página.
 */
function infoRaton({ x, y }) {
  divRaton.innerHTML = `
  <p>Ratón:</p>
  <p>X: ${x}</p>
  <p>Y: ${y}</p>
  `;
}
document.addEventListener("mousemove", infoRaton);

/** Punto 2
 * Al pulsar cualquier tecla, el mensaje mostrado en el área Teclado
 * debe cambiar para indicar el código de la tecla y del carácter representado.
 */
function infoTeclado({ key, keyCode }) {
  divTeclado.innerHTML = `
  <p>Teclado:</p>
  <p>key: ${key}</p>
  <p>keyCode: ${keyCode}</p>
  `;
}
document.addEventListener("keydown", infoTeclado);

/** Punto 3
 * Cuando se pulsa el botón primario del ratón sobre cualquiera de las dos áreas,
 * el color de fondo del cuadro de mensaje debe ser amarillo y cuando se pulsa el
 * botón secundario azul.
 */
function toggleBGColor({ which }) {
  let claseNueva = "amarillo";
  let claseVieja = "azul";

  if (which === 3)
    [claseNueva, claseVieja] = [claseVieja, claseNueva];

  if ([1, 3].indexOf(which) !== -1) {
    this.classList.remove(claseVieja);
    this.classList.add(claseNueva);
  }
}

divRaton.addEventListener("mousedown", toggleBGColor);
divTeclado.addEventListener("mousedown", toggleBGColor);

/** Punto 4
 * Cuando se pulse la tecla s se suspenderán todos los eventos (removeEventListener)
 * y aparecerá el mensaje STOP en ambos div. Cuando se pulse la tecla r desaparecerán
 * los mensajes anteriores y volverán a funcionar los eventos (addEventListener).
 */
const eventos = [
  { elemento: document,   evento: ["mousemove", infoRaton]     },
  { elemento: document,   evento: ["keydown",   infoTeclado]   },
  { elemento: divRaton,   evento: ["mousedown", toggleBGColor] },
  { elemento: divTeclado, evento: ["mousedown", toggleBGColor] },
];

document.addEventListener("keydown", function ({ key }) {
  switch (key) {
    case "s":
    case "S": {
      eventos.forEach(e => e.elemento.removeEventListener(...e.evento));
      break;
    }
    case "r":
    case "R": {
      eventos.forEach(e => e.elemento.addEventListener(...e.evento));
      break;
    }
  }
});
