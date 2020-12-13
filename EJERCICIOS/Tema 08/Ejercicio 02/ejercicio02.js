tabla = document.querySelector("table");

tabla.addEventListener("click", function (event) {

    if (event.target.nodeName === "TD") {

        resetearDiana(tabla);

        event.target.style.backgroundColor = "greenyellow";

        if (event.target.previousElementSibling !== null) {
            event.target.previousElementSibling.style.backgroundColor = "red";
        };

        if (event.target.nextElementSibling !== null) {
            event.target.nextElementSibling.style.backgroundColor = "red";
        };

        let padre = event.target.parentNode;
        let seleccionado = [...padre.children].findIndex(celda => celda == event.target);

        if (padre.previousElementSibling !== null) {
            padre.previousElementSibling.children[seleccionado].style.backgroundColor = "red";
        };

        if (padre.nextElementSibling !== null) {
            padre.nextElementSibling.children[seleccionado].style.backgroundColor = "red";
        };

    }

});

function resetearDiana(tabla) {

    let celdas = tabla.querySelectorAll("td");

    celdas.forEach(element => {
        element.style.backgroundColor = "white";
    });

}