/*fetch("https://jsonplaceholder.typicode.com/todos/")
  .then((respuesta) => respuesta.json())
  .then((datosjson) => console.log(datosjson));
*/

//Otra forma

fetch("https://jsonplaceholder.typicode.com/todos/")
  .then((respuesta) => {
    if (respuesta.ok) {
      return respuesta.json();
    } else {
      console.log(
        `Estatus: ${respuesta.status}, EstatusText: ${respuesta.statusText}`
      );
    }
  })
  .then((datosJson) => console.log(datosJson));
