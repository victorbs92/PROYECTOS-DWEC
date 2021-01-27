//     /var/www/html/proyectos/pruebas
//     /var/www/html/pruebas/proyectos

let boton = document.getElementById("enviar");
let fecha = document.getElementById("fecha");
const ajax = new XMLHttpRequest();

boton.addEventListener("click", (e) => {

    console.log(fecha.value);
    console.log(ajax);
    xhttp.open("GET", `http://localhost/html/proyectos/proxy.php?${id}=${fecha.value}`);
    xhttp.send();


});