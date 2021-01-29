/*
fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(respuesta => respuesta.json())
    .then(datosjson => console.log(datosjson));
*/

fetch('https://jsonplaceholder.typicode.com/todos/')
    .then((respuesta) => {
        if (respuesta.ok) {
            return respuesta.json()
        }else{
            console.log(`${respuesta.status}  ${respuesta.statusText}`);
        }
    })
    .then(datosjson => console.log(datosjson));