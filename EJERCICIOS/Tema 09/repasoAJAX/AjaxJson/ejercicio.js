//https://opendata.gijon.es/descargar.php?id=740&tipo=JSON
//https://opendata.gijon.es/descargar.php?id=740&tipo=XML


let objeto = "";

function mostrar() {

    //1º se crea el objeto
    const ajax = new XMLHttpRequest();

    //2º se asigna el evento al objeto
    ajax.addEventListener("readystatechange", function () {

        switch (ajax.readyState) {
            case 4:
                if (ajax.status >= 200 && ajax.status < 300) {
                    //AQUI RECOGEMOS TODO LO QUE SE HAYA IMPRIMIDO CON ECHO EN EL PHP
                    let archivo = JSON.parse(ajax.responseText);
                    
                    //document.getElementById("div").textContent = archivo;

                    objeto = archivo

                    for (let i = 0; i < archivo.length; i++) {
                        let opcion = document.createElement("OPTION");
                        opcion.setAttribute("value", archivo[i].titulo);
                        opcion.textContent=archivo[i].titulo;
                        document.getElementById("piscinas").appendChild(opcion);    
                    }

                }
                break;

            default:
                break;
        }

    });

    //3º se configura la peticion
    ajax.open("GET", "ejercicio.php");

    //4º se envia la peticion
    ajax.send();

}

function mostrarPiscina(e) {

    let cadena = "";

    for (let i = 0; i < objeto.length; i++) {
        if (objeto[i].titulo === e.target.value) {
            cadena += `Código Postal: ${objeto[i].codigo_postal}<br>`;
            cadena += `Descripción: ${objeto[i].descripcion}<br>`;
            cadena += `Municipio: ${objeto[i].municipio}<br>`;
        }
        
    }

    document.getElementById("div").innerHTML = cadena;

}

document.getElementById("boton").addEventListener("click", mostrar);

document.getElementById("piscinas").addEventListener("change", mostrarPiscina);