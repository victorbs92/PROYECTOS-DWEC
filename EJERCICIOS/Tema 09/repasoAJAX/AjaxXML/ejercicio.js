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
                    //AQUI RECOGEMOS LO QUE SE MANDE CON EL READFILE EN EL PHP
                    let archivo = ajax.responseXML;

                    let xml = archivo.documentElement;

                    objeto = xml;

                    for (let i = 0; i < xml.getElementsByTagName("piscina").length; i++) {
                        let opcion = document.createElement("OPTION");
                        opcion.setAttribute("value", xml.getElementsByTagName("titulo")[i].textContent);
                        opcion.textContent = xml.getElementsByTagName("titulo")[i].textContent;
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

    for (let i = 0; i < objeto.getElementsByTagName("piscina").length; i++) {
        if (objeto.getElementsByTagName("titulo")[i].textContent === e.target.value) {
            cadena += `Código Postal: ${objeto.getElementsByTagName("codigo_postal")[i].textContent}<br>`;
            cadena += `Descripción: ${objeto.getElementsByTagName("descripcion")[i].textContent}<br>`;
            cadena += `Municipio: ${objeto.getElementsByTagName("municipio")[i].textContent}<br>`;
        }

    }

    document.getElementById("div").innerHTML = cadena;

}

document.getElementById("boton").addEventListener("click", mostrar);

document.getElementById("piscinas").addEventListener("change", mostrarPiscina);