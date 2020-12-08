import * as funciones from "./funciones.js";

//Se activa al cargar el DOM de la página web. Se podía ejecutar las sentencias de la función directamente en este módulo
//pero de esta forma las incluímos en una función. También se podía haber usado una función autoejecutable.
document.addEventListener("DOMContentLoaded", funciones.cargarLS);

//Se activa al pulsar las teclas
document.addEventListener("keydown", funciones.activarFieldset);

// Los 3 siguiente listeners se activan al clicar en los correspondientes botones de los fieldset
document.getElementById("btnPersonal").addEventListener("click", funciones.agregarDatos);
document.getElementById("btnEstudios").addEventListener("click", funciones.agregarEstudios);
document.getElementById("btnCursos").addEventListener("click", funciones.agregarCursos);

//Se activa al cambiar el estado de la lista título
document.getElementById("titulo").addEventListener("change", funciones.listas)