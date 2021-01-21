// 1 - INSTANCIAMOS EL OBJETO XMLHttpRequest
const xhttp = new XMLHttpRequest();

// 2 - PREPARAR LA FUNCIÓN DE RESPUESTA
xhttp.addEventListener('readystatechange', cargar);

// 3 - REALIZAR LA PETICIÓN

console.log(xhttp.open("GET", document.getElementById("csv").value));
xhttp.send();

function cargar() {
    if (this.readyState === 4 && this.status === 200) { //estado 4 y recurso encontrado en el servidor
        document.getElementById("demo").innerHTML = this.responseText;
    }

};

//