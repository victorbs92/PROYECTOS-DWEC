/*
notas aparte:

let [txtBuscar, btnBuscar] = [...document.forms[0].elements]; 
//crea array con todos los eleemtnos del primer formulario de la pagina(es otra forma)
//luego se podria  acceder a todos ellos.pero les coge todos, por lo que habria que liminar los que no nos interesen

//otra forma de plantear el formulario y sus datos como una array ne vez de en un objeto como hemos hecho
let formularioArr = [txtBuscar, btnBuscar];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

let formularioObj = {
  //patron de diseño: espacio de nombres

  //capturar controles del formulario
  texto: document.getElementById("txtBuscar"), //mejor capturar el control primero que su value directamente
  boton: document.getElementById("btnBuscar"),
  botonSesion: document.getElementById("sesion"),
};

//eventos del formulario
//añadir escuchador de eventos para un boton y decir que debe hacer cuando el evento ocurra
formularioObj.boton.addEventListener("click", function () {
  //introducir en el almacenamiento local.
  localStorage.setItem(formularioObj.texto.value, "");
});

formularioObj.botonSesion.addEventListener("click", function () {
  let visor = document.getElementById("visor");
  if (localStorage.getItem(formularioObj.texto.value) === null) {
    visor.innerText = `usuario no existe`;
  } else {
    visor.innerText = `${formularioObj.texto.value} Bienvenido`
  }
});