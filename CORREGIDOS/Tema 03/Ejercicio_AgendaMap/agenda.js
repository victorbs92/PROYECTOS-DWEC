//Declaración de variables
/*
Variable agenda será la instancia de Map
*/
let agenda = new Map();

/*Desestructuramos en variables la colección elements donde se guarda los controles del formulario
Se hace para facilitar el uso de los botones y cuadros de texto

También se podría haber declarado los eventos de botones directamente con:
document.getElementById("btn1").onclick=....
document.getElementById("btn2").onclick=....

y dentro de la función manejadora del btn1 capturar de  los objetos input text con getElementById
*/
let [
  txtNombre,
  txtTelefono,
  btnTelefono,
  btnMostrar,
] = document.forms[0].elements;

/*La variable visor guarda el objeto del DOM donde se volcará el contenido de la agenda
o el mensaje de error si se produce. Se declara global porque tiene que estar accesible
 a las dos funciones manejadoras.
*/
let visor = document.getElementById("visor");

/*
Declaración de eventos con las funciones manejadoras declaradas como anónimas
Podrían ser declaradas como funciones flecha porque no se hace uso de this dentro de ellas.
*/
//btnTelefono.onclick = ()=>{
btnTelefono.onclick = function () {
  if (txtNombre.value === "" || txtTelefono.value === "") {
    //Validación: si uno de los cuadros de texto está vacío mostrar error en visor
    visor.innerText = "Debes introducir nombre y telefono";
  } else {
    //si no hay error
    if (agenda.has(txtNombre.value)) {
      // evaluamos si en la agenda está el nombre del cuadro de texto nombre
      agenda.get(txtNombre.value).push(txtTelefono.value); //Si está el nombre, capturamos el array con sus telefonos y le agregamos el del cuadro de texto telefono
    } else {
      //si no está el nombre, lo agregamos y le asignamos  un array donde incluimos  el telefono del cuadro de texto telefono
      agenda.set(txtNombre.value, [txtTelefono.value]);
    }
    txtTelefono.value = ""; //tras agregar el telefono vaciamos el cuadro de texto de telefono
  }
};
/*
Declaracion de evento y función manejadora como anónima
Volcado de la agenda en una tabla que iremos creando mediante una cadena de texto.
*/
btnMostrar.onclick = function () {
  visor.innerHTML = `<tr>
    <th>Nombre</th>
    <th>Telefonos</th>
</tr>`;
  /*
  Recorrido de la agenda  para obtener el nombre y los telefonos
  En cada iteración, telefono se carga con un array de dos posiciones
    posición 0-> el nombre
    posición 1-> el array con los telefonos
  */
  for (telefonos of agenda) {
    visor.innerHTML += `
      <tr><td>${telefonos[0]}</td>
      <td>${telefonos[1].toString()}</td></tr>`;
    
  }
/* Otra solución para recorrer la agenda
agenda.keys() devuelve un objeto iterable con las claves del Map
en este caso los nombres de la agenda.
Recorremos los nombres en un bucle obteniendo por cada nombre el array correspondiente a su valor en el Map
el método toString() convierte a texto un array

  for (nombre of agenda.keys()) {
    visor.innerHTML += `<tr><td>${nombre}</td><td>${agenda
      .get(nombre)
      .toString()}</td></tr>`;
  }*/
};
